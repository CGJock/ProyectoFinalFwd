import React, { useState, useEffect } from 'react';
import PostForm from './PostForm';

const PostList = () => {
  const [posts, setPosts] = useState([]);

  // Función para cargar las publicaciones
  const fetchPosts = () => {
    fetch("http://localhost:8000/api/post/posts/")
      .then(response => response.json())
      .then(data => {
        setPosts(data);
      })
      .catch(error => {
        console.error('Error fetching posts:', error);
      });
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      <h1>Publicaciones</h1>
      <PostForm onPostCreated={fetchPosts} /> {/* Pasamos la función de actualización */}
      {/* Mostrar publicaciones */}
      {posts.length > 0 ? (
        posts.map(post => (
          <div key={post.post_id}>
            <h2>{post.title}</h2>
            <p>{post.description}</p>
            {post.image_url && <img src={post.image_url} alt="Post" />}
            <p>Comentarios: {post.comment_count}</p>
          </div>
        ))
      ) : (
        <p>No hay publicaciones disponibles</p>
      )}
    </div>
  );
}

export default PostList;
