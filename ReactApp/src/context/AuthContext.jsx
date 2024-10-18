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
  const [decodedToken, setdecodedToken] = useState(null)
  const [id_user, setid_user] = useState(null)
  const [User_data, setUser_data] = useState(null)
  const navigate = useNavigate()
  useEffect(() => {
    // Al cargar el componente, intenta decodificar el token y obtener el id_user y id_rol
    if (Token) {
      try {
        const decoded = jwtDecode(Token); // Decodifica el token solo si no es null
        setdecodedToken(decoded);
        setid_user(decoded.id_user);
      } catch (error) {
        console.error('Error decoding token:', error); // Maneja el error
        setdecodedToken(null); // Resetea el estado si hay un error
      }
    }
}, [Token]); // Solo se

const apiPost = "http://localhost:8000/api/user/user"
useEffect(() => {
  const fetchUserData = async () => {
    if (id_user) { // Verificar que id_user tenga valor antes de llamar a la API
      try {
          const userData = await user_fetch(apiPost,id_user); 
          setUser_data(userData); // Actualiza el estado con la información del usuario
          
      } catch (error) {
          console.error("Error fetching user data:", error);
      }
    }
  };

  fetchUserData();
}, [id_user]); 

 

  const Loggin =  async (user_data) => {
    try{
    const apiPost = "http://localhost:8000/api/user/login-user/"
    const response = await login_user(apiPost,user_data)
    
    if (response) {
      console.log(response)
      
      const token_raw = response.access;
      sessionStorage.setItem('token_raw', token_raw);

      if(User_data.id_rol == 1)
        navigate('/administration/students')
      else if(User_data.id_rol == 2)
        navigate('/profile/student')
      else if(User_data.id_rol == 3)
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


