import express from "express";
import bcrypt from 'bcrypt';
import prisma from "../config/db.js";
import jwt from 'jsonwebtoken';
import gclient from '../config/oauth.js';

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      }
    });

    const token = jwt.sign({ userId: user.id, }, process.env.JWT_SECRET, { expiresIn: "7d", });

    res.status(201).json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      },
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server error",
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "7d", });

    res.status(200).json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      },
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server error",
    });
  }
});

router.post("/google", async (req, res) => {
  try {
    const { credential } = req.body;

    const ticket = await gclient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payLoad = ticket.getPayload();

    const { sub, email, name, picture } = payLoad;
    let user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      user = await prisma.user.create({
        data: {
          email,
          name,
          googleId: sub,
          avatarUrl: picture,
        },
      });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: "7d" });

    res.status(200).json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatarUrl: user.avatarUrl,
      },
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Google authentication failed",
    });
  }
});

export default router;