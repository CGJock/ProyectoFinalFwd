import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import AccountBoxIcon from "@mui/icons-material/AccountBox"; //profileicon
import HomeRoundedIcon from "@mui/icons-material/HomeRounded"; //homeicon
import BorderColorRoundedIcon from "@mui/icons-material/BorderColorRounded"; //potsicon
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import "../../styles/utilities-styles/nav-bar.css";
import { useAuth } from "../../context/AuthContext";
import { useState } from "react";

export const SocialNav = () => {
  const navigate = useNavigate();
  const { StudentData, PsychologistData, logout } = useAuth();
  const [username, setusername] = useState(null);
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

  return (
    <>
      <nav className="navBar">
        <div>
          <Link to="http://localhost:5173/home">
            <HomeRoundedIcon sx={{ color: "#F8E4FC", fontSize: 35 }} />
          </Link>
        </div>

        <div>
          <Link to="http://localhost:5173/profile/posts">
            <BorderColorRoundedIcon sx={{ color: "#F8E4FC", fontSize: 35 }} />
          </Link>
        </div>

        <div>
          <Link to="http://localhost:5173/profile/">
            <AccountBoxIcon sx={{ color: "#F8E4FC", fontSize: 35 }} />
          </Link>
        </div>

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
    </>
  );
};
