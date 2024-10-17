import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login_user } from '../services/fetch';
import { jwtDecode } from 'jwt-decode';
import { useEffect } from 'react';
import Cookies from "js-cookie";


// el componente 
const AuthContext = createContext();

// auth provider esta pensado para envolver toda la aplicacion y darle contexto a todos los hijos (children)
  const AuthProvider = ({ children }) => {
  // const [SessionData, setSessionData] = useState(JSON.parse(sessionStorage.Session_data || null));
  // const [IdUser, setIdUser] = useState(SessionData ? SessionData.id_user : null);
  // const [Userrol, setUserrol] = useState(SessionData ? SessionData.id_rol : null);
  const [Token, setToken] = useState(null);
  const navigate = useNavigate()
  useEffect(() => {
    
     Cookies.set("dd", 'hola', { expires: 7, path: "/" });
  }, []);
 
  // Get a cookie
  // const userToken = Cookies.get("csrftoken");
  // console.log(userToken)

  
  
  


  const Loggin =  async (user_data) => {
    try{
    const apiPost = "http://localhost:8000/api/user/login-user/"
    const response = await login_user(apiPost,user_data)
    
    if (response) {
      console.log(response)
      const token_raw = response.access;
      console.log("Raw JWT Token:", token_raw);
      Cookies.set("jwt", token_raw, { expires: 7, path: "/" });
      console.log(Cookies.get('jwt'))
      
      const decodedToken = jwtDecode(token_raw);
      setToken(decodedToken)
      
      console.log(decodedToken)
      
    
      
      navigate('/home')
      if(decodedToken.id_rol == 1)
        navigate('/administration/students')
      // else if(Userrol == 2)
      //   navigate('/profile/student')
      // else if(Userrol == 3)
      //   navigate('/profile/psychologist')
      return;
    }
    throw new Error(response.message);
    } catch (err) {
      console.error(err);
    }
  };

  const logout  = () => {
    // setSessionData(null)
  };



return (
    <AuthContext.Provider value={{ Token ,Loggin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default  AuthProvider;


//este hook personlaizado utiliza usercontex para acceder al contexto de autentificacion de todos los componentes
export const useAuth = () => {
  return useContext(AuthContext);
};


