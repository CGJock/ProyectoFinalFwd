import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import Cookies from 'js-cookie'; 
import { isTokenExpired, refreshAccessToken } from '../../services/token.js';

const PostForm = ({ onPostCreated }) => {
  const { id_user, access_token } = useAuth() || {}; 
  const [title, setTitle] = useState(''); 
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Verificar que el ID del usuario esté definido
    if (!id_user) {
      console.error('User ID is not defined');
      return; // Manejo de error si no hay ID de usuario
    }

    // Crear el FormData para enviar los datos de la publicación
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    if (image) {
      formData.append('image', image);
    }
    formData.append('id_user', id_user); // Usamos el ID del usuario desde el contexto

    try {
      let currentAccessToken = access_token; // Asignamos el token actual

      // Verificar si el token está expirado
      if (isTokenExpired(currentAccessToken)) {
        console.log("El token ha expirado, intentando refrescarlo...");
        await refreshAccessToken(); // Refresca el token

        // Después de refrescar, obtén el nuevo token desde las cookies
        currentAccessToken = Cookies.get('access_token'); // Actualiza el token
        console.log("Nuevo token:", currentAccessToken);
      }

      // Realizar la solicitud para crear la publicación con el token actualizado
      const response = await fetch("http://localhost:8000/api/post/posts/", {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${currentAccessToken}`, // Usa el token actualizado
        },
      });

      // Manejo de la respuesta
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error en la solicitud: ${errorData.detail || 'Sin mensaje de error'}`);
      }

      const data = await response.json();
      console.log('Publicación creada:', data);
  


      // Limpiar el formulario después de crear la publicación
      setTitle(''); 
      setDescription(''); 
      setImage(null); 

      // Llamar la función de actualización de publicaciones si está definida
      if (onPostCreated) {
        onPostCreated(); 
      }
    } catch (error) {
      console.error('Error creando publicación:', error);
      console.log(Cookies.get('refresh_token'));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Descripción"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
      />
      <button type="submit">Crear Publicación</button>
    </form>
  );
};

export default PostForm;
