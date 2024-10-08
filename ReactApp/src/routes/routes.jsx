import Protected_routes from "./proteced_routes";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/home/home";
import Administration from "../pages/admin/administration";
import Register from "../components/Admin-components/admin-ui/Register";
import FAQ from "../components/Admin-components/admin-static-components/FAQ";

import PostList from "../components/Admin-components/post/PostList";
import Library from "../pages/phofile-user/phofile-student/Library";
import AboutMe from "../components/Admin-components/admin-static-components/AboutMe";
import PostForm from "../components/Admin-components/post/PostForm";

const Rutas = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/library" element={<Library />} />
        <Route path="/FAQ" element={<FAQ />} />
        <Route path="/create-post" element={PostForm} />
        <Route path="/post-list" element={PostList} />
        <Route path="/AboutMe" element={<AboutMe />} />
        <Route path="/Administration" element={<Administration />} />
        <Route
          path="/Register"
          element={
            <Protected_routes>
              <Register />
            </Protected_routes>
          }
        />
      </Routes>
    </>
  );
};

export default Rutas;
