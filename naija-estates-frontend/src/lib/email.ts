/**
 * Email Notification Utility for NaijaSpaces
 */

interface SendEmailParams {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: SendEmailParams) {
  const apiKey = process.env.RESEND_API_KEY;

  if (apiKey) {
    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          from: 'NaijaSpaces <notifications@naijaspaces.app>',
          to,
          subject,
          html,
        }),
      });
      return await res.json();
    } catch (err) {
      console.error('Failed to send email via Resend:', err);
    }
  }

  // Development / Logging fallback
  console.log(`[EMAIL NOTIFICATION SENT] To: ${to} | Subject: "${subject}"`);
  return { success: true, simulated: true };
}

export function buildWelcomeEmail(name: string) {
  return `
    <div style="font-family: Arial, sans-serif; background: #0a0a0a; color: #ffffff; padding: 40px; border-radius: 8px;">
      <h2 style="font-family: Georgia, serif; color: #ffffff;">Welcome to NaijaSpaces, ${name}!</h2>
      <p style="color: #cccccc; line-height: 1.6;">Your account has been created. You can now browse verified listings, save your favourite properties, and contact verified Nigerian real estate agents directly.</p>
      <a href="https://naijaspaces.app/properties" style="display: inline-block; background: #ffffff; color: #000000; padding: 12px 24px; text-decoration: none; font-weight: bold; border-radius: 4px; margin-top: 16px;">Explore Properties</a>
    </div>
  `;
}

export function buildReceiptEmail(name: string, propertyTitle: string, amount: number, ref: string) {
  return `
    <div style="font-family: Arial, sans-serif; background: #0a0a0a; color: #ffffff; padding: 40px; border-radius: 8px;">
      <h2 style="font-family: Georgia, serif; color: #ffffff;">Payment Confirmation</h2>
      <p style="color: #cccccc;">Hello ${name}, your payment for <strong>${propertyTitle}</strong> was successful!</p>
      <div style="border: 1px solid #333; padding: 16px; margin: 20px 0; background: #111;">
        <p><strong>Reference:</strong> ${ref}</p>
        <p><strong>Amount Paid:</strong> ₦${amount.toLocaleString()}</p>
      </div>
      <p style="color: #888888;">Thank you for using NaijaSpaces.</p>
    </div>
  `;
}
