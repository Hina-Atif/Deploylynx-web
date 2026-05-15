import { Handler } from "@netlify/functions";
import { Resend } from "resend";

export const handler: Handler = async (event) => {
  // Only allow POST requests
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || "deploylynx26@gmail.com";

  if (!apiKey) {
    console.error("ERROR: RESEND_API_KEY is not defined in environment variables.");
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Email service not configured on Netlify." }),
    };
  }

  try {
    const { name, email, company, package: pkg, message } = JSON.parse(event.body || "{}");
    
    const resend = new Resend(apiKey);

    console.log(`[Netlify] Sending email via Resend to ${receiverEmail}...`);

    const { data, error } = await resend.emails.send({
      from: "DeployLynx <onboarding@resend.dev>",
      to: [receiverEmail.trim()],
      replyTo: email.trim(),
      subject: `New Lead: ${name} from ${company || 'Startup'}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 12px; overflow: hidden; background: #fff;">
          <div style="background: #06b6d4; padding: 20px; color: white;">
            <h2 style="margin: 0; font-size: 24px;">New Contact Form Submission</h2>
          </div>
          <div style="padding: 30px; color: #333;">
            <p style="margin-bottom: 10px;"><strong>Name:</strong> ${name}</p>
            <p style="margin-bottom: 10px;"><strong>Email:</strong> ${email}</p>
            <p style="margin-bottom: 10px;"><strong>Company:</strong> ${company || 'N/A'}</p>
            <p style="margin-bottom: 20px;"><strong>Tier/Service:</strong> ${pkg || 'N/A'}</p>
            <div style="margin-top: 20px; padding: 20px; background: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0;">
              <p style="margin: 0 0 10px 0; font-weight: bold; color: #64748b; text-transform: uppercase; font-size: 12px; letter-spacing: 0.05em;">Message:</p>
              <p style="white-space: pre-wrap; margin: 0; line-height: 1.6;">${message}</p>
            </div>
          </div>
          <div style="padding: 20px; text-align: center; background: #f1f5f9; color: #94a3b8; font-size: 12px;">
            Sent via DeployLynx Automated Infrastructure (Netlify Function)
          </div>
        </div>
      `,
    });

    if (error) {
      console.error("[Netlify] Resend API error:", error);
      return {
        statusCode: 400,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ error: error.message }),
      };
    }

    console.log("[Netlify] Email sent successfully! ID:", data?.id);
    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ success: true, id: data?.id }),
    };

  } catch (err: any) {
    console.error("[Netlify] Critical error:", err.message);
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ error: err.message || "Internal Server Error" }),
    };
  }
};
