import { Navigate } from "react-router-dom"
import Administration from "../pages/admin/administration"
import Home  from "../pages/home/home"

import { ProfilePsychologist } from "../pages/psychologist/Profile-psychologist"
import { ProfileStudent } from "../pages/student/student-profile"
import { useAuth } from "../context/AuthContext"

export const Protected_routes_admin = ({children}) => {
  const User = useAuth();
  const token = useAuth();
  const Id_rol = User.Id_rol

  if(token && Id_rol == 1) {
    console.log(token,Id_rol)
    return <Navigate to='/administration'  />;
    } else
    return  <Home/>
}

export const Protected_routes_psychologyst = (children) => {
  return (
    <ProfilePsychologist />
    )
}

export const Protected_routes_student = (children)  => {
  return (
    <ProfileStudent />
    )
  }

