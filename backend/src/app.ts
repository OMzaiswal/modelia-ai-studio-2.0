import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes";
import generationRoutes from "./routes/generationRoutes";
import { authenticateJWT } from "./middlewares/authMiddleware";

const app = express();
dotenv.config();

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}))

app.use(express.json());

app.use("/auth", authRoutes);
app.use(authenticateJWT);
app.use("/generations", generationRoutes);

export default app;