import {z} from 'zod';

export const contactSchema = z.object({
    name: z.string().min(2, "Name is too short").max(20, "Name is too long"),
    email: z.string().email("Invalid email address"),
    message: z.string().min(10, "Message is too short").max(1000, "Message is too long")
})