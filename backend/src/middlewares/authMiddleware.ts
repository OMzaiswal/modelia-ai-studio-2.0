import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET;
if (!SECRET) {
    throw new Error("JWT_SECRET is not set");
}

interface JwtPayload {
    userId: string;
    email: string;
}

export const authenticateJWT = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        res.status(401).json({message: 'Authoriztion token is missing!!'});
        return;
    }
    const token = authHeader?.split(' ')[1];
    if (!token) {
        res.status(401).json('Token format is invalid');
        return;
    }
    try {
        const decoded = jwt.verify(token, SECRET) as JwtPayload;
        req.user = { id: decoded.userId, email: decoded.email };
        next();
        } catch (err){
            res.status(403).json({ message: "Invalid or Expired token" });
            return;
        }
}