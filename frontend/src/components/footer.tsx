import { Box, Container, Grid, Typography, Button, Link, IconButton } from "@mui/material";
import { FaTwitter, FaFacebook, FaInstagram, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <Box sx={{ py: 5, borderTop: "1px solid #ddd", backgroundColor: "#fafafa" }}>
      <Container>
        {/* Phần trên của footer */}
        <Box textAlign="center" mb={4}>
          <Typography variant="h4" fontWeight={600}>
            Learn how to grow <span role="img" aria-label="muscle">💪</span> audience fast in Twitter
          </Typography>
        </Box>

        {/* Phần thông tin chính */}
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" fontWeight={600} mb={2}>About Rareblocks</Typography>
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
            <Typography variant="h6" fontWeight={600} mb={2}>Company</Typography>
            <Link href="#" underline="none" display="block" color="text.secondary" mb={1}>About</Link>
            <Link href="#" underline="none" display="block" color="text.secondary" mb={1}>Features</Link>
            <Link href="#" underline="none" display="block" color="text.secondary" mb={1}>Works</Link>
            <Link href="#" underline="none" display="block" color="text.secondary" mb={1}>Career</Link>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" fontWeight={600} mb={2}>Help</Typography>
            <Link href="#" underline="none" display="block" color="text.secondary" mb={1}>Customer Support</Link>
            <Link href="#" underline="none" display="block" color="text.secondary" mb={1}>Delivery Details</Link>
            <Link href="#" underline="none" display="block" color="text.secondary" mb={1}>Terms & Conditions</Link>
            <Link href="#" underline="none" display="block" color="text.secondary" mb={1}>Privacy Policy</Link>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" fontWeight={600} mb={2}>Resources</Typography>
            <Link href="#" underline="none" display="block" color="text.secondary" mb={1}>Free eBooks</Link>
            <Link href="#" underline="none" display="block" color="text.secondary" mb={1}>Development Tutorial</Link>
            <Link href="#" underline="none" display="block" color="text.secondary" mb={1}>How to - Blog</Link>
            <Link href="#" underline="none" display="block" color="text.secondary" mb={1}>Youtube Playlist</Link>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
