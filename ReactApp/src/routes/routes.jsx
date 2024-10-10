
import {Protected_routes_admin} from './proteced_routes';
import { Protected_routes_psychologyst } from './proteced_routes';
import { Protected_routes_student } from './proteced_routes';
import { ProfileStudent } from '../pages/student/student-profile';
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
import { useParams } from 'react-router-dom';
import { ProfilePsychologist } from '../pages/psychologist/Profile-psychologist';



const Rutas = () => {
 
  return (
    <>

    
    
        

      <Routes>
        <Route path="/home" element={<Home />} />
        {/* <Route path="/library" element={<Library />} /> */}

        <Route path="/FAQ" element={<FAQ />} />
        <Route path="/Profile/create-post" element={<Profile />} />
        <Route path="/post-list" component={<PostList />} />
        <Route path='/login' element={<Login />} />

        <Route
        path='/profile/psychologist'
        element={
          <Protected_routes_psychologyst>
            <ProfilePsychologist />
          </Protected_routes_psychologyst>
        
        }></Route>


        <Route
        path='/profile/student'
        element={
          <Protected_routes_student>
            <ProfileStudent />
          </Protected_routes_student>
        } ></Route>
      


        <Route
          path="/administration"
          element={
            <Protected_routes_admin>
              <Administration />
            </Protected_routes_admin>
          }

        >
          {/* Aquí se definen las subrutas dentro de la ruta de administración */}
          <Route path="register" element={<Register />} />
          <Route path="students" element={<UsersContainer />} />
          <Route path="profile/students/:id" element={<Profile />} />
        </Route>
    </Routes>
    

    </>
  );
};

export default Rutas;
