import { Handler } from "@netlify/functions";

export const handler: Handler = async () => {
  const key = process.env.RESEND_API_KEY;
  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ 
      status: "ok", 
      emailConfigured: !!key,
      keyPreview: key ? `${key.substring(0, 7)}...` : "none",
      receiver: process.env.CONTACT_RECEIVER_EMAIL || 'deploylynx26@gmail.com',
      env: "netlify-functions"
    }),
  };
};
