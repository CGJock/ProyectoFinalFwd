import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login_user } from '../services/fetch';
import { jwtDecode } from 'jwt-decode';
import { user_fetch } from '../services/user_fetch';






// el componente 
const AuthContext = createContext();

// auth provider esta pensado para envolver toda la aplicacion y darle contexto a todos los hijos (children)
  const AuthProvider = ({ children }) => {
  const [Token, setToken] = useState(sessionStorage.getItem('token_raw')|| null);
  const [id_user, setid_user] = useState(null)
  const [id_rol, setid_rol] = useState(null)
  const navigate = useNavigate()
  useEffect(() => {
    // Al cargar el componente, intenta decodificar el token y obtener el id_user y id_rol
    
    if (Token) {
        const decodedToken = jwtDecode(Token);
        setid_user(decodedToken.id_user);
        console.log(id_user)
        
    }
}, [Token]); // Solo se
 

  const Loggin =  async (user_data) => {
    try{
    const apiPost = "http://localhost:8000/api/user/login-user/"
    const response = await login_user(apiPost,user_data)
    
    if (response) {
      
      const token_raw = response.access;
      sessionStorage.setItem('token_raw', token_raw);
      setToken(token_raw)
      const decodedToken = jwtDecode(token_raw)
      setid_user(decodedToken.id_user)
      setid_user(decodedToken.id_user)
      // await find_user();

      
      if(response.id_rol == 1)
        navigate('/administration/students')
      else if(response.id_rol == 2)
        navigate('/profile/student')
      else if(response.id_rol == 3)
        navigate('/profile/psychologist')
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
    <AuthContext.Provider value={{ id_user,Token ,Loggin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default  AuthProvider;


//este hook personlaizado utiliza usercontex para acceder al contexto de autentificacion de todos los componentes
export const useAuth = () => {
  return useContext(AuthContext);
};


