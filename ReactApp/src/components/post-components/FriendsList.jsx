
import React, { useEffect, useState } from 'react';
import { fetchFriends, addFriend, removeFriend } from '../../services/friendPostsService';
import { useAuth } from '../../context/AuthContext';

const FriendsList = () => {
  const { id_user } = useAuth(); // Obtener id_user directamente
  const [friends, setFriends] = useState([]); //almacena la lista de amigos y la actualiza
  const [loading, setLoading] = useState(true); //indica que datos estan en proceso de cargarse

  useEffect(() => {
    if (id_user) { // Verificar si id_user está disponible
      //funcion asincrona que obtiene la lista de amigos del usuario desde la api y actualiza su estado
      const loadFriends = async () => {
        try {
          const friendsData = await fetchFriends(id_user);
          setFriends(friendsData);
          //si la peticion falla, muestra el error en consola
        } catch (error) {
          console.error("Error al cargar la lista de amigos:", error);
        } finally {
          setLoading(false);
        }
      };
      loadFriends();
    } else {
      console.error("id_user no está definido en el contexto");
    }
  }, [id_user]);
  //llama a addfriend por medio de pasat id_user y friendId si todo sale bien agrega un nuevo amigo al estado friends

  const handleAddFriend = async (friendId) => {
    try {
      const newFriend = await addFriend(id_user, friendId);
      setFriends((prevFriends) => [...prevFriends, newFriend]);
      //si la peticion falla, muestra el error en consola
    } catch (error) {
      console.error("Error al agregar amigo:", error);
    }
  };
//llama a removeFriend con id_user y friend_id al completarse actualiza el estado
//de friend pero excluyendo al que se elimino
  const handleRemoveFriend = async (friendId) => {
    try {
      await removeFriend(id_user, friendId);
      setFriends((prevFriends) => prevFriends.filter((friend) => friend.id !== friendId));
      //si la peticion falla, muestra el error en consola
    } catch (error) {
      console.error("Error al eliminar amigo:", error);
    }
  };
//renderizado miestras loading es true se muestra como mensaje de carga
  if (loading) {
    return <p>Cargando amigos...</p>;
  }

  return (
    <div>
      <h2>Lista de Amigos</h2>
      <ul>
        {friends.map((friend) => (
          <li key={friend.id}>
            {friend.username}
            {/* Botón de eliminar solo si ya es amigo */}
            <button onClick={() => handleRemoveFriend(friend.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
      {/* Agregar campo para buscar o ingresar un nuevo amigo */}
      <input type="number" placeholder="ID de nuevo amigo" onChange={(e) => setNewFriendId(e.target.value)} />
      <button onClick={() => handleAddFriend(newFriendId)}>Agregar amigo</button>
    </div>
  );
};

export default FriendsList;