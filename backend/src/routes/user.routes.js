import express from "express";
import prisma from "../config/db.js";

const router = express.Router();

router.get("/me", async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.userId,
      },
      select: {
        id: true,
        email: true,
        name: true,
        avatarUrl: true,
        role: true,
        theme: true,
        createdAt: true
      },
    });

    res.status(200).json({ user });

  } catch (error) {
    res.status(500).json({
      message: "Internal server error",
    });
  }
});

router.patch("/profile", async (req, res) => {
  try {
    const { name, role, theme } = req.body;

    const updateUser = await prisma.user.update({
      where: {
        id: req.user.userId,
      },

      data: {
        name,
        role,
        theme
      },
    });

    res.status(200).json({
      user: updateUser,
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
});

router.delete("/delete", async (req, res) => {
  try {
    await prisma.user.delete({
      where: {
        id: req.user.userId,
      },
    });

    res.status(200).json({
      message: "Account deleted successfully",
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
});

export default router;