import React, { useState } from 'react';

const PostForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    if (image) {
      formData.append('image', image);
    }

    try {
      const response = await fetch("http://localhost:8000/api/post/posts/", {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      console.log('Publicación creada:', data);
    } catch (error) {
      console.error('Error creando publicación:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Crear Publicación</h2>
      <label>Título</label>
      <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />

      <label>Descripción</label>
      <textarea value={description} onChange={(e) => setDescription(e.target.value)} />

      <label>Imagen (opcional)</label>
      <input type="file" onChange={(e) => setImage(e.target.files[0])} />

      <button type="submit">Publicar</button>
    </form>
  );
};

export default PostForm;
