

import Protected_routes from './proteced_routes';
import  {Routes, Route} from "react-router-dom";
import Home from '../pages/home/home'
import Administration from '../pages/admin/administration';
import Register from '../components/Admin-components/admin-ui/Register';
import FAQ from '../components/home-components/FAQ';
import PostList from '../components/Admin-components/post/PostList';
// import CreatePost from '../components/Admin-components/post/CreatePost';
import Login from '../pages/login/login'
// import PostForm from '../components/Admin-components/post/PostForm';
import UsersContainer from '../components/administration-components/UsersContainer';
import { Profile } from '../pages/profile/Profile';
import { AuthProvider, useAuth } from '../context/AuthContext';
import { useParams } from 'react-router-dom';
import ProfileStudient from '../pages/student/ProfileStudient';
import ProfilePsycho from "../pages/psychogist/PhofilePsycho";
import AboutMe from '../components/home-components/AboutMe';
import NavHome from '../components/home-components/NavHome';


const Rutas = () => {
  const { userId } = useAuth();
  const { userId :id } = useParams();
  return (
    <>
     <NavHome/>
      <Routes>
       
        
        <Route path="/home" element={<Home />} />
        {/* <Route path="/library" element={<Library />} /> */}

        <Route path="/FAQ" element={<FAQ />} />
        <Route path="/Profile/create-post" element={<Profile />} />

        <Route path="/post-list" component={<PostList />} />
        <Route path="/profileStudient" element={<ProfileStudient/>} />
        <Route path="/profilePsycho" element={<ProfilePsycho/>} />
        <Route path='/login' element={<Login />} />
        <Route path="/AboutMe" element={<AboutMe />} />


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
          {/* <Route path="profile/psycho/:id" element={<ProfilePsycho />} /> */}
        </Route>
    </Routes>
    

    </>
  );
};

export default Rutas;
