import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';
import { CustomError } from "../errors/customError";

const SECRET = process.env.JWT_SECRET;
if (!SECRET) {
    throw new Error("JWT_SECRET is not set");
}

interface JwtPayload {
    userId: string;
    email: string;
}

export const authenticateJWT = async (req: Request, res: Response, next: NextFunction) => {
    const token = req.cookies.token;
    if (!token) {
        throw new CustomError('Authorization token is missing!!', 401);
    }
    try {
        const decoded = jwt.verify(token, SECRET) as JwtPayload;
        req.user = { id: decoded.userId, email: decoded.email };
        next();
        } catch (err){
            throw new CustomError("Invalid or Expired token", 403);
        }
}