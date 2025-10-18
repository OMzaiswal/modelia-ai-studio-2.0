import { Router } from "express";
import { getGenerationHandler, postGenerationHandler } from "../controllers/generationController";
import { upload } from "../middlewares/uploadMiddleware";

const router = Router();

router.post("/", upload.single('image'), postGenerationHandler);
router.get('/', getGenerationHandler);

export default router;