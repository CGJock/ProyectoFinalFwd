import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import Cookies from "js-cookie";
import { isTokenExpired, refreshAccessToken } from "../../services/token.js";
import { PostAmazon } from "../../services/callimgur.js";

const PostForm = ({ onPostCreated }) => {
  //obtener los datos del usuario desde el contexto
  const { id_user, Token: access_token } = useAuth() || {};
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  console.log(id_user, access_token);

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validación previa
    if (!id_user || !access_token) {
      console.error("User ID or Token is not defined");
      return;
    }

    let currentAccessToken = access_token;

    // Verificar y refrescar el token si ha expirado
    if (isTokenExpired(currentAccessToken)) {
      await refreshAccessToken();
      currentAccessToken = Cookies.get("access_token");
    }

    const formData = {
      method: "POST",
      table_data: {
        title,
        description,
        id_user,
        image, // Comienza la imagen como null
        replies: [],
      },
      files_info: [
        {
          id: 1,
          nombre: "monica",
        },
      ],
    };
    console.log("formData antes de subir imagen:", formData);
    // Solo se debe establecer la URL de la imagen después de que se suba a S3
    try {
      const subirPost = await PostAmazon(formData, currentAccessToken);
      if (subirPost && subirPost.image_url) {
        // setImage(subirPost.image_url); // Asigna la URL directamente al estado de imagen
        formData.table_data.image = subirPost.image_url; // Asigna la URL a formData
      }
      console.log("Post guardado:", subirPost.image_url);

      if (onPostCreated) {
        onPostCreated(); // Llama a onPostCreated para refrescar la lista de publicaciones
      }
      //borrar los datos del formulario

      setTitle("");
      setDescription("");
      setImage(null);
    } catch (error) {
      console.error("Error creando publicación:", error);
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
      <input type="file" onChange={(e) => setImage(e.target.files[0])} />
      <button type="submit">Crear Publicación</button>
    </form>
  );
};

export default PostForm;
