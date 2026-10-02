import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const accountNumber = searchParams.get('accountNumber');
    const bankCode = searchParams.get('bankCode');

    if (!accountNumber || !bankCode) {
      return NextResponse.json({ error: 'accountNumber and bankCode are required' }, { status: 400 });
    }

    const paystackSecret = process.env.PAYSTACK_SECRET_KEY;
    if (!paystackSecret) {
      return NextResponse.json({ error: 'Paystack Secret Key is not configured' }, { status: 500 });
    }

    const res = await fetch(`https://api.paystack.co/bank/resolve?account_number=${accountNumber}&bank_code=${bankCode}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${paystackSecret}`,
      }
    });

    const data = await res.json();
    if (!data.status) {
      return NextResponse.json({ error: data.message || 'Failed to resolve account' }, { status: 400 });
    }

    return NextResponse.json({
      status: true,
      message: 'Account resolved',
      data: data.data, // This contains account_name and account_number
    });
  } catch (error) {
    console.error("Error resolving bank account:", error);
    return NextResponse.json({ error: "Failed to resolve bank account" }, { status: 500 });
  }
}
