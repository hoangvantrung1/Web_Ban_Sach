import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, IconButton, Button, TextField, Menu, MenuItem, Avatar, List, ListItem, ListItemText, Paper } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Link, useNavigate } from "react-router-dom";

const Navbar: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [searchTerm, setSearchTerm] = useState<string>(""); // Từ khóa tìm kiếm
  const [searchResults, setSearchResults] = useState<any[]>([]); // Kết quả tìm kiếm
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setLoggedIn(false);
    handleClose();
    window.location.reload();
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const goToCart = () => {
    navigate("/cart");
  };

  // Xử lý tìm kiếm
  const handleSearchChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const query = event.target.value;
    setSearchTerm(query);
  
    if (query.length > 1) {
      try {
        console.log("Gửi yêu cầu tìm kiếm:", query);
        const response = await fetch(`http://localhost:3000/api/books?search=${query}`);
        const data = await response.json();
        console.log("Kết quả nhận được:", data);
        setSearchResults(data);
      } catch (error) {
        console.error("Lỗi khi tìm kiếm sách:", error);
        setSearchResults([]);
      }
    } else {
      setSearchResults([]);
    }
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "white", boxShadow: 1, padding: "5px 20px" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Logo & Navigation */}
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <IconButton edge="start" aria-label="logo">🔥</IconButton>
          <Button component={Link} to="/" sx={{ color: "black", fontSize: "15px", fontWeight: 500, textTransform: "none" }}>Trang chủ</Button>
          <Button component={Link} to="/books" sx={{ color: "black", fontSize: "15px", fontWeight: 500, textTransform: "none" }}>Sản phẩm</Button>
          <Button component={Link} to="/contact" sx={{ color: "black", fontSize: "15px", fontWeight: 500, textTransform: "none" }}>Bài viết</Button>
        </div>

        {/* Search Bar - Dùng TextField */}
        <div style={{ position: "relative", width: "300px" }}>
          <TextField
            label="Tìm kiếm sách"
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={handleSearchChange}
            margin="normal"
            size="small"
          />

          {/* Kết quả tìm kiếm */}
          {searchResults.length > 0 && (
            <Paper sx={{ position: "absolute", width: "100%", zIndex: 10, mt: 1, maxHeight: "200px", overflowY: "auto" }}>
              <List>
                {searchResults.map((product) => (
                  <ListItem button key={product._id} onClick={() => navigate(`/product/${product._id}`)}>
                    <ListItemText primary={product.title} secondary={`Giá: ${product.price}₫`} />
                  </ListItem>
                ))}
              </List>
            </Paper>
          )}
        </div>

        {/* Icons & User Profile */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <IconButton onClick={goToCart}>
            <ShoppingCartIcon sx={{ color: "black" }} />
          </IconButton>

          {/* Avatar & Menu */}
          <IconButton onClick={handleClick}>
            <Avatar sx={{ bgcolor: "#1976d2" }}>U</Avatar>
          </IconButton>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
            {!loggedIn ? (
              <>
                <MenuItem component={Link} to="/login" onClick={handleClose}>Đăng nhập</MenuItem>
                <MenuItem component={Link} to="/register" onClick={handleClose}>Đăng ký</MenuItem>
                <MenuItem component={Link} to="/orders" onClick={handleClose}>Đơn hàng của tôi</MenuItem>
              </>
            ) : (
              <>
                <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
              </>
            )}
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
