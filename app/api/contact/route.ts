import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { contactFormSchema } from '@/lib/schemas';

const emailjsEndpoint = 'https://api.emailjs.com/api/v1.0/email/send';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const validationResult = contactFormSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { errors: validationResult.error.format() },
        { status: 400 }
      );
    }

    const validatedData = validationResult.data;

    const serviceId = process.env.EMAILJS_SERVICE_ID;
    const templateId = process.env.EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.EMAILJS_PUBLIC_KEY;
    const recipientEmail = process.env.CONTACT_RECIPIENT_EMAIL || 'mkmahmud.dev@gmail.com';

    if (!serviceId || !templateId || !publicKey) {
      throw new Error('EmailJS server environment variables are not configured');
    }

    const templateParams = {
      Name: validatedData.name,
      Email: validatedData.email,
      Phone: validatedData.phone || 'N/A',
      Service: validatedData.service || 'Not specified',
      Budget: validatedData.budget || 'Not specified',
      Country: validatedData.country || 'Not specified',
      Message_Content: validatedData.message,
      name: validatedData.name,
      email: validatedData.email,
      phone: validatedData.phone || 'N/A',
      service: validatedData.service || 'Not specified',
      budget: validatedData.budget || 'Not specified',
      country: validatedData.country || 'Not specified',
      message: validatedData.message,
      reply_to: validatedData.email,
      to_email: recipientEmail,
      recipient_email: recipientEmail,
      submitted_at: new Date().toISOString(),
    };

    const emailResponse = await fetch(emailjsEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service_id: serviceId,
        template_id: templateId,
        user_id: publicKey,
        template_params: templateParams,
      }),
    });

    if (!emailResponse.ok) {
      const emailError = await emailResponse.text();
      console.error('EmailJS request failed:', emailError);
      return NextResponse.json(
        {
          error: 'Email delivery is not enabled for server requests in EmailJS.',
          details: emailError,
        },
        { status: 502 }
      );
    }

    const db = await connectDB();

    await db.collection('contacts').insertOne({
      ...validatedData,
      createdAt: new Date(),
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Failed to process contact submission:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
