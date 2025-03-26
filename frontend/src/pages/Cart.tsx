import React, { useState, useEffect } from "react";
import { Box, Button, Typography, Grid, IconButton, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { color } from "framer-motion";

const Cart = () => {
  const [cart, setCart] = useState<any[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(storedCart);
  }, []);

  const handleRemoveItem = (bookId: string) => {
    const updatedCart = cart.filter((item) => item.bookId !== bookId);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleQuantityChange = (bookId: string, action: "increase" | "decrease") => {
    const updatedCart = cart.map((item) => {
      if (item.bookId === bookId) {
        const updatedQuantity = action === "increase" ? item.quantity + 1 : item.quantity - 1;
        return { ...item, quantity: Math.max(updatedQuantity, 1) };
      }
      return item;
    });
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "space-between", padding: "24px", backgroundColor: "#f4f4f4", minHeight: "100vh", borderRadius: "12px" }}>
      <Box sx={{ flex: 2, marginRight: "20px" }}>
        <Typography
          variant="h3"
          fontWeight="600"
          color="primary"
          sx={{
            mb: 3,
            textAlign: "center",
            fontFamily: '"Poppins", "Roboto", sans-serif', 
            fontSize: "2.8rem", 
            letterSpacing: "1px",
            background_color:"black"
          }}
        >
          Giỏ hàng
        </Typography>

        {cart.length === 0 ? (
          <Typography variant="h6" color="textSecondary" sx={{ textAlign: "center" }}>Giỏ hàng của bạn trống.</Typography>
        ) : (
          <Grid container spacing={4}> 
            {cart.map((item) => (
              <Grid item xs={12} sm={6} md={12} key={item.bookId}>
                <Paper
                  elevation={6}
                  sx={{
                    padding: 10,
                    display: "flex",
                    alignItems: "center",
                    borderRadius: "16px",
                    backgroundColor: "#fff",
                    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.15)",
                    height: "auto",
                  }}
                >
                  <img
                    src={item.imageUrl?.startsWith("http") ? item.imageUrl : `http://localhost:3000${item.imageUrl}`}
                    alt={item.title}
                    style={{
                      width: "150px",
                      height: "200px",
                      objectFit: "cover",
                      borderRadius: "12px",
                      marginRight: "30px"
                    }}
                  />
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="body1" fontWeight="600" color="primary" mb={1} sx={{ fontSize: "1.1rem" }}>{item.title}</Typography>
                    <Typography variant="body2" color="textSecondary" mb={1}>Giá: {item.price.toLocaleString()} ₫</Typography>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <IconButton
                        onClick={() => handleQuantityChange(item.bookId, "decrease")}
                        color="primary"
                        sx={{
                          borderRadius: "50%",
                          backgroundColor: "#ddd",
                          "&:hover": { backgroundColor: "#FF4F4F" }
                        }}
                      >
                        <RemoveIcon />
                      </IconButton>
                      <Typography variant="body2" color="primary" mx={2}>{item.quantity}</Typography>
                      <IconButton
                        onClick={() => handleQuantityChange(item.bookId, "increase")}
                        color="primary"
                        sx={{
                          borderRadius: "50%",
                          backgroundColor: "#ddd",
                          "&:hover": { backgroundColor: "#4CAF50" }
                        }}
                      >
                        <AddIcon />
                      </IconButton>
                    </Box>
                  </Box>
                  <IconButton
                    onClick={() => handleRemoveItem(item.bookId)}
                    color="error"
                    sx={{
                      backgroundColor: "#ddd",
                      borderRadius: "50%",
                      "&:hover": { backgroundColor: "#FF4F4F" }
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </Paper>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
      <Box sx={{ flex: 1, padding: "30px", backgroundColor: "#f9f9f9", borderRadius: "8px", boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)" }}>
        <Typography variant="h5" fontWeight="600" sx={{ fontFamily: '"Poppins", "Roboto", sans-serif', mb: 2 }}>Order Summary</Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          <Typography variant="body1">Subtotal</Typography>
          <Typography variant="body1">{calculateTotal().toLocaleString()} ₫</Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          <Typography variant="body1">Tax</Typography>
          <Typography variant="body1">0 ₫</Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <Typography variant="body1">Shipping</Typography>
          <Typography variant="body1">10,000 ₫</Typography>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "space-between", fontWeight: "bold", mb: 2 }}>
          <Typography variant="h6">Total</Typography>
          <Typography variant="h6">{(calculateTotal() + 10000).toLocaleString()} ₫</Typography>
        </Box>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleCheckout}
          sx={{
            padding: "12px",
            fontSize: "1.2rem",
            fontWeight: "600",
            background: "linear-gradient(45deg,rgb(17, 16, 16),rgb(18, 18, 17))", // Gradient color
            "&:hover": {
              background: "linear-gradient(45deg,rgb(36, 33, 32),rgb(96, 91, 91))"
            },
            borderRadius: "8px",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
          }}
        >
          Checkout
        </Button>
        <Button variant="outlined" color="primary" fullWidth sx={{ marginTop: "8px", padding: "12px" }}>Continue Shopping</Button>
      </Box>
    </Box>
  );
};

export default Cart;
