import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, CircularProgress } from "@mui/material";

interface Order {
    _id: string;
    status: string;
    total: number;
}

const OrderHistory = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            const token = localStorage.getItem("token");
            const response = await fetch("http://localhost:3000/api/orders", {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!response.ok) {
                console.error("Lỗi khi lấy đơn hàng!");
                return;
            }

            const data: Order[] = await response.json();
            setOrders(data);
            setLoading(false);
        };

        fetchOrders();
    }, []);

    return (
        <Box maxWidth="800px" margin="auto" padding="24px">
            <Typography variant="h4" fontWeight="600">Lịch sử đơn hàng</Typography>
            {loading ? (
                <CircularProgress />
            ) : (
                orders.map((order) => (
                    <Paper key={order._id} sx={{ padding: "16px", marginTop: "16px" }}>
                        <Typography variant="h6">Mã đơn hàng: {order._id}</Typography>
                        <Typography>Trạng thái: {order.status}</Typography>
                        <Typography>Tổng tiền: ${order.total}</Typography>
                    </Paper>
                ))
            )}
        </Box>
    );
};

export default OrderHistory;
