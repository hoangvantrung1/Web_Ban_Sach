// // src/routes/cartroutes.ts
// import express, { Request, Response, NextFunction } from "express";
// import { authenticate } from "../middleware/authmiddleware"; // Import authenticate middleware
// import { addToCart, checkout } from "../controllers/cartcontroller"; // Import controller functions

// const router = express.Router();

// // Add to Cart route
// router.post("/add", authenticate, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//   try {
//     await addToCart(req, res, next); // Handle adding to cart
//   } catch (error) {
//     next(error); // Handle any errors by passing them to the error handler
//   }
// });

// // Checkout route
// router.post("/checkout", authenticate, async (req: Request, res: Response, next: NextFunction): Promise<void> => {
//   try {
//     await checkout(req, res, next); // Handle checkout
//   } catch (error) {
//     next(error); // Handle any errors by passing them to the error handler
//   }
// });

// export default router;
