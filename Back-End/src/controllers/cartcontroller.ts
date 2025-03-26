import { Request, Response } from "express";
import Cart from "../models/cartmodel";
import jwt from "jsonwebtoken";

interface JwtPayload {
    userId: string;
}

export const addToCart = async (req: Request, res: Response): Promise<void> => {
    try {
        // 🛑 Lấy token từ Header
        const token = req.headers.authorization?.split(" ")[1];
        console.log("Authorization Header:", req.headers.authorization); // Log to ensure token is passed correctly
        if (!token) {
            res.status(401).json({ message: "Chưa đăng nhập" });
            return;
        }

        // 🛑 Giải mã token để lấy userId
        const secretKey = process.env.JWT_SECRET;
        if (!secretKey) {
            res.status(500).json({ message: "Không tìm thấy secret key" });
            return;
        }

        let decoded: JwtPayload;
        try {
            decoded = jwt.verify(token, secretKey) as JwtPayload;
            console.log("Decoded Token:", decoded); // Log the decoded token for debugging
        } catch (error) {
            res.status(401).json({ message: "Token không hợp lệ" });
            return;
        }
        { headers: { Authorization: `Bearer ${token}` } }


        // Lấy userId từ decoded token
        const userId = decoded.userId;

        // 🛑 Kiểm tra dữ liệu đầu vào
        const { bookId, quantity } = req.body;
        if (!bookId || !quantity) {
            res.status(400).json({ message: "Thiếu dữ liệu" });
            return;
        }

        // 🛑 Xử lý giỏ hàng
        let cart = await Cart.findOne({ userId });
        if (!cart) {
            cart = new Cart({ userId, items: [] });
        }
        
        const itemIndex = cart.items.findIndex((item) => item.bookId.toString() === bookId);
        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += quantity; // Cập nhật số lượng nếu sách đã có trong giỏ hàng
        } else {
            cart.items.push({ bookId, quantity }); // Thêm mới nếu sách chưa có trong giỏ hàng
        }

        await cart.save(); // Lưu giỏ hàng

        res.status(200).json({ message: "Thêm vào giỏ hàng thành công", cart });
    } catch (error) {
        console.error("Lỗi:", error);
        res.status(500).json({ message: "Lỗi server" });
    }
};

