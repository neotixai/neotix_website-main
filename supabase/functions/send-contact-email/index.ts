import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2.58.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface ContactFormData {
  name: string;
  email: string;
  company?: string;
  message: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const formData: ContactFormData = await req.json();

    const { error: dbError } = await supabase
      .from("contact_messages")
      .insert({
        name: formData.name,
        email: formData.email,
        company: formData.company || null,
        message: formData.message,
      });

    if (dbError) {
      throw new Error(`Database error: ${dbError.message}`);
    }

    const smtpHost = Deno.env.get("SMTP_HOST");
    const smtpPort = Deno.env.get("SMTP_PORT");
    const smtpUser = Deno.env.get("SMTP_USER");
    const smtpPass = Deno.env.get("SMTP_PASS");
    const smtpTo = Deno.env.get("SMTP_TO") || "contact@neotix-ai.com";

    if (smtpHost && smtpPort && smtpUser && smtpPass) {
      try {
        const emailBody = `
New contact form submission from Neotix AI website:

Name: ${formData.name}
Email: ${formData.email}
${formData.company ? `Company: ${formData.company}` : ""}

Message:
${formData.message}

---
This message was sent from the Neotix AI contact form.
        `.trim();

        const emailData = {
          from: smtpUser,
          to: smtpTo,
          subject: `New Contact Form Submission from ${formData.name}`,
          text: emailBody,
        };

        const response = await fetch(`https://api.smtp2go.com/v3/email/send`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Smtp2go-Api-Key": smtpPass,
          },
          body: JSON.stringify({
            api_key: smtpPass,
            to: [smtpTo],
            sender: smtpUser,
            subject: emailData.subject,
            text_body: emailData.text,
          }),
        });

        if (!response.ok) {
          console.error("Email sending failed:", await response.text());
        }
      } catch (emailError) {
        console.error("Error sending email:", emailError);
      }
    }

    return new Response(
      JSON.stringify({ success: true, message: "Contact message received" }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error processing contact form:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : "Unknown error"
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});
