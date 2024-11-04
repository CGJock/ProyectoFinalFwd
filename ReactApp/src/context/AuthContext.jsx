import React, { createContext, useContext, useState, useEffect } from 'react';
import { PUT } from '../services/crud';
import { useNavigate } from 'react-router-dom';
import { login_user } from '../services/fetch';
import { jwtDecode } from 'jwt-decode';
import { user_fetch } from '../services/user_fetch';
import Cookies from 'js-cookie';

// el componente 
const AuthContext = createContext();

// auth provider esta pensado para envolver toda la aplicacion y darle contexto a todos los hijos (children)

  export const  AuthProvider = ({ children }) => {
  const access_token =  Cookies.get('access_token');
  const [decodedToken, setdecodedToken] = useState(null)
  const [id_user, setid_user] = useState(null)
  // const [UserInfo, setUserInfo] = useState(null)
  const [IdRol, setIdRol] = useState(null)

  const [AdminData, setAdminData] = useState(null)
  const [StudentData, setStudentData] = useState(null)
  const [PsychologistData, setPsychologistData] = useState(null)
  const navigate = useNavigate()

 
 
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // useEffect para observar cambios en el Token desde las cookies
  useEffect(() => {

    // Al cargar el componente, intenta decodificar el token y obtener el id_user y id_rol
    if (access_token) {
      try {
        const decoded = jwtDecode(access_token); // Decodifica el token solo si no es nul
        setid_user(decoded.id_user);
      } catch (error) {
        console.error('Error decoding token:', error);
        setdecodedToken(null);
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

const edit_user = async (user_id, userData) => {
  const edit_link = `http://localhost:8000/api/user/edit-user/${user_id}/`;

  try {
      const data = await PUT(userData, edit_link); // Llama a PUT, que ya maneja errores
      return data; // Retornar los datos para uso posterior
  } catch (error) {
      console.error("Error al editar usuario:", error);
      throw error; // Relanza el error para manejarlo en el contexto donde se llama
  }
};


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Función de login que configura el Token y actualiza el contexto
const Loggin = async (user_data) => {
  try {
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
      const id_user = jwtDecode(response.access).id_user
      if(id_user){
        // console.log('entre');
        const user = await user_fetch(apiUser,id_user);
        
        
        if(user){
          // console.log('entre againg');
          
          if(user.id_rol == 1){
            setIdRol(user.id_rol)
            setAdminData(user)//se setean los datos generales de admin para futuro uso
            // navigate('administration/students');
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
            navigate('/profile/psychologist/psychologist-cases');
            setTimeout(() => {
              navigate('/profile/psychologist/psychologist-cases');
            }, 1);
            
      } else {
          console.log('no se encontro el usuario');
            navigate('/home')
      }
        return ;

      }
    }
  } catch (error) {
    console.error('Login error:', error);
    throw new Error('Error en la autenticación');
  }
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//funcion para pasar el formato de creacion de fechas a algo mas legible para el user ej:30/junio/2000
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric',hour:  'numeric',minute: 'numeric'};

  return new Date(dateString).toLocaleDateString('es-ES', options);
};

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

const [id_expedient, setid_expedient] = useState(null)
  const setExpedientData = (id_expedient) => {
    setid_expedient(id_expedient);
  }



return (

    <AuthContext.Provider value={{ id_user ,Loggin, logout, setTicketData, id_ticket, ticket_user_id,AdminData,StudentData,PsychologistData,IdRol,formatDate,
      setExpedientData,id_expedient,edit_user
     }}>

    <AuthContext.Provider value={{ id_user,Token ,Loggin, logout, setTicketData, id_ticket, ticket_user_id }}>
      
  );
};




//este hook personlaizado utiliza usercontex para acceder al contexto de autentificacion de todos los componentes
export const useAuth = () => {
  return useContext(AuthContext);
};



// Crea el contexto de la imagen
const ImageContext = createContext();

// Función para obtener un valor desde LocalStorage
const getFromLocalStorage = (key) => {
  try {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : null;
  } catch (error) {
    console.error(`Error obteniendo ${key} desde localStorage`, error);
    return null;
  }
};

// Función para guardar un valor en LocalStorage
const saveToLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error guardando ${key} en localStorage`, error);
  }
};

// Función para convertir un archivo a base64
const fileToBase64 = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
};

// Crea el provider para el contexto de la imagen
export const ImageProvider = ({ children }) => {
  const [image, setImage] = useState(null);

  // Cargar la imagen guardada en localStorage al cargar el componente
  useEffect(() => {
    const savedImage = getFromLocalStorage('profileImage');
    if (savedImage) {
      setImage(savedImage);
    }
  }, []);

  // Guardar la imagen en localStorage
  useEffect(() => {
    if (image) {
      saveToLocalStorage('profileImage', image);
    }
  }, [image]);

  // Función para manejar el cambio de imagen
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const base64Image = await fileToBase64(file);
      setImage(base64Image);
    }
  };

  return (
    <ImageContext.Provider value={{ image, handleImageChange }}>
      {children}
    </ImageContext.Provider>
  );
};

// Hook personalizado para acceder al contexto
export const useImage = () => {
  return useContext(ImageContext);
};




// /////////////////////
// Crear el contexto
const EmailContext = createContext();

// Proveedor del contexto
export const EmailProvider = ({ children }) => {
  const [showAlert, setShowAlert] = useState(false);

  const handleSubmit = async (formData) => {
    try {
      const response = await fetch("", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setShowAlert(true); // Mostrar la alerta
        setTimeout(() => setShowAlert(false), 5000); // Ocultar después de 5 segundos
      } else {
        console.error("Error al enviar el correo:", response.statusText);
      }
    } catch (error) {
      console.error("Error en la conexión:", error);
    }
  };

  return (
    <EmailContext.Provider value={{ handleSubmit, showAlert }}>
      {children}
    </EmailContext.Provider>
  );
};

// Hook para usar el contexto
export const useEmail = () => {
  return useContext(EmailContext);
};



import { Client as TwilioClient } from '@twilio/conversations';

const TwilioContext = createContext();

export const TwilioProvider = ({ children }) => {
    const [twilioClient, setTwilioClient] = useState(null);
    const [conversation, setConversation] = useState(null); // State for conversation

    const initializeTwilio = (token) => {
        const client = new TwilioClient(token);
        setTwilioClient(client);
    };

    useEffect(() => {
        if (twilioClient) {
            const getConversation = async () => {
                const conversationInstance = await twilioClient.getConversationBySid('IS78b2c1901d334caba179904a5c39ac42'); 
                setConversation(conversationInstance);
            };

            getConversation();
        }
    }, [twilioClient]);

    return (
        <TwilioContext.Provider value={{ twilioClient, initializeTwilio, conversation }}>
            {children}
        </TwilioContext.Provider>
    );
};

export const useTwilio = () => useContext(TwilioContext);