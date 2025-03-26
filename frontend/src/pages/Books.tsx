import React, { useEffect, useRef, useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Button,
  Box,
  Tabs,
  Tab,
  CardActionArea,
} from "@mui/material";
import { motion } from "framer-motion";
import axios from "axios";
import { FaChevronLeft, FaChevronRight, FaGift, FaLock, FaTruck } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import Footer from "../components/footer";

// Interface cho sách
interface Book {
  id: string; // Sửa thành string để khớp với MongoDB ObjectId
  title: string;
  author: string;
  price?: number;
  imageUrl?: string;
}

// Danh sách danh mục
const categories = [
  { value: "", label: "Tất cả" },
  { value: "fiction", label: "Tiểu thuyết" },
  { value: "science", label: "Khoa học" },
  { value: "history", label: "Lịch sử" },
];

const Books = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [featuredBooks, setFeaturedBooks] = useState<Book[]>([]);
  const [category, setCategory] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [scrollX, setScrollX] = useState(0);
  const scrollAmount = 300;
  const navigate = useNavigate();
  const handleScroll = (direction: "next" | "prev") => {
    if (carouselRef.current) {
      const newX = direction === "next" ? scrollX - scrollAmount : scrollX + scrollAmount;
      setScrollX(newX);
    }
  };
  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`/api/books`, {
          params: category ? { category } : {},
        });
        const formattedBooks = response.data.map((book: any) => ({
          ...book,
          id: book._id, 
        }));

        setBooks(formattedBooks);
      } catch (error) {
        console.error("Lỗi khi lấy danh sách sách:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, [category]);

  useEffect(() => {
    axios
      .get("/api/books/featured")
      .then((response) => {
        const formattedBooks = response.data.map((book: any) => ({
          ...book,
          id: book._id, 
        }));
        setFeaturedBooks(formattedBooks);
      })
      .catch((error) => console.error("Lỗi khi lấy sách nổi bật:", error));
  }, []);
  const handleBookClick = (id?: string) => {
    if (!id) {
      console.error("Lỗi: ID sách không hợp lệ", id);
      return;
    }
    navigate(`/books/${id}`);
  };

  return (
    <Container sx={{ py: 5 }}>
      <Box textAlign="center" p={4}>
        <Typography variant="h4" fontWeight={600} gutterBottom>
          Nổi bật
        </Typography>
        <Box position="relative" overflow="hidden">
          <Button
            onClick={() => handleScroll("prev")}
            sx={{ position: "absolute", left: 0, top: "50%", transform: "translateY(-50%)", zIndex: 10 }}
            disabled={scrollX >= 0}
          >
            <FaChevronLeft size={30} />
          </Button>
          <motion.div
            ref={carouselRef}
            style={{ display: "flex", gap: "20px", overflow: "hidden", padding: "10px" }}
            animate={{ x: scrollX }}
            transition={{ type: "tween", duration: 0.5 }}
          >
            {featuredBooks.map((book) => (
              <motion.div key={book.id} whileHover={{ scale: 1.05 }} style={{ minWidth: "250px" }}>
                <Card onClick={() => handleBookClick(book.id)} sx={{ borderRadius: "12px", boxShadow: 3, width: 250, textAlign: "center" }}>
                  <CardMedia
                    component="img"
                    height="200"
                    image={book.imageUrl?.startsWith("http") ? book.imageUrl : `http://localhost:3000${book.imageUrl}`}
                    alt={book.title}
                  />
                  <CardContent>
                    <Typography variant="h6" fontWeight={600}>{book.title}</Typography>
                    <Typography variant="body2" color="text.secondary">{book.author}</Typography>
                    <Typography variant="h6" color="primary">{book.price?.toLocaleString()} ₫</Typography>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          <Button
            onClick={() => handleScroll("next")}
            sx={{ position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)", zIndex: 10 }}
            disabled={scrollX <= -((featuredBooks.length - 3) * 250)}
          >
            <FaChevronRight size={30} />
          </Button>
        </Box>
      </Box>
      <Typography variant="h4" mt={5} gutterBottom>
        Tất Cả Sách 📖
      </Typography>
      <Box sx={{ mt: 5 }}>
        <Tabs
          value={category}
          onChange={(_, newValue) => setCategory(newValue)}
          variant="scrollable"
          scrollButtons="auto"
          textColor="primary"
          indicatorColor="primary"
          sx={{ mb: 3, mx: "auto", width: "80%" }}
        >
          {categories.map((cat) => (
            <Tab key={cat.value} label={cat.label} value={cat.value} />
          ))}
        </Tabs>
      </Box>

      {loading ? (
        <Typography textAlign="center">Đang tải...</Typography>
      ) : (
        <Grid container spacing={3} justifyContent="center">
          {books.map((book) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={book.id}>
              <motion.div whileHover={{ scale: 1.05 }}>
                <Card sx={{ borderRadius: "12px", boxShadow: 3 }}>
                  <CardActionArea onClick={() => handleBookClick(book.id)}>
                    <CardMedia
                      component="img"
                      height="200"
                      image={book.imageUrl?.startsWith("http") ? book.imageUrl : `http://localhost:3000${book.imageUrl}`}
                      alt={book.title}
                    />
                    <CardContent>
                      <Typography variant="h6" fontWeight={600}>{book.title}</Typography>
                      <Typography variant="body2" color="text.secondary">{book.author}</Typography>
                      <Typography variant="h6" color="primary">{book.price?.toLocaleString()} ₫</Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Books;
