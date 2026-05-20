import express from "express";
import prisma from "../config/db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const sessions = await prisma.session.findMany({
      where: {
        userId: req.user.userId,
      },
      include: {
        task: true,
      },
      orderBy: {
        completedAt: "desc",
      },
    });

    res.status(200).json({
      success: true,
      sessions,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch sessions",
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const { duration, startedAt, completedAt, taskId, } = req.body;

    const session = await prisma.session.create({
      data: {
        duration,
        startedAt: new Date(startedAt),
        completedAt: new Date(completedAt),
        taskId: taskId || null,
        userId: req.user.userId,
      },
    });

    res.status(201).json({
      success: true,
      session,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to create session",
    });
  }
});

export default router;