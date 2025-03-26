// src/middleware/authmiddleware.ts
import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

interface JwtPayload {
  userId: string;
}

export const authenticate = (req: Request, res: Response, next: NextFunction): void => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
     res.status(401).json({ message: "Chưa đăng nhập" });
     return;
  }

  try {
    const secretKey = process.env.JWT_SECRET;
    if (!secretKey) {
       res.status(500).json({ message: "Không tìm thấy secret key" });
       return;
    }

    // Cast to `unknown` first to ensure type safety
    const decoded = jwt.verify(token, secretKey) as unknown;

    // Type assertion to ensure `decoded` has `userId`
    if (typeof decoded === "object" && decoded !== null && "userId" in decoded) {
      req.userId = (decoded as JwtPayload).userId; // Safe to access userId now
      next();
    } else {
      res.status(401).json({ message: "Token không hợp lệ" });
    }
  } catch (error) {
     res.status(401).json({ message: "Token không hợp lệ" });
     return;
  }
};
