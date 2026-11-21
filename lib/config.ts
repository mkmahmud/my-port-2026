// EmailJS sends directly from the browser with the public key, so these must
// use the NEXT_PUBLIC_ prefix — Next.js only inlines prefixed vars into the
// client bundle. Unprefixed vars are always undefined here.
export const emailjsConfig = {
    serviceId: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID ?? '',
    templateId: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID ?? '',
    publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY ?? '',
    recipientEmail:
        process.env.NEXT_PUBLIC_CONTACT_RECIPIENT_EMAIL ?? 'mkmahmud.dev@gmail.com',
};
