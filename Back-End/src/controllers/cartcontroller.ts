
import { Request, Response, NextFunction } from "express";
import Cart from "../models/cartmodel"; 
import Book from "../models/bookmodel"; 


export const addToCart = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { bookId, quantity } = req.body;
    const userId = req.userId; 

    const book = await Book.findById(bookId);
    if (!book) {
      res.status(404).json({ message: "Book not found" });
      return;
    }

    let cartItem = await Cart.findOne({ userId, bookId });
    if (cartItem) {
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {

      cartItem = new Cart({
        userId,
        bookId,
        quantity,
      });
      await cartItem.save();
    }

    res.status(200).json({ message: "Book added to cart", cartItem });
  } catch (error) {
    next(error); 
  }
};

export const checkout = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.userId;

    const cartItems = await Cart.find({ userId }).populate("bookId");

    if (!cartItems.length) {
      res.status(400).json({ message: "Your cart is empty" });
      return;
    }

    await Cart.deleteMany({ userId });

    res.status(200).json({ message: "Checkout successful", cartItems });
  } catch (error) {
    next(error); 
  }
};
