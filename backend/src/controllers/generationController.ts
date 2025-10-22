import { NextFunction, Request, Response } from "express"
import z from "zod";
import { CustomError } from "../errors/customError";
import { generateAIResponse } from "../ai-model/aiSimulation";
import prisma from "../db";
import { AbortError } from "../errors/abortError";


const generationSchema = z.object({
    prompt: z.string('Please enter any prompt')
        .min(1, { message: "Prompt is required" })
        .max(300, { message: "Prompt too long (max 300 chars)" }),
    style: z.enum(["Editorial", "Streetwear", "Vintage"]).refine(
        (val) => ["Editorial", "Streetwear", "Vintage"].includes(val),
        "Style must be one of: Editorial, Streetwear, or Vintage"
      ),
  });

export const postGenerationHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            res.status(401).json({ message: "Missing or Expired Credential, Please login again!"});
            return;
        }
        const parsed = generationSchema.safeParse(req.body);
        if (!parsed.success) {
            res.status(400).json({ errors: parsed.error.format() });
            return;
        }
        const image = req.file;
        if (!image) {
            res.status(400).json({ message: "Image file is required" });
            return;
        }
        
        const aiRes = await generateAIResponse()
        if (aiRes === "Failure") {
            res.status(503).json({ message: "Model overloaded" });
            return;
          }
          if (aiRes === "Success") {
            const generation = await prisma.generation.create({
                data: {
                    userId: userId,
                    prompt: parsed.data.prompt,
                    style: parsed.data.style,
                    imageUrl: `https://picsum.photos/400/400?random=${Math.floor(Math.random() * 1000)}`,
                    generationStatus: "SUCCESS"
                }
            })
            res.status(201).json({ generation });
            return;
          }

    } catch (err) {
        next(err);
    }
}

export const getGenerationHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            res.status(401).json({ message: "Missing or Expired Credential, Please login again!"});
            return;
        }
        const limit = parseInt(req.query.limit as string) || 5;
        const generations = await prisma.generation.findMany({
            where: { userId },
            orderBy: { createdAt: 'desc' },
            take: limit
        });
        res.status(200).json({ generations });
        return;
        
    } catch (err) {
        next(err);
    }
}