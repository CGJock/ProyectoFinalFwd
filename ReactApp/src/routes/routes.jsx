
import { useAuth } from '../context/AuthContext';
import {Protected_routes_admin} from './proteced_routes';
import { Protected_routes_psychologyst } from './proteced_routes';
import { Protected_routes_student } from './proteced_routes';
<<<<<<< HEAD
import { Navigate } from 'react-router-dom';
=======
>>>>>>> 24047515c78a93722f0e3ce5393bfde5f34963e5
import { NotFoundPage } from '../pages/not found/NotFoundPage';


import  {Routes, Route, useParams} from "react-router-dom";
import Home from '../pages/home/home'
import Administration from '../pages/admin/administration';
import Register from '../components/Admin-components/admin-ui/Register';
import FAQ from '../components/home-components/FAQ';
import PostList from '../components/post-components/PostList';

import Login from '../pages/login/login'

import UsersContainer from '../components/Admin-components/admin-ui/UsersContainer';
import { ExpedientContainer } from '../components/Admin-components/admin-ui/ExpedienteContainer';
import { ProfilePsychologist } from '../pages/psychologist/Profile-psychologist';
import { InstitutionsContainer } from '../components/Admin-components/admin-ui/institutionsContainer';

import { TicketsView } from '../components/Admin-components/admin-ui/TicketsView';
import {PsychoContainer} from '../components/Admin-components/admin-ui/PsychoContainer';


import ProfilePsycho from "../components/psychologist-components/PhofilePsycho";
import { PsychologistCases } from '../components/psychologist-components/PsychoExpedientes';
// import AboutMe from '../components/home-components/AboutMe';
import AboutMe from '../components/home-components/AboutMe';
import BasicTabs from '../components/psychologist-components/PyschologistExpAssigned';


import Library from '../components/home-components/Library';

import { Student } from '../pages/student/student';
import ProfileStudent from '../components/student-components/ProfileStudent';
import { TicketComponent } from '../components/student-components/TicketComponent';



const Rutas = () => {
  
  const {id_user } = useParams()
  const {id_expedient} = useParams()

  return (
    <>
     
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<Home />} />
        <Route path="/library" element={<Library />} />
        <Route path="/FAQ" element={<FAQ />} />
        <Route path="/AboutMe" element={<AboutMe />} />
        <Route path="*" element={<NotFoundPage />} />
        <Route path="/login" element={<Login />} />
        
{/* 
        <Route path="/post-list" component={<PostList />} /> */}

         <Route
        path='/profile'
        element={
          <Protected_routes_psychologyst>
            <ProfilePsychologist />
          </Protected_routes_psychologyst>
        }>
          <Route path='psychologist/psychologist-cases' element={<PsychologistCases />} />{/*profile/psychologis/psychoogist-cases*/}
          <Route path='psychologist/all-expedients/:id_expedient' element={<BasicTabs /> } />{/*psychologist/all-expedients/:id_expedient*/}
          {/* <Route path="/profile/psychologist" element={<ProfilePsycho/>} /> */}
          
          
        </Route>


        <Route
        path='/profile'
        element={
          <Protected_routes_student>
            <Student />
          </Protected_routes_student>
        } >
          <Route path="/profile/user" element={<ProfileStudent />} />{/*profile/student*/}
          <Route path='student/create-ticket' element={<TicketComponent />} />{/*profile/student/create-ticket*/}
          <Route path='/profile/user/posts' element={<PostList/>} />{/*profile/student/posts*/}
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
          <Route path='psychologists' element={<PsychoContainer /> }/>{/*Administration/psychologists*/}
          <Route path='expedients' element={<ExpedientContainer /> }/>{/*Administration/expedients*/}
          <Route path='institutions' element={<InstitutionsContainer />} />
          
        </Route>
      </Routes>
    </>
  );
};

export default Rutas;
