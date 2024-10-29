import React from "react";
import NavHome from "../../components/home-components/NavHome";
import Footer from "../../components/home-components/footer";
import InfoSection from '../../components/home-components/InfoSection';



// import CreatePost from '../../components/Admin-components/post/CreatePost'
// import { useAuth } from "../../context/AuthContext";

import 'bootstrap/dist/css/bootstrap.min.css';
import VideoCarousel from '../../components/home-components/VideoCarousel'



export const Home = () => {
// const {Token}  = useAuth()
// console.log(Token)

  return (
    <>
      <div>
        <NavHome />
      </div>
      <div>
    
        <VideoCarousel />
        <InfoSection />
      

      </div>
   
  


      {/* Componente de posteos de publicaciones */}
      {/* <div>
        <PostList />
        <PostForm />

      </div> */}



      <Footer />
    </>
  );
};

export default Home;
