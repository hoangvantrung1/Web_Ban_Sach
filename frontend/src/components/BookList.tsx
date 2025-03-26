// BookList.tsx
import React, { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import { Button, Grid, Typography, Card, CardContent, CardMedia } from "@mui/material";
import axios from "axios";

interface Book {
  _id: string;
  title: string;
  author: string;
  price: number;
  image: string;
}

const BookList: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const { addToCart } = useCart();

  useEffect(() => {
    // Fetch books from your backend
    const fetchBooks = async () => {
      try {
        const response = await axios.get("/api/books");
        setBooks(response.data);
      } catch (error) {
        alert("Error fetching books!");
      }
    };

    fetchBooks();
  }, []);

  return (
    <div>
      <Typography variant="h4">Bookstore</Typography>
      <Grid container spacing={3}>
        {books.map((book) => (
          <Grid item key={book._id} xs={12} sm={6} md={4}>
            <Card>
              <CardMedia component="img" alt={book.title} height="140" image={book.image} />
              <CardContent>
                <Typography variant="h6">{book.title}</Typography>
                <Typography variant="body2">{book.author}</Typography>
                <Typography variant="h6">${book.price}</Typography>
                <Button
                  onClick={() => addToCart({ bookId: book._id, title: book.title, price: book.price, quantity: 1 })}
                  variant="contained"
                  color="primary"
                >
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default BookList;
