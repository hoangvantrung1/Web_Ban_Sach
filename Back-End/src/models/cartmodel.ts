import mongoose from "mongoose";

const CartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [
        {
            bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
            quantity: { type: Number, required: true, min: 1 }
        }
    ]
});

const Cart = mongoose.model("Cart", CartSchema);
export default Cart;
