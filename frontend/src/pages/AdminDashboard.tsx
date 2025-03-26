import React, { useEffect, useState } from "react";
import { Container, Grid, Typography, Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { Link } from "react-router-dom";
import axios from "axios";

interface Book {
  _id: string;
  title: string;
  author: string;
  price: number;
  description: string;
  category: string;
  imageUrl?: string;
}


const AdminDashboard: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    axios.get("/api/books").then((response) => {
      setBooks(response.data);
    });
  }, []);

  const handleDelete = async (id: string) => {
    if (!window.confirm("Bạn có chắc chắn muốn xóa sách này không?")) {
      return; 
    }
  
    console.log("ID cần xóa:", id);
    try {
      await axios.delete(`/api/books/${id}`);
      setBooks(books.filter((book) => book._id !== id));
      alert("Xóa sách thành công!");
    } catch (error: any) {
      console.error("Lỗi khi xóa sách:", error.response?.data || error.message);
    }
  };
  

  const filteredBooks = books.filter((book) =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Dashboard Quản trị
      </Typography>
      <TextField
        label="Tìm kiếm sách"
        fullWidth
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        margin="normal"
      />
      <Button
        variant="contained"
        color="primary"
        component={Link}
        to="/admin/add-book"
        sx={{ marginTop: "20px" }}
      >
        Thêm sách
      </Button>
      <TableContainer component={Paper} sx={{ marginTop: "20px" }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Tiêu đề</TableCell>
              <TableCell>Tác giả</TableCell>
              <TableCell>Ảnh</TableCell>
              <TableCell>Giá</TableCell>
              <TableCell>Danh mục</TableCell>
              <TableCell>Mô tả</TableCell>
              <TableCell>Thao tác</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredBooks.map((book) => (
              <TableRow key={book._id}> {/* Dùng book._id thay vì book.id */}
                <TableCell>{book.title}</TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>
                  {book.imageUrl ? (
                    <img src={`http://127.0.0.1:3000${book.imageUrl}`} alt={book.title} width="100" height="100" />
                  ) : (
                    "Không có ảnh"
                  )}
                </TableCell>
                <TableCell>{book.price} VND</TableCell>
                <TableCell>{book.category}</TableCell>
                <TableCell>{book.description}</TableCell>
                <TableCell>
                  <Button variant="outlined" color="primary" component={Link} to={`/admin/edit-book/${book._id}`}>
                    Sửa
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleDelete(book._id)} 
                    sx={{ marginLeft: "10px" }}
                  >
                    Xóa
                  </Button>
                </TableCell>
              </TableRow>
            ))}

          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default AdminDashboard;
