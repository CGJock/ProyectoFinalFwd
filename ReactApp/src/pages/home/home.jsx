import React from "react";
import NavHome from "../../components/home-components/NavHome";
import Footer from "../../components/home-components/footer";
import 'bootstrap/dist/css/bootstrap.min.css';
import VideoCarousel from '../../components/home-components/VideoCarousel'

export const Home = () => {
  return (
    <>
      <div>
        <NavHome />
      </div>

      <div>
        <VideoCarousel />
      </div>
      <Footer />
    </>
  );
};

export default Home;
