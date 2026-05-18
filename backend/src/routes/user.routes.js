import express from "express";

const router = express.Router();

router.get("/me", (req, res) => {
  res.status(200).json({
    success: true,
    user: {
      id: "123",
      name: "Dipanshu",
      email: "test@example.com",
    },
  });
});

router.patch("/profile", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Profile updated",
  });
});

router.patch("/settings", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Settings updated",
  });
});

export default router;