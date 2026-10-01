import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    const body = await request.text();
    const signature = request.headers.get('x-paystack-signature');
    const secret = process.env.PAYSTACK_SECRET_KEY || 'sk_test_placeholder_secret';

    // Verify webhook signature if in production/secret is provided
    if (signature && process.env.PAYSTACK_SECRET_KEY) {
      const hash = crypto.createHmac('sha512', secret).update(body).digest('hex');
      if (hash !== signature) {
        return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
      }
    }

    const event = JSON.parse(body);

    if (event.event === 'charge.success') {
      const { reference, amount } = event.data;

      const payment = await prisma.payment.findUnique({
        where: { reference }
      });

      if (payment) {
        await prisma.payment.update({
          where: { id: payment.id },
          data: { status: 'SUCCESS' }
        });

        // Optionally update property availability
        await prisma.property.update({
          where: { id: payment.propertyId },
          data: { isAvailable: false }
        });
      }
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Paystack webhook error:", error);
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 500 });
  }
}
