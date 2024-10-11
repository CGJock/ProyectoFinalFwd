import {Protected_routes_admin} from './proteced_routes';
import { Protected_routes_psychologyst } from './proteced_routes';
import { Protected_routes_student } from './proteced_routes';
import { ProfileStudent } from '../pages/student/student-profile';
import  {Routes, Route} from "react-router-dom";
import Home from '../pages/home/home'
import Administration from '../pages/admin/administration';
import Register from '../components/Admin-components/admin-ui/Register';
import FAQ from '../components/home-components/FAQ';
import PostList from '../components/Admin-components/post/PostList';
import Login from '../pages/login/login'
import UsersContainer from '../components/administration-components/UsersContainer';
import { Profile } from '../pages/profile/Profile';
import { ProfilePsychologist } from '../pages/psychologist/Profile-psychologist';
import ProfileStudient from '../pages/student/ProfileStudient';
import ProfilePsycho from "../pages/psychogist/PhofilePsycho";
import NavHome from '../components/home-components/NavHome';
import AboutMe from '../components/home-components/AboutMe';

const Rutas = () => {
 
  return (
    <>
     <NavHome/>
      <Routes>
       
        
        <Route path="/home" element={<Home />} />
        {/* <Route path="/library" element={<Library />} /> */}

        <Route path="/FAQ" element={<FAQ />} />
        <Route path="/Profile/create-post" element={<Profile />} />

        <Route path="/post-list" element={<PostList />} />
        <Route path="/profileStudient" element={<ProfileStudient/>} />
        <Route path="/profilePsycho" element={<ProfilePsycho/>} />
        <Route path='/login' element={<Login />} />
        <Route path='/AboutMe' element={<AboutMe />} />

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
          {/* <Route path="profile/psycho/:id" element={<ProfilePsycho />} /> */}
        </Route>
    </Routes>
    

    </>
  );
};

export default Rutas;
