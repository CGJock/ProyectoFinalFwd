import AWS from "aws-sdk";
import Cookies from "js-cookie";



// Configura AWS S3 con variables de entorno
const bucketName = import.meta.env.VITE_AWS_S3_BUCKET;
const region = import.meta.env.VITE_AWS_REGION;

const s3 = new AWS.S3({
  accessKeyId: import.meta.env.VITE_AWS_ACCESSKEYID,
  secretAccessKey: import.meta.env.VITE_AWS_SECRETACCESSKEY,
  region: region,
});
// Función para subir una imagen a S3
export const uploadImageToS3 = async (file) => {
  const params = {
    Bucket: bucketName,
    Key: file.name, // Puedes usar un identificador único para evitar sobrescribir archivos
    Body: file,
    ContentType: file.type,
    // ACL: 'public-read', 
    // ACL: 'public-read', // Se eliminó esta línea para evitar el error de ACL
  };

  return s3.upload(params).promise();
};

// Función para guardar la imagen del post
export const PostAmazon = async (data, accessToken) => {
  // Primero, sube la imagen a S3
  let imagenUrl = "";

  // Obtener el archivo de imagen
  const imagen = data.table_data.image;

  if (imagen) {
    try {
      const result = await uploadImageToS3(imagen);
      imagenUrl = result.Location; // Obtén la URL de la imagen subida
      data.table_data.image_url = imagenUrl; // Asigna la URL a data.table_data
      console.log("URL de la imagen en S3:", imagenUrl);
    } catch (error) {
      console.error("Error al subir la imagen a S3:", error);
      throw new Error("No se pudo subir la imagen a S3");
    }
  }

  // Verificar que `data.table_data.image` tenga la URL antes de la solicitud
  console.log("Datos del post antes de enviar a la API:", data);
  console.log("Datos del post antes de enviar a la API:", JSON.stringify(data, null, 2));


  try {

    const response = await fetch("http://localhost:8000/api/post/posts/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`, // Agrega el token a los encabezados
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error("Error al guardar el post. Token inválido o expirado.");
    }
    

    const nuevoPost = await response.json();
    console.log("Post guardado:", nuevoPost);
    return nuevoPost;
  } catch (error) {
    console.error("Error en la solicitud:", error);
    throw error;
  }
};
export const deletePost = async (postId) => {
  console.log("ID del post recibido para eliminar:", postId);
  if (!postId) {
    console.error('Post ID is required, but got:', postId);
    throw new Error('Post ID is required');
  }

  try {
    const response = await fetch(`http://localhost:8000/api/post/${postId}/`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${Cookies.get("access_token")}`,
      },
    });

    if (!response.ok) {
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const errorData = await response.json();
        throw new Error(`Error deleting post: ${errorData.detail || 'Unknown error'}`);
      } else {
        throw new Error('Error deleting post: Response is not JSON');
      }
    }

    return { message: 'Post deleted successfully' };
  } catch (error) {
    console.error('Error:', error.message);
    throw error;
  }
};


