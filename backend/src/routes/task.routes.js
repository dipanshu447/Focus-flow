import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    tasks: [],
  });
});

router.post("/", (req, res) => {
  res.status(201).json({
    success: true,
    message: "Task created",
  });
});

router.patch("/:id", (req, res) => {
  res.status(200).json({
    success: true,
    message: `Task ${req.params.id} updated`,
  });
});

router.delete("/:id", (req, res) => {
  res.status(200).json({
    success: true,
    message: `Task ${req.params.id} deleted`,
  });
});

export default router;