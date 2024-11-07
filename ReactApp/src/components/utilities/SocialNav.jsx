import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AccountBoxIcon from "@mui/icons-material/AccountBox"; //profileicon
import HomeRoundedIcon from "@mui/icons-material/HomeRounded"; //homeicon
import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded"; //potsicon
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
<<<<<<< HEAD
import MenuIcon from '@mui/icons-material/Menu';
import SideModal from "../student-components/SideModal";
=======
>>>>>>> 24047515c78a93722f0e3ce5393bfde5f34963e5
import Tooltip from '@mui/material/Tooltip';
import "../../styles/utilities-styles/nav-bar.css";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";

export const SocialNav = () => {
  
  
  const navigate = useNavigate();
  const { StudentData, PsychologistData, logout } = useAuth();
  const [username, setusername] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false); // Estado para controlar la apertura del modal
  useEffect(() => {
    if (StudentData && StudentData.id_user) {
      setusername(StudentData.id_user.username);
    } else if (PsychologistData && PsychologistData.id_user) {
      setusername(PsychologistData.id_user.username);
    }
  }, [StudentData, PsychologistData]);

  //clear local storage
  const handleLogout = () => {
    logout();
    navigate("http:/localhost:5173/home");
  };

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
};

  return (
    <>
      <nav className="navBar">
<<<<<<< HEAD


      <Tooltip title="Barra lateral"> <div>
         <MenuIcon onClick={toggleModal} sx={{ color: "#F8E4FC", fontSize: 35 }} />
          
        </div>
        </Tooltip>

=======
>>>>>>> 24047515c78a93722f0e3ce5393bfde5f34963e5
        <Tooltip title="Home"> <div>
          <Link to="http://localhost:5173/home">
            <HomeRoundedIcon sx={{ color: "#F8E4FC", fontSize: 35 }} />
          </Link>
        </div>
        </Tooltip>


          <Tooltip title="Crear Publicacion"><div>
          <Link to="http://localhost:5173/profile/user/posts">
            <BorderColorRoundedIcon sx={{ color: "#F8E4FC", fontSize: 35 }} />
          </Link>
        </div>
        </Tooltip>

        <Tooltip title="Perfil"><div>
          <Link to="http://localhost:5173/profile/user">
            <AccountBoxIcon sx={{ color: "#F8E4FC", fontSize: 35 }} />
          </Link>
          </div>
          </Tooltip>
        

        <div
          style={{
            display: "flex",
            flexDirection: "row-reverse",
            columnGap: "55px",
          }}
        >
          {username ? (
            <>
              <div className="welcomeMessage">Bienvenido, {username}</div>
              <Link to="http://localhost:5173/home" onClick={handleLogout}>
                <LogoutRoundedIcon sx={{ color: "#F8E4FC", fontSize: 35 }} />
              </Link>
            </>
          ) : (
            <Link to="http://localhost:5173/profile">
              <AccountBoxIcon sx={{ color: "#F8E4FC", fontSize: 35 }} />
            </Link>
          )}
        </div>
      </nav>

      <button onClick={toggleModal}>Abrir Menú</button>
            <SideModal isOpen={isModalOpen} onClose={toggleModal} />
           
    </>
  );
};
