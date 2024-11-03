import axios from 'axios';
import Cookies from 'js-cookie';

const API_BASE_URL = "http://localhost:8000/api/user"; 

// /**
//  * Obtener la lista de todos los usuarios.
//  *
//  * @returns {Promise<Object[]>} - Una promesa que resuelve a la lista de usuarios.
//  * 
//  */
// export const fetchAllUsers = async () => {
//   try {
//     const response = await axios.get(`${API_BASE_URL}/all_users/`, {
//       headers: {
//         Authorization: `Bearer ${Cookies.get("access_token")}`,
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Error al obtener todos los usuarios:", error);
//     throw error;
//   }
// };

/**
 * Obtener la lista de amigos de un usuario.
 *
 * @param {number} id_user - ID del usuario para obtener su lista de amigos.
 * @returns {Promise<Object[]>} - Una promesa que resuelve a la lista de amigos.
 * @throws {Error} - Lanza un error si la solicitud falla.
 */
export const fetchFriends = async (id_user) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/${id_user}/friends/posts/`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("access_token")}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error al obtener la lista de amigos:", error);
      console.log("user id que se recibe", id_user);
      console.log("Token de autenticación:", Cookies.get("access_token"));
      // console.error("Error al obtener la lista de amigos:", error.response ? error.response.data : error.message);


      
      throw error;
    }
  };


/**
 * Obtener los posts de los amigos de un usuario.
 *
 * @param {number} id_user - ID del usuario para obtener los posts de sus amigos.
 * @returns {Promise<Object[]>} - Una promesa que resuelve a la lista de posts de amigos.
 * @throws {Error} - Lanza un error si la solicitud falla.
 */

export const fetchFriendsPosts = async (id_user) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${id_user}/friends/posts/`, {
      headers: {
        Authorization: `Bearer ${Cookies.get("access_token")}`,
      },
    });
 return response.data.friends_posts;
     } catch (error) {
    if (error.response) {
      console.error(`Error ${error.response.status}: ${error.response.data}`);
    } else {
      console.error("Error al obtener los posts de amigos:", error.message);
    }
    throw error;
  }
};



/**
 * Agregar un nuevo amigo.
 *
 * @param {number} id_user - ID del usuario que quiere agregar un amigo.
 * @param {number} friendId - ID del usuario que se agregará como amigo.
 * @returns {Promise<Object>} - Una promesa que resuelve a la lista actualizada de amigos.
 * @throws {Error} - Lanza un error si la solicitud falla.
 */
export const addFriend = async (id_user, friendId) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/${id_user}/friends/`,
      { friend_id: friendId },
      {
        headers: {
          Authorization: `Bearer ${Cookies.get("access_token")}`,
        },
      }
    );
    return response.data.friends_posts;
  } catch (error) {
    console.error("Error al agregar amigo:", error);
    throw error;
  }
};

/**
 * Eliminar un amigo.
 *
 * @param {number} id_user - ID del usuario que desea eliminar un amigo.
 * @param {number} friendId - ID del amigo que se eliminará.
 * @returns {Promise<Object>} - Una promesa que resuelve a un mensaje de éxito.
 * @throws {Error} - Lanza un error si la solicitud falla.
 */
export const removeFriend = async (id_user, friendId) => {
    try {
      await axios.delete(
        `${API_BASE_URL}/${id_user}/friends/${friendId}/`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("access_token")}`,
          },
        }
      );
      return { message: 'Amigo eliminado exitosamente' }; // Mensaje de éxito
    } catch (error) {
      console.error("Error al eliminar amigo:", error);
      throw error; 
    }
  };
  