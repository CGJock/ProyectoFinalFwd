import React, { useState } from 'react';
/**
 * Componente para responder a una publicación.
 * 
 * @param {Object} props - Props del componente.
 * @param {number} props.post_id - ID de la publicación a la que se está respondiendo.
 * 
 * Este componente permite al usuario enviar una respuesta a una publicación
 * mediante un formulario con un campo de texto.
 */

const PostResponse = ({ post_id }) => {
    // Estado local para manejar la descripción de la respuesta
  const [description, setDescription] = useState('');
  /**
   * Maneja el evento de envío del formulario.
   * 
   * @param {Event} event - El evento del formulario.
   */

  const handleSubmit = async (event) => {
    event.preventDefault(); // Previene la recarga de la página al enviar el formulario

    const responseData = {
      post_id: post_id,
      description: description,
    };
// Realiza una petición POST al endpoint de respuestas de publicaciones
    try {
      const response = await fetch('http://localhost:8000/api/post-responses/', {

        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(responseData),  // Datos de la respuesta en formato JSON
      });
      const data = await response.json();
      console.log('Respuesta creada:', data);
    } catch (error) {
      console.error('Error creando respuesta:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Responder a la Publicación</h2>
       {/* Campo de texto para la respuesta */}
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} />

      <button type="submit">Responder</button>
    </form>
  );
};

export default PostResponse;
