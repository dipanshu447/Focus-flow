import express from "express";
import prisma from "../config/db.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const tasks = await prisma.task.findMany({
      where: {
        userId: req.user.userId,
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    res.status(200).json({
      success: true,
      tasks
    });

  } catch (error) {
    console.error("Get Tasks Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch tasks",
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const { title } = req.body;

    if (!title || !title.trim()) {
      return res.status(400).json({
        success: false,
        message: "Task title is required",
      });
    }

    const task = await prisma.task.create({
      data: {
        title: title.trim(),
        userId: req.user.userId,
      }
    });

    return res.status(201).json({
      success: true,
      task,
    });

  } catch (error) {
    console.error("Create Task Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to create task",
    });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const { title, completed } = req.body;

    if (title === undefined && completed === undefined) {
      return res.status(400).json({
        success: false,
        message: "Nothing to update",
      });
    }

    if (title !== undefined && !title.trim()) {
      return res.status(400).json({
        success: false,
        message: "Task title cannot be empty",
      });
    }

    const existingTask = await prisma.task.findFirst({
      where: {
        id: req.params.id,
        userId: req.user.userId,
      },
    });

    if (!existingTask) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    const updateTask = await prisma.task.update({
      where: {
        id: existingTask.id,
      },
      data: {
        ...(title !== undefined && {
          title: title.trim(),
        }),

        ...(completed !== undefined && {
          completed,
        }),
      },
    });

    return res.status(200).json({
      success: true,
      task: updateTask,
    });

  } catch (error) {
    console.error("Update Task Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to update task",
    });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const existingTask = await prisma.task.findFirst({
      where: {
        id: req.params.id,
        userId: req.user.userId,
      },
    });

    if (!existingTask) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    await prisma.task.delete({
      where: {
        id: existingTask.id,
      },
    });

    return res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });

  } catch (error) {
    console.error("Delete Task Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to delete task",
    });
  }
});

export default router;