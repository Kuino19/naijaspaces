import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import crypto from 'crypto';
import { sendEmail, buildReceiptEmail } from '@/lib/email';

export async function POST(request: Request) {
  try {
    const body = await request.text();
    const signature = request.headers.get('x-paystack-signature');
    const secret = process.env.PAYSTACK_SECRET_KEY || 'sk_test_placeholder_secret';

    if (signature && process.env.PAYSTACK_SECRET_KEY) {
      const hash = crypto.createHmac('sha512', secret).update(body).digest('hex');
      if (hash !== signature) {
        return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
      }
    }

    const event = JSON.parse(body);

    if (event.event === 'charge.success') {
      const { reference } = event.data;

      const payment = await prisma.payment.findUnique({
        where: { reference },
        include: {
          user: true,
          property: true
        }
      });

      if (payment) {
        await prisma.payment.update({
          where: { id: payment.id },
          data: { status: 'SUCCESS' }
        });

        await prisma.property.update({
          where: { id: payment.propertyId },
          data: { isAvailable: false }
        });

        // Send payment receipt email
        if (payment.user?.email) {
          sendEmail({
            to: payment.user.email,
            subject: `Payment Receipt: ${payment.property.title}`,
            html: buildReceiptEmail(
              payment.user.name || 'Valued Customer',
              payment.property.title,
              payment.amount,
              payment.reference
            )
          }).catch(err => console.error("Error sending payment receipt email:", err));
        }
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Paystack webhook error:", error);
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });
  }
}
