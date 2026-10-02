import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getSession } from '@/lib/auth';

export async function GET() {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.userId },
      select: {
        bankName: true,
        accountNumber: true,
        accountName: true,
        paystackSubaccountCode: true,
      }
    });

    return NextResponse.json(user || {});
  } catch (error) {
    console.error("Error fetching agent bank details:", error);
    return NextResponse.json({ error: "Failed to fetch bank details" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { bankName, bankCode, accountNumber, accountName } = await request.json();

    if (!bankName || !bankCode || !accountNumber || !accountName) {
      return NextResponse.json({ error: 'Bank Name, Bank Code, Account Number, and Account Name are required' }, { status: 400 });
    }

    const paystackSecret = process.env.PAYSTACK_SECRET_KEY;
    let subaccountCode: string | null = null;

    // Optionally create Paystack Subaccount automatically via Paystack API
    if (paystackSecret) {
      try {
        const subaccountRes = await fetch('https://api.paystack.co/subaccount', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${paystackSecret}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            business_name: accountName,
            settlement_bank: bankCode,
            account_number: accountNumber,
            percentage_charge: 5, // 5% retained by main platform account
          })
        });

        const subaccountData = await subaccountRes.json();
        if (subaccountData.status && subaccountData.data?.subaccount_code) {
          subaccountCode = subaccountData.data.subaccount_code;
        }
      } catch (err) {
        console.error("Paystack Subaccount Creation Error:", err);
      }
    }

    const updated = await prisma.user.update({
      where: { id: session.userId },
      data: {
        bankName,
        accountNumber,
        accountName,
        paystackSubaccountCode: subaccountCode
      }
    });

    return NextResponse.json({
      success: true,
      bankName: updated.bankName,
      accountNumber: updated.accountNumber,
      accountName: updated.accountName,
      paystackSubaccountCode: updated.paystackSubaccountCode
    });
  } catch (error) {
    console.error("Error saving agent bank details:", error);
    return NextResponse.json({ error: "Failed to save bank details" }, { status: 500 });
  }
}
