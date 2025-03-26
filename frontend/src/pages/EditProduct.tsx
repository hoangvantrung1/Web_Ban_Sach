import React, { useState, useEffect } from "react";
import { TextField, Button, Container, Typography, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const categories = [
  { value: "fiction", label: "Tiểu thuyết" },
  { value: "science", label: "Khoa học" },
  { value: "history", label: "Lịch sử" },
];

const EditBook: React.FC = () => {
  const [book, setBook] = useState({
    title: "",
    author: "",
    price: "",
    description: "",
    imageUrl: "",
    category: "",
  });

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      axios.get(`/api/books/${id}`)
        .then((response) => {
          setBook((prevBook) => ({
            ...prevBook,
            ...response.data
          }));
        })
        .catch((err) => console.error("Lỗi khi lấy sách:", err));
    }
  }, [id]);

  const handleEditBook = () => {
    const formData = new FormData();
    formData.append("title", book.title);
    formData.append("author", book.author);
    formData.append("price", book.price.toString());
    formData.append("description", book.description);
    formData.append("category", book.category); // Gửi danh mục

    if (selectedFile) {
      formData.append("image", selectedFile);
    }

    axios
      .put(`/api/books/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then(() => {
        navigate("/admin/dashboard");
      })
      .catch((err) => console.error("Lỗi cập nhật:", err.response?.data || err));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement> | SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFile(e.target.files?.[0] || null);
  };

  return (
    <Container>
      <Typography variant="h4">Sửa sách</Typography>
      <TextField label="Tiêu đề" fullWidth name="title" value={book.title} onChange={handleChange} margin="normal" />
      <TextField label="Tác giả" fullWidth name="author" value={book.author} onChange={handleChange} margin="normal" />
      <TextField label="Giá" type="number" fullWidth name="price" value={book.price} onChange={handleChange} margin="normal" />
      <TextField label="Miêu tả" fullWidth name="description" value={book.description} onChange={handleChange} margin="normal" />

      {/* Chọn danh mục */}
      <FormControl fullWidth margin="normal">
        <InputLabel>Danh mục</InputLabel>
        <Select name="category" value={book.category} onChange={handleChange}>
          {categories.map((cat) => (
            <MenuItem key={cat.value} value={cat.value}>
              {cat.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Hiển thị ảnh hiện tại */}
      {book.imageUrl && <img src={`http://127.0.0.1:3000${book.imageUrl}`} alt="Book" width="150" style={{ margin: "10px 0" }} />}

      {/* Input file để chọn ảnh mới */}
      <input type="file" accept="image/*" name="image" onChange={handleFileChange} />

      <Button onClick={handleEditBook} variant="contained" color="primary" sx={{ marginTop: "20px" }}>
        Cập nhật sách
      </Button>
    </Container>
  );
};

export default EditBook;
