import { resend } from "../config/resend.js";

export const sendContactEmail = async ({ name, email, message }) => {
    return await resend.emails.send({
        from: "onboarding@resend.dev",
        to: process.env.CONTACT_RECEIVER_EMAIL,
        subject: `New FocusFlow Contact Message from ${name}`,
        replyTo: email,
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    });
};