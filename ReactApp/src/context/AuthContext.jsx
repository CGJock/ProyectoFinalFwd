import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login_user } from '../services/fetch';
import { jwtDecode } from 'jwt-decode';
import { user_fetch } from '../services/user_fetch';
import Cookies from 'js-cookie';

// el componente 
const AuthContext = createContext();

// auth provider esta pensado para envolver toda la aplicacion y darle contexto a todos los hijos (children)
  const AuthProvider = ({ children }) => {
  const access_token =  Cookies.get('access_token');
  const [decodedToken, setdecodedToken] = useState(null)
  const [id_user, setid_user] = useState(null)
  const [UserInfo, setUserInfo] = useState(null)
  const [IdRol, setIdRol] = useState(null)

  const [AdminData, setAdminData] = useState(null)
  const [StudentData, setStudentData] = useState(null)
  const [PsychologistData, setPsychologistData] = useState(null)
  const navigate = useNavigate()
 
 
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  useEffect(() => {
    // Al cargar el componente, intenta decodificar el token y obtener el id_user y id_rol
    if (access_token) {
      try {
        const decoded = jwtDecode(access_token); // Decodifica el token solo si no es null
        setid_user(decoded.id_user);
      } catch (error) {
        console.error('Error decoding token:', error); // Maneja el error
        setdecodedToken(null); // Resetea el estado si hay un error
      }
    }
}, [access_token]); // dependencia que hace que cambie  el efecto solo cuando Token cambie

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
useEffect(() => {
  const fetchUserData = async () => {
    const apiPost = "http://localhost:8000/api/user/user";
    const apiStudent = "http://localhost:8000/api/student/student-detailed"
    const apiPsychologist =  "http://localhost:8000/api/psychologist/psychologist-detailed"
    if (id_user && access_token) {
      try {
        console.log("Fetching user ID:", id_user);
        const userData = await user_fetch(apiPost, id_user);
        console.log("User data fetched:", userData);

        if (userData.id_rol == 1) {
          setAdminData(userData);
          setIdRol(userData.id_rol);
        } else if (userData.id_rol == 2) {
          const student_data = await user_fetch(apiStudent,id_user)
          setStudentData(student_data);
          setIdRol(userData.id_rol);
        } else if (userData.id_rol == 3) {
          const psychologist_data = await user_fetch(apiPsychologist,id_user)
          setPsychologistData(psychologist_data);
          setIdRol(userData.id_rol);
        } else {
          console.error("No se encontró la data de usuario");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    } else {
      console.log("No user ID o token encontrado");
    }
  };

  fetchUserData(); // Llamada a la función
}, [id_user, access_token]); // Dependencias del efecto



///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//funcion para loguear al usuario 
  const Loggin =  async (user_data) => {
    try{
    const apiPost = "http://localhost:8000/api/user/login-user/";
    const apiUser = "http://localhost:8000/api/user/user";
    const apiStudent = "http://localhost:8000/api/student/student-detailed"
    const apiPsychologist =  "http://localhost:8000/api/psychologist/psychologist-detailed"
    const response = await login_user(apiPost,user_data);
    
    if(response){
      
      Cookies.set('refresh_token', response.refresh, { secure: true, sameSite: 'Lax' });
      Cookies.set('access_token', response.access, { secure: true, sameSite: 'Lax' });
      
      const token_raw = Cookies.get('access_token');
      const decodedToken = jwtDecode(token_raw);
      console.log(decodedToken)
      setid_user(decodedToken.id_user);
      
      if(id_user){
        const user = await user_fetch(apiUser,id_user);
        if(user){
          if(user.id_rol == 1){
            setIdRol(user.id_rol)
            setAdminData(user)//se setean los datos generales de admin para futuro uso
            navigate('administration/students');
            setTimeout(() => {
              navigate('administration/students');
            }, 1);
      } else if(user.id_rol == 2){
            setIdRol(user.id_rol)
            const student_data = await user_fetch(apiStudent,id_user)
            setStudentData(student_data)
            navigate('/profile/student');
            setTimeout(() => {
              navigate('/profile/student');
            }, 1);
      } else if(user.id_rol == 3) {
            setIdRol(user.id_rol)
            const psychologist_data = await user_fetch(apiPsychologist,id_user)
            setPsychologistData(psychologist_data)
            setTimeout(() => {
              navigate('/profile/psychologist/psychologist-cases');
            }, 1);
            navigate('/profile/psychologist/psychologist-cases');
      } else {
          console.log('no se encontro el usuario');
            navigate('/home')
      }
        return ;
      }
    }
  }
    throw new Error(response.message);
    } catch (err) {
      console.error(err);
    }
  };

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//funcion para desloguear
  const logout  = () => {
    Cookies.set('refresh_token', '', { expires: -1 });
    Cookies.set('access_token', '', { expires: -1 });
    setIdRol(null)
    setAdminData(null)
    setStudentData(null)
    setPsychologistData(null)
  };
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //Función para gestionar id_ticket e id_user
  //setea la data que se le pasara al modal
const [id_ticket, setid_ticket] = useState(null)
const [ticket_user_id, setticket_user_id] = useState(null)
  const setTicketData = (ticket_id, ticket_user_id) => {
    setid_ticket(ticket_id);
    setticket_user_id(ticket_user_id);
  };
  ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////



return (
    <AuthContext.Provider value={{ id_user ,Loggin, logout, setTicketData, id_ticket, ticket_user_id,AdminData,StudentData,PsychologistData,IdRol }}>
      {children}
    </AuthContext.Provider>
  );
};

export default  AuthProvider;


//este hook personlaizado utiliza usercontex para acceder al contexto de autentificacion de todos los componentes
export const useAuth = () => {
  return useContext(AuthContext);
};

  
