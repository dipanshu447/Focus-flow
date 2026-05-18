import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    sessions: [],
  });
});

router.post("/", (req, res) => {
  res.status(201).json({
    success: true,
    message: "Session created",
  });
});

router.delete("/:id", (req, res) => {
  res.status(200).json({
    success: true,
    message: `Session ${req.params.id} deleted`,
  });
});

export default router;