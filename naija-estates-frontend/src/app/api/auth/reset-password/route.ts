import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendEmail } from '@/lib/email';

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: 'Email address is required' }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (user) {
      const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://naijaspaces.app';
      const resetLink = `${appUrl}/login?reset=true&email=${encodeURIComponent(email)}`;

      await sendEmail({
        to: email,
        subject: 'Password Reset Request - NaijaSpaces',
        html: `
          <div style="font-family: Arial, sans-serif; background: #0a0a0a; color: #ffffff; padding: 40px; border-radius: 8px;">
            <h2 style="font-family: Georgia, serif; color: #ffffff;">Reset Your Password</h2>
            <p style="color: #cccccc; line-height: 1.6;">Hello ${user.name || 'User'}, we received a request to reset your NaijaSpaces password.</p>
            <p style="color: #cccccc;">Click the button below to sign in or update your password:</p>
            <a href="${resetLink}" style="display: inline-block; background: #ffffff; color: #000000; padding: 12px 24px; text-decoration: none; font-weight: bold; border-radius: 4px; margin-top: 16px;">Reset Password</a>
            <p style="color: #888888; font-size: 12px; margin-top: 24px;">If you did not request a password reset, you can safely ignore this email.</p>
          </div>
        `
      });
    }

    // Always return success to prevent email enumeration
    return NextResponse.json({ success: true, message: "If an account exists with that email, a password reset link has been sent." });
  } catch (error) {
    console.error("Password reset error:", error);
    return NextResponse.json({ error: "Failed to process password reset" }, { status: 500 });
  }
}
