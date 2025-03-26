import React, { useEffect, useState } from "react";
import { Box, Button, Typography, TextField, Grid, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
    const [cart, setCart] = useState<any[]>([]);
    const [shippingInfo, setShippingInfo] = useState({
        fullName: "",
        address: "",
        city: "",
        postalCode: ""
    });
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Bạn cần đăng nhập để thanh toán!");
            navigate("/login"); 
        }

        const storedCart = JSON.parse(localStorage.getItem("cart") || "[]");
        setCart(storedCart);
    }, [navigate]);

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    const handlePlaceOrder = async () => {
        const token = localStorage.getItem("token");
        if (!token) {
            alert("Bạn cần đăng nhập để thanh toán!");
            navigate("/login");
            return;
        }
    
        const order = {
            shippingInfo,
            items: cart,
            total: calculateTotal() + 10, 
        };
    
        try {
            const response = await fetch("http://localhost:3000/api/checkout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(order),
            });
    
            if (!response.ok) {
                throw new Error("Thanh toán thất bại! Vui lòng thử lại.");
            }
    
            const data = await response.json();
            alert("Đặt hàng thành công!");
            localStorage.removeItem("cart");
            navigate("/order-confirmation");
        } catch (error) {
            console.error("Lỗi khi thanh toán:", error);
            alert("Có lỗi xảy ra, vui lòng thử lại!");
        }
    };
    

    return (
        <Box sx={{ maxWidth: "800px", margin: "auto", padding: "24px" }}>
            <Typography variant="h4" fontWeight="600" mb={3}>Checkout</Typography>

            <Paper sx={{ padding: "24px", marginBottom: "24px" }}>
                <Typography variant="h6" fontWeight="500" mb={2}>Shipping Information</Typography>
                <TextField 
                    fullWidth 
                    label="Full Name" 
                    variant="outlined" 
                    margin="normal" 
                    value={shippingInfo.fullName} 
                    onChange={(e) => setShippingInfo({ ...shippingInfo, fullName: e.target.value })}
                />
                <TextField 
                    fullWidth 
                    label="Address" 
                    variant="outlined" 
                    margin="normal" 
                    value={shippingInfo.address} 
                    onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })}
                />
                <TextField 
                    fullWidth 
                    label="City" 
                    variant="outlined" 
                    margin="normal" 
                    value={shippingInfo.city} 
                    onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })}
                />
                <TextField 
                    fullWidth 
                    label="Postal Code" 
                    variant="outlined" 
                    margin="normal" 
                    value={shippingInfo.postalCode} 
                    onChange={(e) => setShippingInfo({ ...shippingInfo, postalCode: e.target.value })}
                />
            </Paper>

            <Paper sx={{ padding: "24px", marginBottom: "24px" }}>
                <Typography variant="h6" fontWeight="500" mb={2}>Order Summary</Typography>
                {cart.map((item) => (
                    <Grid container justifyContent="space-between" key={item.bookId} sx={{ marginBottom: "12px" }}>
                        <Typography variant="body1">{item.title} x {item.quantity}</Typography>
                        <Typography variant="body1">${(item.price * item.quantity).toFixed(2)}</Typography>
                    </Grid>
                ))}
                <Box sx={{ display: "flex", justifyContent: "space-between", fontWeight: "bold", marginTop: "12px" }}>
                    <Typography variant="h6">Total</Typography>
                    <Typography variant="h6">${(calculateTotal() + 10).toFixed(2)}</Typography>
                </Box>
            </Paper>

            <Button 
                variant="contained" 
                color="primary" 
                fullWidth 
                sx={{ padding: "12px" }} 
                onClick={handlePlaceOrder}
            >
                Place Order
            </Button>
        </Box>
    );
};

export default Checkout;
