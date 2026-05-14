import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Request identification and logging
  app.use((req, res, next) => {
    const id = Math.random().toString(36).substring(7);
    (req as any).requestId = id;
    console.log(`[${id}] ${req.method} ${req.path}`);
    next();
  });

  // Health check
  app.get("/api/health", (req, res) => {
    const key = process.env.RESEND_API_KEY;
    res.json({ 
      status: "ok", 
      emailConfigured: !!key,
      keyPreview: key ? `${key.substring(0, 7)}...` : "none",
      receiver: process.env.CONTACT_RECEIVER_EMAIL || 'deploylynx26@gmail.com',
      env: process.env.NODE_ENV || 'development'
    });
  });

  // API Route for sending emails
  app.post("/api/send-email", async (req, res) => {
    const requestId = (req as any).requestId;
    console.log(`[${requestId}] Processing email request...`);
    
    const apiKey = process.env.RESEND_API_KEY;
    const receiverEmail = process.env.CONTACT_RECEIVER_EMAIL || 'deploylynx26@gmail.com';

    if (!apiKey) {
      console.error(`[${requestId}] ERROR: RESEND_API_KEY is not defined in environment variables.`);
      return res.status(500).json({ error: "Email service not configured. Please add RESEND_API_KEY to your secrets." });
    }

    try {
      const { name, email, company, package: pkg, message } = req.body;
      
      console.log(`[${requestId}] Initializing Resend client...`);
      const resend = new Resend(apiKey);

      console.log(`[${requestId}] Sending email via Resend to ${receiverEmail}...`);

      // Add a timeout to the Resend request to prevent hanging
      const sendPromise = resend.emails.send({
        from: 'DeployLynx <onboarding@resend.dev>',
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
              Sent via DeployLynx Automated Infrastructure
            </div>
          </div>
        `,
      });

      const timeoutPromise = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Resend API request timed out (Internal Timeout)')), 10000)
      );

      const result = await Promise.race([sendPromise, timeoutPromise]);
      const { data, error } = result as any;

      if (error) {
        console.error(`[${requestId}] Resend API returned an error:`, error);
        return res.status(400).json({ error: error.message || "Resend API Error" });
      }

      console.log(`[${requestId}] Email sent successfully! ID:`, data?.id);
      res.status(200).json({ success: true, id: data?.id });

    } catch (err: any) {
      console.error(`[${requestId}] Critical error in /api/send-email:`, err.message);
      res.status(500).json({ error: err.message || "Failed to process email request" });
    }
  });
  
  // Handle 404s for API routes specifically
  app.all("/api/*", (req, res) => {
    res.status(404).json({ error: `API route not found: ${req.method} ${req.url}` });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
