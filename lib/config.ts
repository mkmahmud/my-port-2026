export const emailjsConfig = {
    serviceId:
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ??
        process.env.EMAILJS_SERVICE_ID ??
        '',
    templateId:
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ??
        process.env.EMAILJS_TEMPLATE_ID ??
        '',
    publicKey:
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ??
        process.env.EMAILJS_PUBLIC_KEY ??
        '',
    recipientEmail: process.env.CONTACT_RECIPIENT_EMAIL ?? 'mkmahmud.dev@gmail.com',
};
