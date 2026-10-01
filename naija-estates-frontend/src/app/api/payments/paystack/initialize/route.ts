import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const session = await getSession();
    const { email, amount, propertyId, duration } = await request.json();

    if (!email || !amount || !propertyId) {
      return NextResponse.json({ error: 'Missing required payment details' }, { status: 400 });
    }

    const paystackSecret = process.env.PAYSTACK_SECRET_KEY;
    if (!paystackSecret) {
      return NextResponse.json({ error: 'Paystack configuration missing' }, { status: 500 });
    }

    // Generate unique Paystack transaction reference
    const reference = `NAIJA_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

    // Create pending payment in database
    const payment = await prisma.payment.create({
      data: {
        amount: parseFloat(amount),
        reference,
        status: 'PENDING',
        propertyId,
        userId: session?.userId || 'guest-user',
      }
    });

    // Amount in Paystack is in Kobo (naira * 100)
    const amountInKobo = Math.round(parseFloat(amount) * 100);

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.BETTER_AUTH_URL || 'https://naijaspaces.app';

    // Call Paystack API to initialize transaction
    const paystackRes = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${paystackSecret}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        amount: amountInKobo,
        reference,
        callback_url: `${appUrl}/checkout/${propertyId}?reference=${reference}&status=success`,
        metadata: {
          propertyId,
          duration,
          custom_fields: [
            { display_name: "Property ID", variable_name: "property_id", value: propertyId },
            { display_name: "Rental Duration", variable_name: "duration", value: duration }
          ]
        }
      })
    });

    const paystackData = await paystackRes.json();

    if (!paystackData.status) {
      return NextResponse.json({ error: paystackData.message || 'Paystack initialization failed' }, { status: 400 });
    }

    return NextResponse.json({
      authorization_url: paystackData.data.authorization_url,
      reference,
    });
  } catch (error) {
    console.error("Paystack Initialize Error:", error);
    return NextResponse.json({ error: "Failed to initialize payment" }, { status: 500 });
  }
}
