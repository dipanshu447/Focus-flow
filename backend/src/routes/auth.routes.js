import express from "express";
import bcrypt from 'bcrypt';
import prisma from "../config/db.js";
import jwt from 'jsonwebtoken';
import gclient from '../config/oauth.js';
import crypto from 'crypto';
import { sendWelcomeEmail } from "../services/email.service.js";
import { transporter } from "../config/mail.js";

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
    await sendWelcomeEmail({
      email: user.email,
      name: user.name
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
        email: user.email,
        theme: user.theme
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

      await sendWelcomeEmail({
        email: user.email,
        name: user.name,
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

router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;

    const user = await prisma.user.findUnique({
      where: {
        email
      },
    });

    if (!user) {
      return res.status(200).json({
        message:
          "If an account exists, a reset link has been sent.",
      });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");
    const hashedToken = crypto.createHash("sha256").update(resetToken).digest("hex");
    const expiry = new Date(Date.now() + 15 * 60 * 1000);

    await prisma.user.update({
      where: { email },
      data: {
        resetPasswordToken: hashedToken,
        resetPasswordExpiry: expiry,
      }
    });

    const resetUrl = `${process.env.CLIENT_URL}/reset-password?token=${resetToken}`;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      // from: process.env.RESEND_FROM_EMAIL,
      to: email,
      subject: "Reset Your FocusFlow Password",
      html: `
<div style="
  background:#000000;
  padding:40px 20px;
  font-family:Inter,Arial,sans-serif;
  color:#ffffff;
">

  <div style="
    max-width:600px;
    margin:0 auto;
    background:#0a0a0a;
    border:1px solid #1a1a1a;
    border-radius:24px;
    overflow:hidden;
  ">

    <!-- Header -->
    <div style="
      padding:48px 32px 36px;
      text-align:center;
      border-bottom:1px solid #1a1a1a;
    ">

      <img
        src="https://github.com/dipanshu447/Focus-flow/raw/main/.github/FocusFlow.png"
        width="64"
        alt="FocusFlow"
        style="margin-bottom:20px;"
      />

      <h1 style="
        margin:0;
        font-size:42px;
        font-weight:700;
        letter-spacing:-1px;
        color:#ffffff;
      ">
        FocusFlow
      </h1>

      <p style="
        margin-top:8px;
        color:#8a8a8a;
        font-size:18px;
      ">
        Focus better. Build consistency.
      </p>

    </div>

    <!-- Content -->
    <div style="padding:48px 32px;">

      <h2 style="
        margin:0 0 28px;
        font-size:30px;
        color:#ffffff;
        letter-spacing:-1px;
      ">
        Reset Your Password
      </h2>

      <p style="
        color:#b3b3b3;
        font-size:18px;
        line-height:1.9;
        margin-bottom:24px;
      ">
        Hello ${user.name},
      </p>

      <p style="
        color:#b3b3b3;
        font-size:18px;
        line-height:1.9;
        margin-bottom:36px;
      ">
        We received a request to reset your FocusFlow password.
        Click the button below to continue.
      </p>

      <!-- Button -->
      <div style="text-align:center; margin:42px 0;">

        <a
          href="${resetUrl}"
          style="
            display:inline-block;
            background:#ffffff;
            color:#000000;
            padding:18px 34px;
            border-radius:14px;
            text-decoration:none;
            font-weight:700;
            font-size:16px;
          "
        >
          Reset Password
        </a>

      </div>

      <div style="
        margin-top:42px;
        color:#7a7a7a;
        font-size:15px;
        line-height:1.8;
      ">
        <p>
          This reset link expires in 15 minutes.
        </p>

        <p>
          If you didn’t request this, you can safely ignore this email.
        </p>
      </div>

    </div>

    <!-- Footer -->
    <div style="
      border-top:1px solid #1a1a1a;
      padding:32px;
      text-align:center;
    ">

      <p style="
        color:#ffffff;
        font-size:20px;
        margin-bottom:8px;
        font-weight:600;
      ">
        Stay focused. Keep building.
      </p>

      <p style="
        color:#7a7a7a;
        margin-bottom:28px;
        font-size:15px;
      ">
        — The FocusFlow Team
      </p>

      <div style="
        width:180px;
        height:1px;
        background:#1f1f1f;
        margin:0 auto 28px;
      "></div>

      <p style="
        color:#6a6a6a;
        font-size:14px;
        margin-bottom:18px;
      ">
        Built with focus by Dipanshu Sahu
      </p>

      <div>

        <a
          href="https://www.itsdipanshu.dev"
          style="
            color:#9a9a9a;
            text-decoration:none;
            margin:0 10px;
            font-size:14px;
          "
        >
          Portfolio
        </a>

        <a
          href="https://www.linkedin.com/in/dipanshu447"
          style="
            color:#9a9a9a;
            text-decoration:none;
            margin:0 10px;
            font-size:14px;
          "
        >
          LinkedIn
        </a>

        <a
          href="https://github.com/dipanshu447"
          style="
            color:#9a9a9a;
            text-decoration:none;
            margin:0 10px;
            font-size:14px;
          "
        >
          GitHub
        </a>

      </div>

    </div>

  </div>

</div>
`
    });

    return res.status(200).json({
      message:
        "If an account exists, a reset link has been sent.",
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Something went wrong",
    });
  }
});

router.post("/reset-password", async (req, res) => {
  try {
    const { token, password } = req.body;

    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");

    const user = await prisma.user.findFirst({
      where: {
        resetPasswordToken: hashedToken,
        resetPasswordExpiry: {
          gt: new Date(),
        },
      },
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid or expired token",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: hashedPassword,
        resetPasswordToken: null,
        resetPasswordExpiry: null,
      },
    });

    return res.status(200).json({
      message: "Password reset successful",
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Something went wrong",
    });
  }
});

export default router;