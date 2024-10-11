import React, { useState } from 'react';

const PostResponse = ({ post_id }) => {
  const [description, setDescription] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    const responseData = {
      post_id: post_id,
      description: description,
    };

    try {
      const response = await fetch('http://localhost:8000/api/post-responses/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(responseData),
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
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} />

      <button type="submit">Responder</button>
    </form>
  );
};

export default PostResponse;
