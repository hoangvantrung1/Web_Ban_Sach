import { Box, Container, Grid, Typography, Button, Link, IconButton } from "@mui/material";
import { FaTwitter, FaFacebook, FaInstagram, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <Box sx={{ py: 5, borderTop: "1px solid #ddd", backgroundColor: "#fafafa" }}>
      <Container>
        {/* Phần trên của footer */}
        <Box textAlign="center" mb={4}>
        </Box>

        {/* Phần thông tin chính */}
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" fontWeight={600} mb={2}>Về Rareblocks</Typography>
            <Typography variant="body2" color="text.secondary" mb={2}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam dictum aliquet accumsan porta lectus ridiculus in mattis.
            </Typography>
            <Box display="flex" gap={2}>
              <IconButton><FaTwitter /></IconButton>
              <IconButton><FaFacebook /></IconButton>
              <IconButton><FaInstagram /></IconButton>
              <IconButton><FaGithub /></IconButton>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" fontWeight={600} mb={2}>Công ty</Typography>
            <Link href="#" underline="none" display="block" color="text.secondary" mb={1}>Về chúng tôi</Link>
            <Link href="#" underline="none" display="block" color="text.secondary" mb={1}>Tính năng</Link>
            <Link href="#" underline="none" display="block" color="text.secondary" mb={1}>Cách thức hoạt động</Link>
            <Link href="#" underline="none" display="block" color="text.secondary" mb={1}>Cơ hội nghề nghiệp</Link>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" fontWeight={600} mb={2}>Hỗ trợ</Typography>
            <Link href="#" underline="none" display="block" color="text.secondary" mb={1}>Hỗ trợ khách hàng</Link>
            <Link href="#" underline="none" display="block" color="text.secondary" mb={1}>Chi tiết giao hàng</Link>
            <Link href="#" underline="none" display="block" color="text.secondary" mb={1}>Điều khoản và Điều kiện</Link>
            <Link href="#" underline="none" display="block" color="text.secondary" mb={1}>Chính sách bảo mật</Link>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" fontWeight={600} mb={2}>Tài nguyên</Typography>
            <Link href="#" underline="none" display="block" color="text.secondary" mb={1}>Sách điện tử miễn phí</Link>
            <Link href="#" underline="none" display="block" color="text.secondary" mb={1}>Hướng dẫn phát triển</Link>
            <Link href="#" underline="none" display="block" color="text.secondary" mb={1}>Blog hướng dẫn</Link>
            <Link href="#" underline="none" display="block" color="text.secondary" mb={1}>Danh sách phát Youtube</Link>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
