import React, { createContext, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postRegister } from '../services/fetch';

// el componente 
const AuthContext = createContext();

// auth provider esta pensado para envolver toda la aplicacion y darle contexto a todos los hijos (children)
 const AuthProvider = ({ children }) => {
  const [User, setUser] = useState(null)
  const [Userrol, setUserrol] = useState(null)
  const [Token, setToken] = useState(null)
  

  const Log =  async (user_data) => {
    try{
    const response = await postRegister(user_data)
    if (response.ok) {
      const data = await response.json()
      const token = document.cookie.includes('jwt')
      setUser(data.id_user)
      setUserrol(data.id_rol)
      setToken(token)
      console.log("esta es tu data",data)
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
    <AuthContext.Provider value={{Token,User,Userrol}}>
      {children}
    </AuthContext.Provider>
  );
};

export default  AuthProvider;


//este hook personlaizado utiliza usercontex para acceder al contexto de autentificacion de todos los componentes
export const useAuth = () => {
  return useContext(AuthContext);
};
