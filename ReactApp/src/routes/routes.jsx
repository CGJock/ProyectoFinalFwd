import { Protected_routes_admin } from "./proteced_routes";
import { Protected_routes_psychologyst } from "./proteced_routes";
import { Protected_routes_student } from "./proteced_routes";

import { Routes, Route } from "react-router-dom";
import Home from "../pages/home/home";
import Administration from "../pages/admin/administration";
import Register from "../components/Admin-components/admin-ui/Register";
import FAQ from "../components/home-components/FAQ";
import PostList from "../components/Admin-components/post/PostList";
import Login from "../pages/login/login";
import UsersContainer from "../components/administration-components/UsersContainer";
import { Profile } from "../pages/profile/Profile";
import { useParams } from "react-router-dom";
import { ProfilePsychologist } from "../pages/psychologist/Profile-psychologist";

import ProfilePsycho from "../pages/psychogist/PhofilePsycho";
import AboutMe from "../components/home-components/AboutMe";
import NavHome from "../components/home-components/NavHome";

import { Student } from "../pages/student/student";
import ProfileStudent from "../components/student-components/ProfileStudent";

const Rutas = () => {
  return (
    <>
      <NavHome />
      <Routes>
        <Route path="/home" element={<Home />} />
        {/* <Route path="/library" element={<Library />} /> */}

        <Route path="/FAQ" element={<FAQ />} />
        {/* <Route path="/Profile/create-post" element={<ProfileStudent />} /> */}

        {/* <Route path="/post-list" component={<PostList />} /> */}

        <Route path="/profilePsycho" element={<ProfilePsycho />} />
        <Route path="/login" element={<Login />} />
        <Route path="/AboutMe" element={<AboutMe />} />

        <Route
          path="/profile/psychologist"
          element={
            <Protected_routes_psychologyst>
              <ProfilePsychologist />
            </Protected_routes_psychologyst>
          }
        ></Route>

        <Route
          path="/profile/student"
          element={
            <Protected_routes_student>
              <Student />
            </Protected_routes_student>
          }
        >
          <Route path="/profile/student" element={<ProfileStudent />} />
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
          <Route path="register" element={<Register />} />
          <Route path="students" element={<UsersContainer />} />

          {/* <Route path="profile/psycho/:id" element={<ProfilePsycho />} /> */}
        </Route>
      </Routes>
    </>
  );
};

export default Rutas;
