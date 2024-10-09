
import Protected_routes from './proteced_routes';
import  {Routes, Route} from "react-router-dom";
import Home from '../pages/home/home'
import Administration from '../pages/admin/administration';
import Register from '../components/Admin-components/admin-ui/Register';
import FAQ from '../components/Admin-components/admin-static-components/FAQ';
import PostList from '../components/Admin-components/post/PostList';
import CreatePost from '../components/Admin-components/post/CreatePost';
import Login from '../pages/login/login'
import PostForm from '../components/Admin-components/post/PostForm';
import UsersContainer from '../components/administration-components/UsersContainer';
import { Profile } from '../pages/profile/Profile';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { useParams } from 'react-router-dom';



const Rutas = () => {
  const { userId } = useAuth();
  const { userId :id } = useParams();
  return (
    <>
    
    <Routes>
        <Route path="/home" element={<Home/>} />
        <Route path="/FAQ" element={<FAQ />} />
        <Route path="/Profile/create-post" element={<Profile />} />
        <Route path="/post-list" component={<PostList />} />
        <Route path='/login' element={<Login />} />

        
        <Route
          path="/Administration"
          element={
            <Protected_routes>
              <Administration />
            </Protected_routes>
          }
        >
          {/* Aquí se definen las subrutas dentro de la ruta de administración */}
          <Route path="register" element={<Register />} />
          <Route path="students" element={<UsersContainer />} />
          <Route path="profile/students/:id" element={<Profile />} />
        </Route>
    </Routes>
    

    </>
  )
}

export default Rutas

