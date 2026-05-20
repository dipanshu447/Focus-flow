import express from 'express';
import cors from 'cors';
import contactRoutes from './routes/contact.routes.js';
import userRoutes from './routes/user.routes.js';
import taskRoutes from './routes/task.routes.js';
import sessionRoutes from './routes/session.routes.js';
import authRoutes from './routes/auth.routes.js';
import authMiddleware from './middleware/auth.middleware.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/contact", contactRoutes);
app.use("/api/user", authMiddleware, userRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/sessions", sessionRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "FocusFlow API running!!!"
    });
});

export default app;