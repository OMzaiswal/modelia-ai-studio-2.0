import { Request, Response } from "express";
import prisma from "../db";
import { register, login } from "../services/authService";
import { z } from "zod";
import { CustomError } from "../errors/customError";

const registerSchema = z.object({
    name: z.string('Name is required').min(2, 'Name is required'),
    email: z.string('Email is required').email('Invalid Email'),
    password: z.string('Password is required').min(5, 'Password must be at least 5 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter.')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter.')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contains at least one special character')
});

const loginSchema = z.object({
    email: z.string('Email is required').email('Invalid Email'),
    password: z.string('Password is required').min(5, 'Password must be at least 5 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter.')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter.')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contains at least one special character')
})

export const registerHandler = async (req: Request, res: Response) => {
    try {
        const parsed = registerSchema.safeParse(req.body);
        if (!parsed.success) {
            res.status(400).json({ error: parsed.error.issues });
            return;
        }
        const { name, email, password } = parsed.data;
        const userData = await register(name, email, password);
        res.status(201).json(userData);
        return;
    } catch (error: any) {
        if (error instanceof CustomError) {
            res.status(error.statusCode).json({ message: error.message });
            return;
        }
        res.status(500).json({ message: "Internal server error" });
        return;
    }
};

export const loginHandler = async (req: Request, res: Response) => {
    try {
        const parsed = loginSchema.safeParse(req.body);
        if (!parsed.success) {
            res.status(400).json({ error: parsed.error.issues });
            return;
        }
        const { email, password } = parsed.data;
        const userData = await login(email, password);
        res.status(200).json(userData);
        return;
    } catch (error: any) {
        if (error instanceof CustomError) {
            res.status(error.statusCode).json({ message: error.message });
            return;
        }
        res.status(500).json({ message: "Internal server error" });
        return;
    }
};