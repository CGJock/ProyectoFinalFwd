import React, { useState, useEffect } from "react";
import PostForm from "./PostForm";
import Cookies from "js-cookie";
import { deletePost } from "../../services/callImgur.js";
import "../../styles/profileStudient-styles/postList.css";
const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Función para cargar las publicaciones
  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);

      // Obtén el token de las cookies
      const token = Cookies.get("access_token");

      const response = await fetch("http://localhost:8000/api/post/posts/", {
        headers: {
          Authorization: `Bearer ${token}`, // Incluye el token en el encabezado
          Accept: "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Error al cargar publicaciones");
      }

      const data = await response.json();
      console.log(data); // Verifica que 'image_url' esté presente

      setPosts(data);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setError("No se pudieron cargar las publicaciones");
    } finally {
      setLoading(false);
    }
  };
  // Función para eliminar una publicación
  const handleDelete = async (postId) => {
    try {
      await deletePost(postId); // Llama a deletePost para eliminar la publicación
      // Actualiza la lista de publicaciones después de eliminar
      fetchPosts();
    } catch (error) {
      console.error("Error eliminando la publicación:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="posts-container">
      <div className="post-list">
        <PostForm onPostCreated={fetchPosts} />
        <h3>Publicaciones</h3>
        {/* Pasamos la función de actualización */}
        {/* Mostrar el estado de carga */}
        {loading ? (
          <p className="loading">Cargando publicaciones...</p>
        ) : error ? (
          <p className="error">{error}</p>
        ) : posts.length > 0 ? (
          posts.map((post, index) => (
            <div key={`${post.post_id || post.id}-${index}`} className="post">
              {" "}
              {/* Key único combinando post_id e índice */}
              <h2>{post.title}</h2>
              <p>{post.description}</p>
              {post.image_url && (
                <img
                  src={post.image_url}
                  alt="Post"
                  style={{ width: "100%", maxWidth: "500px", height: "auto" }}
                />
              )}
              <p>Comentarios: {post.comment_count}</p>
              <button onClick={() => handleDelete(post.id)}>Eliminar</button>
            </div>
          ))
        ) : (
          <p>No hay publicaciones disponibles</p>
        )}
      </div>
    </div>
  );
};

export default PostList;
