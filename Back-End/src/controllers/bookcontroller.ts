import { Request, Response } from "express";
import BookModel from "../models/bookmodel";
import Category from "../models/category"; // Nhập mô hình Category
import multer from "multer";

// Lấy tất cả sách với bộ lọc
export const getAllBooks = async (req: Request, res: Response) => {
  try {
    const { category, q } = req.query;
    let filter: any = {};
    if (category) filter.category = category;
    if (q) {
      filter.$or = [
        { title: new RegExp(q as string, "i") },
        { author: new RegExp(q as string, "i") },
      ];
    }

    const books = await BookModel.find(filter);
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy danh sách sách" });
  }
};

// Lấy sách nổi bật
export const getFeaturedBooks = async (req: Request, res: Response) => {
  try {
    const featuredBooks = await BookModel.find().sort({ rating: -1 }).limit(5);
    res.json(featuredBooks);
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi lấy sách nổi bật" });
  }
};

// Lấy chi tiết sách theo ID
export const getBookById = async (req: Request, res: Response): Promise<void> => {
  try {
    const book = await BookModel.findById(req.params.id);
    if (!book) {
      res.status(404).json({ message: "Sách không tìm thấy" });
      return;
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server" });
  }
};
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");  // Path where images will be saved
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);  // Unique file name
  },
});

const upload = multer({ storage: storage }); 
// Tạo mới sách và liên kết với danh mục
export const createBook = async (req: Request, res: Response) => {
  try {
    const { title, author, price, description, categoryId } = req.body;
    const image = req.file ? req.file.path : null;  // Assuming image is being uploaded correctly

    const newBook = new BookModel({
      title,
      author,
      price,
      description,
      categoryId,  // This should be an ObjectId from your database
      image,
    });

    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (error) {
    console.error("Error creating book:", error);
    res.status(400).json({ message: "Error creating book", error });
  }
};
// Cập nhật thông tin sách
export const updateBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, author, price, description } = req.body;
    const updatedBook = await BookModel.findByIdAndUpdate(id, { title, author, price, description }, { new: true });

    if (!updatedBook) {
      res.status(404).json({ message: "Không tìm thấy sách" });
      return;
    }
    res.json(updatedBook);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server khi cập nhật sách" });
  }
};

// Xóa sách
export const deleteBook = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const deletedBook = await BookModel.findByIdAndDelete(id);
    if (!deletedBook) {
      res.status(404).json({ message: "Sách không tồn tại" });
      return;
    }
    res.json({ message: "Xóa sách thành công", book: deletedBook });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi xóa sách" });
  }
};
