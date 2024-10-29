import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { login_user } from '../services/fetch';
import { jwtDecode } from 'jwt-decode';
import { user_fetch } from '../services/user_fetch';
import Cookies from 'js-cookie';

// el componente 
const AuthContext = createContext();

// auth provider esta pensado para envolver toda la aplicacion y darle contexto a todos los hijos (children)
export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  
  // Estados del contexto
  const [Token, setToken] = useState(Cookies.get('Token') || null);
  const [id_user, setid_user] = useState(null);
  const [decodedToken, setdecodedToken] = useState(null);
 
 
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  // useEffect para observar cambios en el Token desde las cookies
  useEffect(() => {
    const currentToken = Cookies.get('Token');
    setToken(currentToken);
    
    if (currentToken) {
      try {
        const decoded = jwtDecode(currentToken);
        setdecodedToken(decoded);
        setid_user(decoded.id_user);
      } catch (error) {
        console.error('Error decoding token:', error);
        setdecodedToken(null);
      }
    }
  }, [Cookies.get('Token')]); // Observa cambios en el Token

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Función de login que configura el Token y actualiza el contexto
const Loggin = async (user_data) => {
  try {
    const apiPost = "http://localhost:8000/api/user/login-user/";
    const apiUser = "http://localhost:8000/api/user/user";
    const response = await login_user(apiPost, user_data);

    if (response) {
      Cookies.set('Token', response.access, { expires: 3, path: '/' });
      Cookies.set('access_token', response.access, { secure: true, sameSite: 'Lax' });
      Cookies.set('refresh_token', response.refresh, { secure: true, sameSite: 'Lax' });

      // Actualizar Token en el estado después de establecer la cookie
      setToken(response.access);

      // Decodificar Token para obtener información de usuario
      const decoded = jwtDecode(response.access);
      setid_user(decoded.id_user);

      // Redireccionar según el rol del usuario
      const user = await user_fetch(apiUser, decoded.id_user);
      if (user && user.id_rol) {
        if (user.id_rol === 1) navigate('administration/students');
        else if (user.id_rol === 2) navigate('/profile/student');
        else if (user.id_rol === 3) navigate('/profile/psychologist');
      }
    }
  } catch (error) {
    console.error('Login error:', error);
    throw new Error('Error en la autenticación');
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
      {console.log("Token in Provider:", Token)} {/* Verificación */}
      {children}
    </AuthContext.Provider>
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

