import express from "express";
import multer from "multer";
import path from "path";
import { getAllBooks, getFeaturedBooks, getBookById, updateBook, deleteBook, createBook } from "../controllers/bookcontroller";
import fs from "fs";
import Book from "../models/bookmodel";

const router = express.Router();
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

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
router.get("/books", async (req, res) => {
  try {
    const searchQuery = req.query.search?.toString() || "";
    const books = await Book.find({
      title: { $regex: searchQuery, $options: "i" } 
    });
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi tìm kiếm sách", error });
  }
});



router.get("/books", getAllBooks);
router.get("/books/featured", getFeaturedBooks);
router.get("/books/:id", getBookById); 
router.post("/api/books", upload.single("image"), createBook); 
router.put("/books/:id", upload.single("image"), updateBook);
router.delete("/books/:id", deleteBook); 

export default router;
