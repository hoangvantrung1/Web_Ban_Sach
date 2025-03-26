
import React from "react";
import Banner from "../components/Banner";// Giả sử bạn có component hiển thị sản phẩm
import Books from "../pages/Books";
import Footer from "../components/footer";

const Home: React.FC = () => {
  return (
    <div>
      <Banner />
      <Books />
      <Footer/>
    </div>
  );
};

export default Home;
