import express from "express";
import multer from "multer";
import path from "path";
import { getAllBooks, getFeaturedBooks, getBookById, updateBook, deleteBook, createBook } from "../controllers/bookcontroller";
import fs from "fs";

const router = express.Router();

// Cấu hình Multer để upload ảnh
const uploadDir = path.join(__dirname, "../uploads");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
const upload = multer({ storage });

// Kiểm tra xem thư mục upload có tồn tại không, nếu không sẽ tạo thư mục
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// API quản lý sách
router.get("/books", getAllBooks);
router.get("/books/featured", getFeaturedBooks);
router.get("/books/:id", getBookById); // 🆕 Lấy chi tiết sách theo ID
router.post("/api/books", upload.single("image"), createBook); // Thêm sách
router.put("/books/:id", upload.single("image"), updateBook); // Cập nhật sách
router.delete("/books/:id", deleteBook); // Xóa sách

export default router;
