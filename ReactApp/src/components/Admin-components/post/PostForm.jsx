import React, { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';

const PostForm = ({ onPostCreated }) => {
  const { User } = useAuth() || {}; 
  const [title, setTitle] = useState(''); 
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Verificamos que el User ID esté definido
    if (!User) {
      console.error('User ID is not defined');
      return; // Manejo de error si no hay ID de usuario
    }

    // Creamos el FormData para enviar los datos de la publicación
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    if (image) {
      formData.append('image', image);
    }
    formData.append('id_user', User); // Usamos el ID del usuario desde el contexto

    try {
      const response = await fetch("http://localhost:8000/api/post/posts/", {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }

      const data = await response.json();
      console.log('Publicación creada:', data);

      // Limpiar el formulario
      setTitle(''); //limpiar el titulo del form
      setDescription(''); //limpiar la descripción del form
      setImage(null); // Limpiar el estado de la imagen

      // Llamar la función para actualizar las publicaciones
      if (onPostCreated) {
        onPostCreated(); 
      }
    } catch (error) {
      console.error('Error creando publicación:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Crear Publicación</h2>
      <label>Título</label>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />

      <label>Descripción</label>
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />

      <label>Imagen (opcional)</label>
      <input type="file" onChange={(e) => setImage(e.target.files[0])} />
{/* btn para hacer la publicacion */}
      <button type="submit">Publicar</button>
    </form>
  );
};

export default PostForm;
