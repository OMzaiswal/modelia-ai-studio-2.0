import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { CustomError } from "../errors/customError";
import { AbortError } from "../errors/abortError";

export const errorHandler = (err: any , req: Request, res: Response, next: NextFunction) => {
    // console.error(err);

    if (err instanceof ZodError) {
        const message = err.issues[0]?.message || 'Validation Error';
        // console.log(message);
        res.status(400).json({ success: false, message });
        return;
    }

    if (err instanceof CustomError) {
        res.status(err.statusCode).json({ success: false, message: err.message });
        return;
    }

    if (err instanceof AbortError) {
        res.status(499).json({ success: false, message: err.message });
        return;
    }
    
    res.status(500).json({ success: false, message: 'Internal Server Error'});
}