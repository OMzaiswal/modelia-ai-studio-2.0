import { NextFunction, Request, Response } from "express";
import prisma from "../db";
import { register, login } from "../services/authService";
import { z } from "zod";
import { CustomError } from "../errors/customError";

const registerSchema = z.object({
    name: z.string('Name is required').min(2, 'Name should be at least 2 characters').max(30, 'Name can not exceed 30 characters'),
    email: z.string('Email is required').email('Invalid Email').max(30, 'Email can not exceed 30 characters'),
    password: z.string('Password is required').min(5, 'Password must be at least 5 characters').max(30, 'Password can not exceed 30 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter.')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter.')
    .regex(/[0-9]/, 'Password must contain at least one number')
    .regex(/[^A-Za-z0-9]/, 'Password must contains at least one special character')
});

const loginSchema = z.object({
    email: z.string('Email is required').email('Invalid Email'),
    password: z.string('Password is required').min(1, 'Password is required')
})

export const registerHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const parsed = registerSchema.safeParse(req.body);
        if (!parsed.success) {
            next(parsed.error);
            return;
        }
        const { name, email, password } = parsed.data;
        const { token, userId } = await register(name, email, password);
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000,    // 1 weak
            path: '/'
        })
        res.status(201).json({ message: 'Registered successfully', userId });
        return;
    } catch (err) {
        next(err)
    }
};

export const loginHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const parsed = loginSchema.safeParse(req.body);
        if (!parsed.success) {
            next(parsed.error);
            return;
        }
        const { email, password } = parsed.data;
        const { token, userId, userName } = await login(email, password);
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 7 * 24 * 60 * 60 * 1000,
            path: '/'
        })
        res.status(200).json({ message: 'Logged in successfully', userId, userName });
        return;
    } catch (err) {
        next(err)
    }
};

export const logoutHandler = async (req: Request, res: Response) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/'
        })
        res.status(200).json({ message: 'Logged out successfully'});
    } catch (err) {
        throw new CustomError('Error occured while logging out', 500);
    }
}