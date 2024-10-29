
import {Protected_routes_admin} from './proteced_routes';
import { Protected_routes_psychologyst } from './proteced_routes';
import { Protected_routes_student } from './proteced_routes';
import { useEffect,useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { user_fetch } from '../services/user_fetch';


import  {Routes, Route} from "react-router-dom";
import Home from '../pages/home/home'
import Administration from '../pages/admin/administration';
import Register from '../components/Admin-components/admin-ui/Register';
import FAQ from '../components/home-components/FAQ';
<<<<<<< HEAD
import PostList from '../components/post/PostList';

import Login from '../pages/login/login'

import UsersContainer from '../components/Admin-components/admin-ui/UsersContainer';
import { ExpedientContainer } from '../components/Admin-components/admin-ui/ExpedienteContainer';
import { ProfilePsychologist } from '../pages/psychologist/Profile-psychologist';
=======

// import PostList from '../components/post/PostList';
// import CreatePost from '../components/post/post/CreatePost';
import Login from '../pages/login/login'
import PostForm from '../components/post-components/PostForm';
import UsersContainer from '../components/Admin-components/admin-ui/UsersContainer';
import { Profile } from '../pages/profile/Profile';
import { ProfilePsychologist } from '../pages/psychologist/psychologist';
>>>>>>> e714734dc5203dee4fa4536d45cbbbd2d93c5103

import { TicketsView } from '../components/Admin-components/admin-ui/TicketsView';
// import {PsychoContainer} from '../components/Admin-components/admin-ui/PsychoContainer';


import ProfilePsycho from "../components/psychologist-components/PhofilePsycho";
<<<<<<< HEAD
import { PsychologistCases } from '../components/psychologist-components/PsychoExpedientes';
// import AboutMe from '../components/home-components/AboutMe';
=======
import AboutMe from '../components/home-components/AboutMe';
>>>>>>> e714734dc5203dee4fa4536d45cbbbd2d93c5103
import NavHome from '../components/home-components/NavHome';

import Library from '../components/home-components/Library';

import { Student } from '../pages/student/student';
import ProfileStudent from '../components/student-components/ProfileStudent';
import { TicketComponent } from '../components/student-components/TicketComponent';


const Rutas = () => {

  return (
    <>
<<<<<<< HEAD
     
=======
      <NavHome />
>>>>>>> e714734dc5203dee4fa4536d45cbbbd2d93c5103
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/library" element={<Library />} />

        <Route path="/FAQ" element={<FAQ />} />
        <Route path="/Profile/create-post" element={<ProfileStudent />} />
{/* 
        <Route path="/post-list" component={<PostList />} /> */}

        <Route path="/profilePsycho" element={<ProfilePsycho />} />
        <Route path="/login" element={<Login />} />
        <Route path="/AboutMe" element={<AboutMe />} />

        <Route
<<<<<<< HEAD
        path='/profile'
        element={
          <Protected_routes_psychologyst>
            <ProfilePsychologist />
          </Protected_routes_psychologyst>
        }>
          <Route path='psychologist/psychologist-cases' element={<PsychologistCases />} />{/*profile/psychologis/psychoogist-cases*/}
        </Route>

=======
          path="/profile/psychologist"
          element={
            <Protected_routes_psychologyst>
              <ProfilePsychologist />
            </Protected_routes_psychologyst>
          }
        ></Route>
>>>>>>> e714734dc5203dee4fa4536d45cbbbd2d93c5103

        <Route
        path='/profile'
        element={
          <Protected_routes_student>
            <Student />
          </Protected_routes_student>
        } >
          <Route path="student" element={<ProfileStudent />} />{/*profile/student*/}
          <Route path='student/create-ticket' element={<TicketComponent />} />{/*profile/student/create-ticket*/}
        </Route>

        <Route
          path="/administration"
          element={
            <Protected_routes_admin>
              <Administration />
            </Protected_routes_admin>
          }
        >
          {/* Aquí se definen las subrutas dentro de la ruta de administración */}

          <Route path="register" element={<Register />} />{/*Administration/register*/}
          <Route path="students" element={<UsersContainer />} />{/*Administration/students*/}
          <Route path="tickets" element={<TicketsView />} />{/*Administration/tickets*/}
<<<<<<< HEAD
          <Route path='psychologists' element={<PsychoContainer /> }/>{/*Administration/psychologists*/}
          <Route path='expedients' element={<ExpedientContainer /> }/>{/*Administration/expedients*/}

=======
          {/* <Route path='psychologists' element={<PsychoContainer /> }/>{/*Administration/psychologists} */}
>>>>>>> e714734dc5203dee4fa4536d45cbbbd2d93c5103
          

          {/* <Route path="profile/psycho/:id" element={<ProfilePsycho />} /> */}
        </Route>
      </Routes>
    </>
  );
};

export default Rutas;
