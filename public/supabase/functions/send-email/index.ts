import { createClient } from "npm:@supabase/supabase-js@2.39.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, phone, company, message, requestType } = await req.json();

    // Validate required fields
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { 
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" }
        }
      );
    }

    // Initialize Supabase client
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );

    // Store the contact form submission in the database
    const { error: dbError } = await supabaseClient
      .from('contact_submissions')
      .insert([
        {
          name,
          email,
          phone,
          company,
          message,
          request_type: requestType
        }
      ]);

    if (dbError) {
      console.error('Database error:', dbError);
      throw new Error('Failed to store contact submission');
    }

    // Send email notification
    const emailBody = `
      New Contact Form Submission
      
      Name: ${name}
      Email: ${email}
      Phone: ${phone || 'Not provided'}
      Company: ${company || 'Not provided'}
      Request Type: ${requestType}
      
      Message:
      ${message}
    `;

    const emailData = {
      to: 'Asissenov@ichem.kz',
      subject: `New Contact Form Submission from ${name}`,
      text: emailBody,
    };

    // Here you would integrate with your email service provider
    // For example, using SendGrid, Mailgun, etc.
    // This is a placeholder for the actual email sending logic
    console.log('Email would be sent:', emailData);

    return new Response(
      JSON.stringify({ message: "Contact form submitted successfully" }),
      { 
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      }
    );

  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: "Internal server error" }),
      { 
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" }
      }
    );
  }
});