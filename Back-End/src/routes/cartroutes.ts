import express from "express";
import { addToCart } from "../controllers/cartcontroller";
import { authenticate } from "../middleware/authmiddleware";

const router = express.Router(); // ✅ Định nghĩa router đúng cách

router.post("/add",authenticate, addToCart); // ✅ Sử dụng đúng callback

export default router;
