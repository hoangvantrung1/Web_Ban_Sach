import { Request, Response } from "express";
import Category from "../models/category";
import slugify from "slugify"; 

export const createCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, description } = req.body;

    if (!name || !description) {
      res.status(400).json({ message: "Tên và mô tả danh mục là bắt buộc" });
      return;
    }
    const existingCategory = await Category.findOne({ name });
    if (existingCategory) {
      res.status(400).json({ message: "Danh mục đã tồn tại" });
      return;
    }

    const slug = slugify(name, { lower: true });


    const newCategory = new Category({ name, description, slug });
    await newCategory.save();

    res.status(201).json(newCategory);  
  } catch (error) {
    console.error('Lỗi khi tạo danh mục:', error);
    res.status(500).json({ message: 'Lỗi server khi tạo danh mục' });
  }
};
