import { useState } from "react";
import { TextField, Button, Box, Typography, Container } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [form, setForm] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        try {
            const { data } = await axios.post("/api/auth/login", form);
            localStorage.setItem("token", data.token);
            alert("Đăng nhập thành công!");
            navigate("/");
        } catch (error: any) {
            alert(error.response?.data?.message || "Đăng nhập thất bại");
        }
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 5, textAlign: "center" }}>
                <Typography variant="h4" fontWeight="bold">Đăng Nhập</Typography>
                <TextField label="Email" name="email" fullWidth margin="normal" onChange={handleChange} />
                <TextField label="Mật khẩu" name="password" type="password" fullWidth margin="normal" onChange={handleChange} />
                <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={handleSubmit}>Đăng Nhập</Button>
            </Box>
        </Container>
    );
};

export default Login;
