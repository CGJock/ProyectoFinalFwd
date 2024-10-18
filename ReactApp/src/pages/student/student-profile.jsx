import React from 'react'
import { user_fetch } from '../services/user_fetch';
import { useAuth } from '../../context/AuthContext';
import { useEffect,useState } from 'react';

export const ProfileStudent = () => {
    const {id_user} = useAuth()
    const [User, setUser] = useState(null)
    const apiPost = 'http://localhost:8000/api/user/user'
  
  useEffect(() => {
    const fetchUserData = async () => {
        try {
            const userData = await user_fetch(apiPost, id_user);
            setUser(userData); // Actualiza el estado con la información del usuario
        } catch (error) {
            console.error("Error fetching user data:", error);
       
    };
  };

    fetchUserData();
}, [apiPost, id_user]);




  return (
    <div>
      {User.name}
      </div>
  )
};
