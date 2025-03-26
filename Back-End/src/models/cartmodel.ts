
import mongoose, { Schema, Document } from "mongoose";

interface ICart extends Document {
  userId: mongoose.Types.ObjectId;
  bookId: mongoose.Types.ObjectId;
  quantity: number;
}

const cartSchema = new mongoose.Schema<ICart>({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
  quantity: { type: Number, required: true, default: 1 },
});


const Cart = mongoose.model<ICart>("Cart", cartSchema);

export default Cart;
