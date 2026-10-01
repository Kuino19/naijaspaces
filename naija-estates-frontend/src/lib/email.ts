/**
 * Premium Email Notification Utility for NaijaSpaces
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
      const fromEmail = process.env.RESEND_FROM_EMAIL || 'NaijaSpaces <notifications@naijaspaces.app>';
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          from: fromEmail,
          to,
          subject,
          html,
        }),
      });
      const data = await res.json();
      console.log('[RESEND API RESULT]:', data);
      return data;
    } catch (err) {
      console.error('Failed to send email via Resend:', err);
    }
  }

  console.log(`[EMAIL SIMULATED SENT] To: ${to} | Subject: "${subject}"`);
  return { success: true, simulated: true };
}

/**
 * Base Luxury HTML Layout Wrapper
 */
function wrapEmailLayout(content: string) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>NaijaSpaces</title>
      <style>
        body { margin: 0; padding: 0; background-color: #0a0a0a; color: #ffffff; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; }
        .container { max-width: 600px; margin: 0 auto; background-color: #111111; border: 1px solid #222222; border-radius: 8px; overflow: hidden; }
        .header { background-color: #0a0a0a; padding: 32px; text-align: center; border-bottom: 1px solid #222222; }
        .logo { font-family: Georgia, serif; font-size: 24px; font-weight: bold; letter-spacing: 3px; text-transform: uppercase; color: #ffffff; text-decoration: none; }
        .logo span { font-weight: 300; color: #aaaaaa; }
        .body-content { padding: 40px 32px; }
        .btn { display: inline-block; background-color: #ffffff; color: #000000 !important; font-size: 12px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; text-decoration: none; padding: 16px 32px; border-radius: 4px; margin-top: 24px; text-align: center; }
        .footer { background-color: #080808; padding: 24px 32px; text-align: center; border-top: 1px solid #1a1a1a; font-size: 10px; color: #666666; text-transform: uppercase; letter-spacing: 2px; }
        .footer a { color: #888888; text-decoration: none; }
        .badge { display: inline-block; background-color: rgba(16, 185, 129, 0.15); color: #10b981; border: 1px solid rgba(16, 185, 129, 0.3); font-size: 10px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; padding: 4px 12px; border-radius: 20px; margin-bottom: 16px; }
      </style>
    </head>
    <body style="background-color: #0a0a0a; padding: 40px 10px;">
      <div class="container">
        <!-- Header -->
        <div class="header">
          <a href="https://naijaspaces.app" class="logo">NAIJA<span>SPACES</span></a>
        </div>

        <!-- Dynamic Body -->
        <div class="body-content">
          ${content}
        </div>

        <!-- Footer -->
        <div class="footer">
          <p>© ${new Date().getFullYear()} NAIJASPACES. ALL RIGHTS RESERVED.</p>
          <p style="margin-top: 8px;">
            <a href="https://naijaspaces.app/properties">PROPERTIES</a> &nbsp;|&nbsp; 
            <a href="https://naijaspaces.app/for-agents">FOR AGENTS</a> &nbsp;|&nbsp; 
            <a href="https://naijaspaces.app/dashboard/tenant">TENANT PORTAL</a>
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
}

export function buildWelcomeEmail(name: string) {
  const content = `
    <div class="badge">VERIFIED ACCOUNT</div>
    <h1 style="font-family: Georgia, serif; font-size: 28px; margin-top: 0; margin-bottom: 16px; color: #ffffff;">Welcome to NaijaSpaces, ${name}.</h1>
    <p style="color: #cccccc; font-size: 15px; line-height: 1.6; margin-bottom: 24px;">
      Your account has been created. You now have full access to Nigeria’s premier real estate portfolio — featuring luxury mansions, penthouses, commercial shops, and short-term rentals.
    </p>

    <div style="background-color: #181818; border: 1px solid #2a2a2a; border-radius: 6px; padding: 20px; margin-bottom: 24px;">
      <h3 style="font-family: Georgia, serif; font-size: 16px; color: #ffffff; margin-top: 0; margin-bottom: 8px;">What You Can Do Now:</h3>
      <ul style="color: #bbbbbb; font-size: 14px; line-height: 1.8; padding-left: 20px; margin: 0;">
        <li>Browse 100% verified property listings in Lagos, Abuja, & Port Harcourt</li>
        <li>Connect directly with verified agents via 1-click WhatsApp</li>
        <li>Save properties to your personal shortlist & compare side-by-side</li>
      </ul>
    </div>

    <a href="https://naijaspaces.app/properties" class="btn">Explore The Collection →</a>
  `;
  return wrapEmailLayout(content);
}

export function buildReceiptEmail(name: string, propertyTitle: string, amount: number, ref: string) {
  const content = `
    <div class="badge" style="background-color: rgba(16, 185, 129, 0.15); color: #10b981; border-color: rgba(16, 185, 129, 0.3);">TRANSACTION VERIFIED</div>
    <h1 style="font-family: Georgia, serif; font-size: 26px; margin-top: 0; margin-bottom: 12px; color: #ffffff;">Payment Confirmation</h1>
    <p style="color: #cccccc; font-size: 14px; line-height: 1.6; margin-bottom: 24px;">
      Hello ${name}, your acquisition payment for <strong>${propertyTitle}</strong> has been authorized via Paystack.
    </p>

    <table style="width: 100%; border-collapse: collapse; background-color: #161616; border: 1px solid #282828; margin-bottom: 24px;">
      <thead>
        <tr style="border-bottom: 1px solid #282828; text-align: left; font-size: 10px; color: #888888; text-transform: uppercase; letter-spacing: 1.5px;">
          <th style="padding: 12px 16px;">Item</th>
          <th style="padding: 12px 16px; text-align: right;">Details</th>
        </tr>
      </thead>
      <tbody style="font-size: 13px; color: #dddddd;">
        <tr style="border-bottom: 1px solid #222222;">
          <td style="padding: 12px 16px; color: #888888;">Transaction Reference</td>
          <td style="padding: 12px 16px; text-align: right; font-family: monospace; color: #ffffff;">${ref}</td>
        </tr>
        <tr style="border-bottom: 1px solid #222222;">
          <td style="padding: 12px 16px; color: #888888;">Property</td>
          <td style="padding: 12px 16px; text-align: right; color: #ffffff; font-weight: 600;">${propertyTitle}</td>
        </tr>
        <tr>
          <td style="padding: 16px; color: #ffffff; font-weight: 700; font-size: 14px;">Total Amount Paid</td>
          <td style="padding: 16px; text-align: right; color: #10b981; font-weight: 700; font-size: 18px;">₦${amount.toLocaleString()}</td>
        </tr>
      </tbody>
    </table>

    <p style="color: #888888; font-size: 12px; line-height: 1.5;">
      Our private office and the verified listing agent have been notified. Your digital receipt is available in your tenant dashboard.
    </p>

    <a href="https://naijaspaces.app/dashboard/tenant" class="btn">View Tenant Dashboard →</a>
  `;
  return wrapEmailLayout(content);
}

export function buildPasswordResetEmail(name: string, resetLink: string) {
  const content = `
    <div class="badge" style="background-color: rgba(239, 68, 68, 0.15); color: #f87171; border-color: rgba(239, 68, 68, 0.3);">SECURITY REQUEST</div>
    <h1 style="font-family: Georgia, serif; font-size: 26px; margin-top: 0; margin-bottom: 16px; color: #ffffff;">Password Reset Request</h1>
    <p style="color: #cccccc; font-size: 14px; line-height: 1.6; margin-bottom: 24px;">
      Hello ${name}, we received a request to reset your password for your NaijaSpaces account. Click the button below to set a new password.
    </p>

    <div style="text-align: center; margin: 32px 0;">
      <a href="${resetLink}" class="btn" style="background-color: #ffffff; color: #000000 !important; font-size: 13px; padding: 18px 36px;">Reset My Password →</a>
    </div>

    <p style="color: #777777; font-size: 12px; line-height: 1.5; margin-top: 24px; border-t: 1px solid #222222; padding-top: 16px;">
      If you did not request a password reset, no action is needed. Your account remains secure.
    </p>
  `;
  return wrapEmailLayout(content);
}
