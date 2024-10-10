import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login_user } from '../services/fetch';
import { jwtDecode } from 'jwt-decode';


// el componente 
const AuthContext = createContext();

// auth provider esta pensado para envolver toda la aplicacion y darle contexto a todos los hijos (children)
 const AuthProvider = ({ children }) => {
  const [User, setUser] = useState(sessionStorage.getItem("User") || null);
  const [Userrol, setUserrol] = useState(sessionStorage.getItem("Userrol") || null);
  const [Token, setToken] = useState(sessionStorage.getItem("Token") || null);
  const navigate = useNavigate();
  

  const Loggin =  async (user_data) => {
    try{
    const apiPost = "http://localhost:8000/api/user/user-login/"
    const response = await login_user(apiPost,user_data)
    if (response && response.id_user && response.id_rol) {
      const decodedToken = jwtDecode(response.jwt);
      setUser(response.id_user)
      setUserrol(response.id_rol)
      setToken(decodedToken)
      sessionStorage.setItem("Userrol", response.id_rol);
      sessionStorage.setItem("User", response.id_user);
      sessionStorage.setItem("Token", decodedToken);
      
      
      if(Userrol == 1)
        navigate('/administration/students')
      else if(Userrol == 2)
        navigate('profile/student')
      else if(Userrol == 3)
        navigate('/profile/psychologist')
      return;
    }
    throw new Error(response.message);
    } catch (err) {
      console.error(err);
    }
  };

  const logout  = () => {
    setUser(null)
    setUserrol(null)
    setToken(null)
  };



return (
    <AuthContext.Provider value={{Token, User, Userrol, Loggin, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default  AuthProvider;


//este hook personlaizado utiliza usercontex para acceder al contexto de autentificacion de todos los componentes
export const useAuth = () => {
  return useContext(AuthContext);
};


