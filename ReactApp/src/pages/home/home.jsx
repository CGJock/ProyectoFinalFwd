import React from 'react'
import NavHome from '../../components/Admin-components/admin-static-components/NavHome'
import Footer from '../../components/Admin-components/admin-static-components/footer'
import CreatePost from '../../components/Admin-components/post/CreatePost'

export const Home = () => {
  return (
    <>
   
    <div>
    <NavHome/>
    </div>
    <div>  <CreatePost/></div>
   

    <Footer/>
    </>
  )
}

export default Home
