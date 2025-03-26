import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Box, Button, Card, CardContent, Typography, Rating, Grid, Divider, TextField } from "@mui/material";
import Footer from "../components/footer";

const BookDetail = () => {
    const { id } = useParams<{ id: string }>();
    const [book, setBook] = useState<any>(null);
    const [error, setError] = useState("");
    const [categoryName, setCategoryName] = useState("");
    const [quantity, setQuantity] = useState<number>(1); 
    const token = localStorage.getItem("token");
    const decoded = token ? JSON.parse(atob(token.split(".")[1])) : null;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBook = async () => {
            if (!id) {
                setError("ID không hợp lệ");
                return;
            }
            try {
                const response = await axios.get(`/api/books/${id}`);
                setBook(response.data);
            } catch (error: any) {
                console.error("Lỗi lấy chi tiết sách:", error);
                setError("Không tìm thấy sách");
            }
        };
        fetchBook();
    }, [id]);
    useEffect(() => {
        if (!book?.category) return;

        console.log("Gọi API danh mục:", `/api/categories/${book.category}`);

        const fetchCategory = async () => {
            try {
                const res = await axios.get(`/api/categories/${book.category}`);
                setCategoryName(res.data.name);
            } catch (error) {
                console.error("Lỗi lấy danh mục:", error);
                setCategoryName("Không xác định");
            }
        };
        fetchCategory();
    }, [book]);
    const addToCart = async () => {
        try {
            const token = localStorage.getItem("token");
            if (!token) {
                alert("Vui lòng đăng nhập trước!");
                return;
            }
    
            const currentCart = JSON.parse(localStorage.getItem("cart") || "[]");
    
            const existingItem = currentCart.find((item: any) => item.bookId === book._id);
    
            if (existingItem) {
                existingItem.quantity += quantity;
            } else {
                currentCart.push({
                    bookId: book._id,
                    title: book.title,
                    price: book.price,
                    quantity: quantity,
                    imageUrl: book.imageUrl,
                });
            }
            localStorage.setItem("cart", JSON.stringify(currentCart));
    
            alert("Đã thêm vào giỏ hàng!");
    
            navigate("/cart");
        } catch (error) {
            console.error("Lỗi khi thêm vào giỏ hàng:", error);
            alert("Thêm vào giỏ hàng thất bại!");
        }
    };
    if (error) return <Typography color="error">{error}</Typography>;

    return book ? (
        <>
            <Box display="flex" justifyContent="center" alignItems="center" p={4}>
                <Card sx={{ maxWidth: 1100, p: 4, display: "flex" }}>
                    {/* Ảnh sách */}
                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        {/* Ảnh phụ */}
                        <Grid container spacing={1} sx={{ mb: 2 }}>
                            {book.extraImages?.map((img: string, index: number) => (
                                <Grid item key={index}>
                                    <img
                                        src={img}
                                        alt={`Ảnh ${index + 1}`}
                                        style={{ width: 60, height: 80, objectFit: "cover", borderRadius: 4, cursor: "pointer" }}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                        {/* Ảnh chính */}
                        <img
                            src={book.imageUrl?.startsWith("http") ? book.imageUrl : `http://localhost:3000${book.imageUrl}`}
                            alt={book.title}
                            style={{ width: "400px", height: "500px", objectFit: "cover", borderRadius: "8px" }}
                        />
                    </Box>

                    <CardContent sx={{ ml: 5, flex: 1 }}>
                        <Typography variant="h4" fontWeight="bold">{book.title}</Typography>
                        <Typography color="textSecondary" variant="subtitle1" mt={1}>Tác giả: {book.author}</Typography>
                        <Typography mt={2} sx={{ fontSize: "0.9rem", lineHeight: 1.6 }}>
                            {book.description}
                        </Typography>
                        <Rating name="read-only" value={book.rating || 4.5} readOnly sx={{ mt: 1 }} />
                        <Typography mt={2} fontWeight="bold" fontSize={26} color="primary">
                            {book.price} ₫
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            Đã bán: {book.sold || 0} cuốn
                        </Typography>
                        <Divider sx={{ my: 2 }} />
                        <Box mt={2}>
                            <Typography variant="body2"><b>Thể loại:</b> {categoryName}</Typography>
                            <Typography variant="body2"><b>Nhà xuất bản:</b> {book.publisher}</Typography>
                            <Typography variant="body2"><b>Năm xuất bản:</b> {book.year}</Typography>
                            <Typography variant="body2"><b>Số trang:</b> {book.pages}</Typography>
                        </Box>
                        <Box mt={2}>
                            <TextField
                                label="Số lượng"
                                type="number"
                                value={quantity}
                                onChange={(e) => setQuantity(Number(e.target.value))}
                                InputProps={{ inputProps: { min: 1 } }}
                                fullWidth
                            />
                        </Box>
                        <Box mt={4} display="flex" gap={3}>
                            <Button variant="contained" color="primary" size="large" onClick={addToCart}>
                                Thêm vào giỏ hàng
                            </Button>
                            <Button variant="outlined" size="large">Yêu thích</Button>
                        </Box>
                        <Box mt={3}>
                            <Typography variant="body2" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                ✅ Miễn phí vận chuyển đơn trên 300K
                            </Typography>
                            <Typography variant="body2" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                ✅ Thanh toán an toàn 100%
                            </Typography>
                            <Typography variant="body2" sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                ✅ Cam kết sách chính hãng
                            </Typography>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
            <Footer />
        </>
    ) : (
        <Typography>Đang tải...</Typography>
    );
};

export default BookDetail;
