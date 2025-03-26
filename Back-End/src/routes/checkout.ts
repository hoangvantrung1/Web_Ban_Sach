import { Router } from "express";
import { authenticate } from "../middleware/authmiddleware"; 

const router = Router();


router.post("/checkout", authenticate, (req, res) => {
    const userId = req.userId; 


    res.status(200).json({ message: "Đặt hàng thành công!" });
});

export default router;
