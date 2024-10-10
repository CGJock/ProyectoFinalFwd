import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login_user } from '../services/fetch';
import { jwtDecode } from 'jwt-decode';


// el componente 
const AuthContext = createContext();

// auth provider esta pensado para envolver toda la aplicacion y darle contexto a todos los hijos (children)
 const AuthProvider = ({ children }) => {
  const [User, setUser] = useState(null)
  const [Userrol, setUserrol] = useState(null)
  const [Token, setToken] = useState(null)
  const navigate = useNavigate();
  

  const Loggin =  async (user_data) => {
    try{
    const apiPost = "http://localhost:8000/api/user/user-login/"
    const response = await login_user(apiPost,user_data)
    if (response && response.jwt) {
      const decodedToken = jwtDecode(response.jwt);
      console.log(decodedToken,'este es la decode')
      setUser(decodedToken.id_user)
      setUserrol(decodedToken.id_rol)
      setToken(response.jwt)
      console.log("esta es tu data",response,Userrol,User)
      console.log('userid:', Userrol)
      if(Userrol == 1)
        navigate('/administration')
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


