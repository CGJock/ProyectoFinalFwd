import { Navigate } from "react-router-dom"
import Administration from "../pages/admin/administration"
import Home  from "../pages/home/home"

import { ProfilePsychologist } from "../pages/psychologist/Profile-psychologist"
import { ProfileStudent } from "../pages/student/student-profile"
import { useAuth } from "../context/AuthContext"

export const Protected_routes_admin = ({children}) => {
 const {Userrol} = useAuth();
 const {Token} =  useAuth();
 
  if(Userrol == 1) {
    
    return children;
    } else
    return  <Home/>
}

export const Protected_routes_psychologyst = (children) => {
  const {Userrol} = useAuth();
  if(Userrol == 2) {
    
    return children;
    } else
    return  <Home/>
}

export const Protected_routes_student = (children)  => {
  const {Userrol} = useAuth()
  if(Userrol == 3) {
    
    return children;
    } else
    return  <Home/>
}

