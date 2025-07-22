import express from "express";
import { chatWithDeepSeek } from "../controllers/deepseekController.js";

const router = express.Router();

router.post("/chat", chatWithDeepSeek);

export default router;
