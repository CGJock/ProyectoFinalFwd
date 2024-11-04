import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import Cookies from "js-cookie";
import { isTokenExpired, refreshAccessToken } from "../../services/token.js";
import { PostAmazon } from "../../services/callimgur.js";
import '../../styles/post-styles.css/post-form.css'



const PostForm = ({ onPostCreated }) => {
  //obtener los datos del usuario desde el contexto
  const { id_user} = useAuth()
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const access_token = Cookies.get('access_token')
  

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
    <>
    <form className="post_form" onSubmit={handleSubmit}>
      <label><h5>Crea una publicacion</h5></label>
      <input className="input_post"
        type="text"
        placeholder="Título"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <div className="contenedor_post_btn">
      <textarea className="text_area_post"
        placeholder="Que piensas?..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input type="file" onChange={(e) => setImage(e.target.files[0])} />
      <button className="btn-post" type="submit">Submit</button>
      </div>
    </form>
    
    <div>
      
    </div>
    </>

    
  );
};

export default PostForm;
