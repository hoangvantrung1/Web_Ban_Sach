import React, { useState, useEffect } from "react";
import { AppBar, Toolbar, IconButton, Button, InputBase, Menu, MenuItem, Avatar } from "@mui/material";
import { Search } from "@mui/icons-material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'; // Import Shopping Cart Icon
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate

const Navbar: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate(); // Initialize useNavigate hook

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
    navigate("/cart"); // Navigate to the cart page
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "white", boxShadow: 1, padding: "5px 20px" }}>
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Logo & Navigation */}
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <IconButton edge="start" aria-label="logo">🔥</IconButton>
          <Button component={Link} to="/" sx={{ color: "black", fontSize: "15px", fontWeight: 500, textTransform: "none" }}>Projects</Button>
          <Button component={Link} to="/books" sx={{ color: "black", fontSize: "15px", fontWeight: 500, textTransform: "none" }}>Filters</Button>
          <Button component={Link} to="/admin/dashboard" sx={{ color: "black", fontSize: "15px", fontWeight: 500, textTransform: "none" }}>Dashboards</Button>
        </div>

        {/* Search Bar */}
        <div style={{ backgroundColor: "#f0f0f0", padding: "5px 10px", borderRadius: "5px", display: "flex", alignItems: "center" }}>
          <Search sx={{ color: "gray" }} />
          <InputBase placeholder="Search" sx={{ marginLeft: 1 }} />
        </div>

        {/* Icons & User Profile */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <IconButton onClick={goToCart}> {/* Clickable Shopping Cart Icon */} 
            <ShoppingCartIcon sx={{ color: "black" }} />
          </IconButton>

          {/* Avatar & Menu */}
          <IconButton onClick={handleClick}>
            <Avatar sx={{ bgcolor: "#1976d2" }}>U</Avatar> {/* Avatar user */}
          </IconButton>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
            {!loggedIn ? (
              <>
                <MenuItem component={Link} to="/login" onClick={handleClose}>Đăng nhập</MenuItem>
                <MenuItem component={Link} to="/register" onClick={handleClose}>Đăng ký</MenuItem>
              </>
            ) : (
              <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
            )}
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
