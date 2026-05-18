import express from "express";

const router = express.Router();

router.post("/register", (req, res) => {
  res.status(201).json({
    success: true,
    message: "Register route working",
  });
});

router.post("/login", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Login route working",
  });
});

router.post("/google", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Google auth route working",
  });
});

router.post("/logout", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Logout route working",
  });
});

export default router;