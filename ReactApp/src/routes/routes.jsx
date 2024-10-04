
import Protected_routes from './proteced_routes';
import  {Routes, Route} from "react-router-dom";
import Home from '../pages/home/home'
import Administration from '../pages/admin/administration';
import Register from '../components/Admin-components/admin-ui/Register';
import FAQ from '../components/Admin-components/admin-static-components/FAQ';
// import CreatePost from '../components/Admin-components/post/CreatePost';
import PostList from '../components/Admin-components/post/PostList';


import PostForm from '../components/Admin-components/post/PostForm';


const Rutas = () => {
  return (
    <>
    <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/FAQ" element={<FAQ />} />
        <Route path="/create-post" component={PostForm} />
        <Route path="/post-list" component={PostList} />
        
    
    <Route path="/Administration" element={<Administration/>} />
        <Route
          path="/Register"
          element={
            <Protected_routes>
              <Register />
            </Protected_routes>
          }/>
    </Routes>

    </>
  )
}

export default Rutas

