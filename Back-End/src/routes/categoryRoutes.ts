import express from "express";
import { createCategory } from "../controllers/categoryController";  // Đảm bảo controller đúng
const router = express.Router();

router.post("/", createCategory);  // Đảm bảo đúng route và controller

export default router;
