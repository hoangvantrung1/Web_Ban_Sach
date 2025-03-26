// import { Router, Response } from "express";
// import Order from "../models/ordermodel";
// import { authenticate } from "../middleware/authmiddleware";

// const router = Router();

// router.get("/orders", authenticate, async (req, res: Response) => {
//   try {
//     const userId = (req as any).userId; // Dùng "as any" tạm thời hoặc sửa lại kiểu request
//     if (!userId) {
//       return res.status(401).json({ message: "Không tìm thấy userId" });
//     }

//     const orders = await Order.find({ userId });
//     res.json(orders);
//   } catch (error) {
//     res.status(500).json({ message: "Lỗi khi lấy đơn hàng", error });
//   }
// });

// export default router;
