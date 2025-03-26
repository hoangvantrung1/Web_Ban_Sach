// bookmodel.ts
import mongoose, { Schema, Document } from "mongoose";

interface IBook extends Document {
  title: string;
  author: string;
  price: number;
  description: string;
  categoryId: mongoose.Types.ObjectId; // Should be ObjectId
  image: string;
}

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
  image: { type: String },
});

const Book = mongoose.model<IBook>('Book', bookSchema);

export default Book;
