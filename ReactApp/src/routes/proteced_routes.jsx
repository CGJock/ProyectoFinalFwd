import { Navigate } from "react-router-dom"
import Home from "../pages/home/home";
import { useAuth } from "../context/AuthContext"

export const Protected_routes_admin = ({children}) => {
 const {Userrol} = useAuth();
 const {Token} =  useAuth();
 
  if(Userrol == 1) {
    
    return children;
    } else
    return  <Navigate to="/home"/>
}

export const Protected_routes_psychologyst = ({children}) => {
  const {Userrol} = useAuth();
  if(Userrol == 3 || Userrol == 1) {
    
    return children;
    } else
    return  <Navigate to="/home"/>
}

export const Protected_routes_student = ({children})  => {
  const {Userrol} = useAuth()
  if(Userrol == 2 || Userrol == 1) {
    
    return children;
    } else
    return  <Navigate to="/home"/>
}
