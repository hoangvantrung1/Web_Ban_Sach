import { useState } from "react";
import { TextField, Button, Box, Typography, Container } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [form, setForm] = useState({ username: "", email: "", password: "" });
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        try {
            await axios.post("/api/auth/register", form);
            alert("Đăng ký thành công! Hãy đăng nhập.");
            navigate("/login");
        } catch (error: any) {
            alert(error.response?.data?.message || "Đăng ký thất bại");
        }
    };

    return (
        <Container maxWidth="sm">
            <Box sx={{ mt: 5, textAlign: "center" }}>
                <Typography variant="h4" fontWeight="bold">Đăng Ký</Typography>
                <TextField label="Tên đăng nhập" name="username" fullWidth margin="normal" onChange={handleChange} />
                <TextField label="Email" name="email" fullWidth margin="normal" onChange={handleChange} />
                <TextField label="Mật khẩu" name="password" type="password" fullWidth margin="normal" onChange={handleChange} />
                <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }} onClick={handleSubmit}>Đăng Ký</Button>
            </Box>
        </Container>
    );
};

export default Register;
