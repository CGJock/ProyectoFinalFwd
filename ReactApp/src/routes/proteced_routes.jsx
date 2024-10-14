import { Navigate } from "react-router-dom"
import Home from "../pages/home/home";
import { useAuth } from "../context/AuthContext"

export const Protected_routes_admin = ({children}) => {
 const {Userrol} = useAuth();
 const {Token} =  useAuth();
 
  if(parseInt(Userrol) == 1) {
    
    return children;
    } else
    return  <Navigate to="/home"/>
}

export const Protected_routes_psychologyst = ({children}) => {
  const {Userrol} = useAuth();
  if(parseInt(Userrol) == 3 || parseInt(Userrol) == 1) {
    
    return children;
    } else
    return  <Navigate to="/home"/>
}

export const Protected_routes_student = ({children})  => {
  const {Userrol} = useAuth()
  if(parseInt(Userrol) == 2 || parseInt(Userrol) == 1) {
    
    return children;
    } else
    return  <Navigate to="/home"/>
}
