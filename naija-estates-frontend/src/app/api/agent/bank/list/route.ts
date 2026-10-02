import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const paystackSecret = process.env.PAYSTACK_SECRET_KEY;
    if (!paystackSecret) {
      return NextResponse.json({ error: 'Paystack Secret Key is not configured' }, { status: 500 });
    }

    const res = await fetch('https://api.paystack.co/bank?country=nigeria', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${paystackSecret}`,
      }
    });

    const data = await res.json();
    if (!data.status) {
      return NextResponse.json({ error: data.message || 'Failed to fetch banks' }, { status: 400 });
    }

    return NextResponse.json({
      status: true,
      message: 'Banks retrieved',
      data: data.data,
    });
  } catch (error) {
    console.error("Error fetching banks:", error);
    return NextResponse.json({ error: "Failed to fetch banks" }, { status: 500 });
  }
}
