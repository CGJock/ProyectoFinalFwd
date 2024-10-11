import React from "react";
import NavHome from "../../components/home-components/NavHome";
import Footer from "../../components/home-components/footer";
// import CreatePost from '../../components/Admin-components/post/CreatePost'
import PostList from "../../components/post/PostList";
import PostForm from "../../components/post/PostForm";
import 'bootstrap/dist/css/bootstrap.min.css';
import VideoCarousel from '../../components/home-components/VideoCarousel'




export const Home = () => {
  return (
    <>
      <div>
        <NavHome />
      </div>
      {/* Carrusel de videos */}
      <div>
        <VideoCarousel />
      </div>

      {/* Componente de posteos de publicaciones */}
      <div>
        <PostList />
        <PostForm />

      </div>


      <Footer />
    </>
  );
};

export default Home;
