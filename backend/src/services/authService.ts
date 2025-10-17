import prisma from "../db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { CustomError } from "../errors/customError";

const SECRET = process.env.JWT_SECRET;
if (!SECRET) {
    throw new Error("JWT_SECRET is not set");
}

export const register = async (name: string, email: string, password: string) => {
    const existingUser = await prisma.user.findUnique({
        where: { email },
    });
    if (existingUser) {
        throw new CustomError("User already exists", 409);
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
        data: { name, email, password: hashedPassword },
    });
    const token = jwt.sign({ userId: user.id, email }, SECRET, { expiresIn: "1h" });
    return { token, userId: user.id };
};

export const login = async (email: string, password: string) => {
    const user = await prisma.user.findUnique({
        where: { email },
    }); 
    if (!user) {
        throw new CustomError("User not found", 404);
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        throw new CustomError("Invalid password", 401);
    }
    const token = jwt.sign({ userId: user.id, email }, SECRET, { expiresIn: "1h" });
    return { token, userId: user.id };
};