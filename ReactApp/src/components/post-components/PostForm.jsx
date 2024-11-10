import React, { useState } from "react";
import { useAuth } from "../../context/AuthContext.jsx";
import Cookies from "js-cookie";
import { isTokenExpired, refreshAccessToken } from "../../services/token.js";
import { PostAmazon } from "../../services/callImgur.js";
import '../../styles/post-styles.css/post-form.css'

const PostForm = ({ onPostCreated }) => {
  // Obtener los datos del usuario desde el contexto
  const { id_user,UserData } = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const access_token = Cookies.get('access_token');

  console.log(UserData)
  
  // Función para manejar el envío del formulario
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
        image, // La imagen que será subida
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

    try {
      const subirPost = await PostAmazon(formData, currentAccessToken);
      if (subirPost && subirPost.image_url) {

        setImage(subirPost.image_url)
        // Asignar la URL de la imagen subida a formData
        formData.table_data.image = subirPost.image_url;

      }
      console.log("Post guardado:", subirPost.image_url);

      if (onPostCreated) {
        onPostCreated(); // Llama a onPostCreated para refrescar la lista de publicaciones
      }

      // Limpiar el formulario
      setTitle("");
      setDescription("");
      setImage(null);
    } catch (error) {
      console.error("Error creando publicación:", error);
    }
  };

  // Función para mostrar la imagen seleccionada
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file)); // Mostrar la imagen seleccionada
    }
  };

  return (
    <div className="post-form-container">
      <form className="post_form" onSubmit={handleSubmit}>
        <h5>Crea una publicación</h5>
        
        <input
          className="input_post"
          type="text"
          placeholder="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        
        <textarea
          className="text_area_post"
          placeholder={`¿Algo para compartir,${UserData.username} ?`}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        
        <input type="file" onChange={handleImageChange} />
        
        {image && (
          <div className="image-preview">
            <img src={image} alt="Vista previa" className="imgPost" />
          </div>
        )}

        <button className="btn-post" type="submit">Submit</button>
      </form>
    </div>
  );
};

export default PostForm;
