import { Navigate, useSearchParams } from "react-router-dom"
import Home from "../pages/home/home";
import { useAuth } from "../context/AuthContext"
import { jwtDecode } from "jwt-decode";
import { useEffect,useState } from "react";
import { user_fetch } from "../services/user_fetch";

export const Protected_routes_admin = ({children}) => {
  const [id_rol, setid_rol] = useState(null)
  const [Token, setToken] = useState(sessionStorage.getItem('token_raw')|| null);
  const [decodedToken, setdecodedToken] = useState(jwtDecode(Token))
  const [id_user, setid_user] = useState(decodedToken.id_user)
 const [User, setUser] = useState(null)
 


  
  useEffect(() => {
    // Al cargar el componente, intenta decodificar el token y obtener el id_user y id_rol
    console.log(Token)
    if (Token) {
        setdecodedToken(jwtDecode(Token));
        
}
}, [Token]); // Solo se
 

 useEffect(() => {
  console.log("id_user actualizado:", id_user);
}, [id_user]); // Este useEffect se ejecutará cuando id_user cambie

const apiPost = "http://localhost:8000/api/user/user"
useEffect(() => {
  const fetchUserData = async () => {
    if (id_user) { // Verificar que id_user tenga valor antes de llamar a la API
      try {
          const userData = await user_fetch(apiPost, id_user); 
          setUser(userData); // Actualiza el estado con la información del usuario
      } catch (error) {
          console.error("Error fetching user data:", error);
      }
    }
  };

  fetchUserData();
}, [apiPost, id_user]); 

 

 if(!Token) {
  return <Navigate to='/home'/>;
 }
 
  if(id_user == 1) {
    console.log(true)
    
    
    return children;
    } else
    return  <Navigate to="/home"/>
}

export const Protected_routes_psychologyst = ({children}) => {
  
  if(id_user == 3 || id_user == 1) {
    
    return children;
    } else
    return  <Navigate to="/home"/>
}

export const Protected_routes_student = ({children})  => {
  
  const decodedToken = jwtDecode(Token)
  
  if(id_user == 2 || id_user == 1) {
    
    return children;
    } else
    return  <Navigate to="/home"/>
}
