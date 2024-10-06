import React from 'react'
import NavHome from '../../components/Admin-components/admin-static-components/NavHome'
import Footer from '../../components/Admin-components/admin-static-components/footer'
// import CreatePost from '../../components/Admin-components/post/CreatePost'
import PostList from '../../components/Admin-components/post/PostList'
import PostForm from '../../components/Admin-components/post/PostForm'
// import 'bootstrap/dist/css/bootstrap.min.css';
import InteractiveMap from '../../components/Admin-components/admin-static-components/InteractiveMap'
import VideoCarousel from '../../components/Admin-components/admin-static-components/VideoCarousel'

export const Home = () => {
  return (
    <>
   
    <div>
    <NavHome/>
    </div>
      {/* Carrusel de videos */}
      <div>
        <VideoCarousel />
      </div>
   
    <div>
    <PostList/>  
    <PostForm/>
    
    
   
    <InteractiveMap/>
    </div>
   

    <Footer/>
    </>
  )
}

export default Home
