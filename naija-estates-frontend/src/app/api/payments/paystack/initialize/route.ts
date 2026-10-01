import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const session = await getSession();
    const { email, name, phone, amount, propertyId, duration } = await request.json();

    if (!email || !amount || !propertyId) {
      return NextResponse.json({ error: 'Missing required payment details' }, { status: 400 });
    }

    const paystackSecret = process.env.PAYSTACK_SECRET_KEY;
    if (!paystackSecret) {
      return NextResponse.json({ error: 'Paystack configuration missing' }, { status: 500 });
    }

    // Fetch property & agent details to verify pricing & split
    const property = await prisma.property.findUnique({
      where: { id: propertyId },
      include: { agent: true }
    });

    if (!property) {
      return NextResponse.json({ error: 'Property not found' }, { status: 404 });
    }

    const numDuration = parseInt(duration) || 1;
    const baseRent = property.price * numDuration;
    const agencyCommission = baseRent * 0.05; // 5% NaijaSpaces cut
    const legalFee = baseRent * 0.02; // 2% legal fee
    const totalAmountCalculated = baseRent + agencyCommission + legalFee;

    // Generate unique Paystack transaction reference
    const reference = `NAIJA_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

    // Create pending payment in database
    await prisma.payment.create({
      data: {
        amount: totalAmountCalculated,
        reference,
        status: 'PENDING',
        propertyId,
        userId: session?.userId || 'guest-user',
      }
    });

    // Amount in Paystack is in Kobo (naira * 100)
    const amountInKobo = Math.round(totalAmountCalculated * 100);

    const appUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.BETTER_AUTH_URL || 'https://naijaspaces.app';

    const paystackBody: any = {
      email,
      amount: amountInKobo,
      reference,
      callback_url: `${appUrl}/checkout/${propertyId}?reference=${reference}&status=success`,
      metadata: {
        propertyId,
        duration: numDuration,
        clientName: name,
        clientPhone: phone,
        agentId: property.agentId,
        agentName: property.agent.name,
        custom_fields: [
          { display_name: "Property", variable_name: "property_title", value: property.title },
          { display_name: "Agent Net Rent", variable_name: "agent_net_rent", value: `₦${baseRent.toLocaleString()}` },
          { display_name: "NaijaSpaces 5% Cut", variable_name: "platform_commission", value: `₦${agencyCommission.toLocaleString()}` },
          { display_name: "Legal Fee (2%)", variable_name: "legal_fee", value: `₦${legalFee.toLocaleString()}` },
          { display_name: "Duration", variable_name: "rental_duration", value: `${numDuration} ${property.rentalPeriod}` }
        ]
      }
    };

    // If agent has a Paystack subaccount configured, use Paystack Split
    if (property.agent.paystackSubaccountCode) {
      paystackBody.subaccount = property.agent.paystackSubaccountCode;
      paystackBody.transaction_charge = Math.round((agencyCommission + legalFee) * 100); // Kobo retained by NaijaSpaces
    }

    // Call Paystack API to initialize transaction
    const paystackRes = await fetch('https://api.paystack.co/transaction/initialize', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${paystackSecret}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(paystackBody)
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
