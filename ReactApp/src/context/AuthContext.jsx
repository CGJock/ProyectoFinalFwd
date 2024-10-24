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
  const Token =  Cookies.get('Token');
  const [decodedToken, setdecodedToken] = useState(null)
  const [id_user, setid_user] = useState(null)
  const [UserInfo, setUserInfo] = useState(null)
  const navigate = useNavigate()
 
 
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//funcion para loguear al usuario 
  const Loggin =  async (user_data) => {
    try{
    const apiPost = "http://localhost:8000/api/user/login-user/";
    const apiUser = "http://localhost:8000/api/user/user";
    const response = await login_user(apiPost,user_data);
    
    if(response){
      console.log(response);
      Cookies.set('Token', response.access, { expires: 3, path: '/' });
      Cookies.set('refresh_token', response.refresh, { secure: true, sameSite: 'Lax' });
      Cookies.set('access_token', response.access, { secure: true, sameSite: 'Lax' });
      const token_raw = Cookies.get('Token');
      const decodedToken = jwtDecode(token_raw);
      setid_user(decodedToken.id_user);
      console.log(decodedToken);
      
      
      if(id_user){
        const user = await user_fetch(apiUser,id_user);
        if(user){
          console.log(user.id_rol)
          if(user.id_rol == 1){
            navigate('administration/students');
      } else if(user.id_rol == 2){
            navigate('/profile/student');
      } else if(user.id_rol == 3) {
            navigate('/profile/psychologist');
      } else {
          console.log('no se encontro el usuario');
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
    // setSessionData(null)
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
    <AuthContext.Provider value={{ id_user,Token ,Loggin, logout, setTicketData, id_ticket, ticket_user_id }}>
      {children}
    </AuthContext.Provider>
  );
};

export default  AuthProvider;


//este hook personlaizado utiliza usercontex para acceder al contexto de autentificacion de todos los componentes
export const useAuth = () => {
  return useContext(AuthContext);
};



// Crea el contexto de la imagen
const ImageContext = createContext();

// Crea el provider
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
        <ImageContext.Provider value={{
            image,
            handleImageChange
        }}>
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

