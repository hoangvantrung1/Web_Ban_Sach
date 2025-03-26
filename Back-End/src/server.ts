import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bookRoutes from "./routes/bookroutes";
import path from "path";
import cors from "cors";
import cartRoutes from "./routes/cartroutes";
import categoryRoutes from "./routes/categoryRoutes"; 
import authRoutes from "./routes/authroutes";
dotenv.config();
const app = express();

app.use(express.json());
app.use("/api", bookRoutes);  // Đảm bảo đúng prefix "/api"
app.use((req, res, next) => {
  console.log(`Received request: ${req.method} ${req.path}`);
  next();
}); 
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use("/api/cart", cartRoutes); 
app.use("/api/categories", categoryRoutes);
app.use("/api/auth", authRoutes);
mongoose
  .connect("mongodb://localhost:27017/web_ban_sach")
  .then(() => {
    console.log("Kết nối MongoDB thành công!");
    app.listen(3000, () => console.log("Server running on http://localhost:3000"));
  })
  .catch((error) => {
    console.error("Kết nối MongoDB thất bại:", error);
  });
