import React, { useState, useEffect } from "react";
import { Container, Typography, Box, Button, Card, CardContent, Divider } from "@mui/material";
import axios from "axios";

const Cart = () => {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    // Fetch cart data when the component is mounted
    const fetchCart = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        try {
          const response = await axios.get("/api/cart", {
            headers: { Authorization: `Bearer ${token}` },
          });
          setCartItems(response.data.items);
          calculateTotalPrice(response.data.items);
        } catch (error) {
          console.error("Error fetching cart data:", error);
        }
      } else {
        // Redirect to login if no token found
        alert("Vui lòng đăng nhập để xem giỏ hàng.");
      }
    };

    fetchCart();
  }, []);

  const calculateTotalPrice = (items: any[]) => {
    const total = items.reduce((sum, item) => sum + item.quantity * item.book.price, 0);
    setTotalPrice(total);
  };

  return (
    <Container>
      <Typography variant="h3" gutterBottom>Giỏ Hàng</Typography>

      {cartItems.length === 0 ? (
        <Typography variant="h6" color="textSecondary">Giỏ hàng của bạn đang trống.</Typography>
      ) : (
        <>
          {cartItems.map((item, index) => (
            <Card key={index} sx={{ mb: 2 }}>
              <CardContent>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Typography variant="h6">{item.book.title}</Typography>
                  <Typography variant="body2" color="textSecondary">{item.quantity} x {item.book.price} ₫</Typography>
                </Box>
                <Typography variant="body2" color="textSecondary">{item.book.author}</Typography>
              </CardContent>
            </Card>
          ))}

          <Divider sx={{ my: 2 }} />
          <Box display="flex" justifyContent="space-between">
            <Typography variant="h6">Tổng cộng:</Typography>
            <Typography variant="h6">{totalPrice} ₫</Typography>
          </Box>

          <Box display="flex" gap={2} mt={3}>
            <Button variant="contained" color="primary">Tiến hành thanh toán</Button>
            <Button variant="outlined" color="secondary">Tiếp tục mua sắm</Button>
          </Box>
        </>
      )}
    </Container>
  );
};

export default Cart;
