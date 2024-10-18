import React, { useEffect, useState } from 'react';
import { user_fetch } from '../../services/user_fetch';
import { useAuth } from '../../context/AuthContext';

export const ProfileStudent = () => {
    const { id_user } = useAuth();
    const [userData, setuserData] = useState(null); // Estado inicial en null
    const apiPost = "http://localhost:8000/api/user/user"
useEffect(() => {
  const fetchUserData = async () => {
    if (id_user) { // Verificar que id_user tenga valor antes de llamar a la API
      try {
          const userData = await user_fetch(apiPost,id_user); 
          setuserData(userData); // Actualiza el estado con la información del usuario
          
      } catch (error) {
          console.error("Error fetching user data:", error);
      }
    }
  };

  fetchUserData();
}, [id_user]); 

    

    // Verifica si User está disponible antes de acceder a sus propiedades
    if (!userData) return <p>Cargando...</p>;

    return (
        <div>
          <p>otras dfsafas</p>
            <p>Nombre: {userData.first_name}</p>
        </div>
    );
};
