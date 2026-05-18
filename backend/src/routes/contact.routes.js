import express from 'express';

const router = express.Router();

router.post("/", (req, res) => {
    try {
        const { name, email, message } = req.body;

        console.log({
            name,
            email,
            message,
        });

        return res.status(200).json({
            success: true,
            message: "Message received successfully",
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
})

export default router;