import express from 'express';
import { contactSchema } from '../validators/contact.validator.js';
import { sendContactEmail } from '../services/email.service.js';

const router = express.Router();

router.post("/", async (req, res) => {
    try {
        const validatedData = contactSchema.parse(req.body);

        await sendContactEmail(validatedData);

        return res.status(200).json({
            success: true,
            message: "Message received successfully",
        });
    } catch (error) {
        console.error(error);

        return res.status(400).json({
            success: false,
            message: "Failed to send message",
        });
    }
})

export default router;