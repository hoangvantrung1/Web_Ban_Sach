import React, { useState } from "react";
import { TextField, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const categoryMap = {
  fiction: "67e335ec2b0ec7c776af2faa", // Example category ObjectId from MongoDB
  science: "67e3360c2b0ec7c776af2fad",
  history: "60d21b4667d0d8992e610c87",
};
const AddProduct: React.FC = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [price, setPrice] = useState<number | string>("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const handleAddProduct = async () => {
    if (!title || !author || !price || !description || !category) {
      setError("Vui lòng điền đầy đủ thông tin!");
      return;
    }
  
    setLoading(true);
    setError(null);
  
    const formData = new FormData();
    formData.append("title", title);
    formData.append("author", author);
    formData.append("price", price.toString());
    formData.append("description", description);
    formData.append("categoryId", category);
    if (image) {
      formData.append("image", image);
    }
  
    try {
      const API_URL = "http://localhost:3000/api/books";
      const response = await fetch(API_URL, {
        method: "POST",
        body: formData,
      });
  
      if (!response.ok) {
        throw new Error("Thêm sản phẩm thất bại. Hãy thử lại!");
      }
  
      const data = await response.json();
      console.log("Thêm sản phẩm thành công:", data);
  
      // Reset form after success
      setTitle("");
      setAuthor("");
      setPrice("");
      setDescription("");
      setImage(null);
      setImagePreview(null);
      setError(null);
  
      // Redirect to dashboard
      setTimeout(() => {
        navigate("/admin/dashboard");
      }, 1000);
    } catch (err: any) {
      console.error("Lỗi khi thêm sản phẩm:", err);
      const errorMessage =
        err.message || "Đã xảy ra lỗi khi thêm sản phẩm. Vui lòng thử lại!";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <Container>
      <Typography variant="h4">Thêm sách mới</Typography>
      {error && <Typography color="error">{error}</Typography>}

      <TextField label="Tiêu đề" fullWidth value={title} onChange={(e) => setTitle(e.target.value)} margin="normal" />
      <TextField label="Tác giả" fullWidth value={author} onChange={(e) => setAuthor(e.target.value)} margin="normal" />
      <TextField label="Giá" type="number" fullWidth value={price} onChange={(e) => setPrice(e.target.value)} margin="normal" />
      <TextField label="Miêu tả" fullWidth value={description} onChange={(e) => setDescription(e.target.value)} margin="normal" />
      <TextField
        label="Danh mục"
        fullWidth
        select
        SelectProps={{ native: true }}
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        margin="normal"
      >
        <option value="">Chọn danh mục</option>
        <option value="fiction">Tiểu thuyết</option>
        <option value="science">Khoa học</option>
        <option value="history">Lịch sử</option>
      </TextField>
      <input type="file" accept="image/*" onChange={handleImageChange} style={{ marginTop: "10px" }} />

      {imagePreview && (
        <div style={{ marginTop: "10px" }}>
          <img src={imagePreview} alt="Preview" width="200" />
        </div>
      )}

      <Button onClick={handleAddProduct} variant="contained" color="primary" sx={{ marginTop: "20px" }} disabled={loading}>
        {loading ? "Đang thêm..." : "Thêm sản phẩm"}
      </Button>
    </Container>
  );
};

export default AddProduct;
