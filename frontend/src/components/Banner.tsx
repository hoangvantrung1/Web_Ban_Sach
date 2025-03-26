// src/components/Banner.tsx
import React from "react";
import { Typography, Box, Grid, Card, CardContent } from "@mui/material";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PaymentIcon from "@mui/icons-material/Payment";
import OfferIcon from "@mui/icons-material/CardGiftcard";
import { motion } from "framer-motion";
import BooksStack from "../assets/website/banner1.jpg"; // Ảnh banner

const Banner: React.FC = () => {
  return (
    <Box
      sx={{
        position: "relative",
        height: "500px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* Background Image */}
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundImage: `url(${BooksStack})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.7)",
        }}
      />

      {/* Gradient Overlay */}
      <Box
        sx={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: "linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.2))",
        }}
      />

      {/* Nội dung */}
      <Grid
        container
        spacing={4}
        alignItems="center"
        justifyContent="center"
        sx={{ position: "relative", zIndex: 2, px: 5 }}
      >
        {/* Text section */}
        <Grid item xs={12} md={6}>
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography variant="h3" fontWeight={700} color="white" gutterBottom>
              Thư viện trong tầm tay bạn 📚
            </Typography>
            <Typography variant="body1" color="white" sx={{ mb: 3 }}>
              Khám phá hàng ngàn cuốn sách chất lượng, giao hàng nhanh chóng và thanh toán dễ dàng.
            </Typography>
          </motion.div>

          {/* Danh sách lợi ích */}
          <Grid container spacing={2}>
            {[
              { icon: <LocalLibraryIcon color="primary" />, text: "Sách chất lượng" },
              { icon: <LocalShippingIcon color="secondary" />, text: "Giao hàng nhanh" },
              { icon: <PaymentIcon color="success" />, text: "Thanh toán dễ dàng" },
              { icon: <OfferIcon color="warning" />, text: "Nhiều ưu đãi" },
            ].map((item, index) => (
              <Grid item xs={12} sm={6} key={index}>
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Card
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      p: 2,
                      borderRadius: "12px",
                      boxShadow: "3px 3px 15px rgba(0,0,0,0.2)",
                    }}
                  >
                    {item.icon}
                    <CardContent>
                      <Typography fontWeight={600}>{item.text}</Typography>
                    </CardContent>
                  </Card>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Banner;
