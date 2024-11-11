import React, { useEffect, useState } from 'react';
import { GET } from '../../services/crud';
import { useAuth } from '../../context/AuthContext';
import '../../styles/post-styles.css/users-to-follow.css'

export const UsersToFollow = () => {
    const [Data, setData] = useState([]);
    const url_link = 'http://localhost:8000/api/post/friendstofollow/';
    const { id_user } = useAuth();
    
    // Función para obtener índices aleatorios
    const getRandomIndexes = (array, count) => {
        let indexes = [];
        while (indexes.length < count) {
            const randomIndex = Math.floor(Math.random() * array.length);
            if (!indexes.includes(randomIndex)) {
                indexes.push(randomIndex);
            }
        }
        return indexes;
    };

    useEffect(() => {
        const fetch_data = async () => {
            try {
                const response = await GET(`${url_link}${id_user}`);
                console.log('Datos recibidos:', response); // Verifica los datos recibidos

                if (response && response.data) {
                    let data = response.data;

                    // Si hay más de 5 usuarios, seleccionamos aleatoriamente 5
                    if (data.length >= 5) {
                        const randomIndexes = getRandomIndexes(data, 5);
                        const randomData = randomIndexes.map(index => data[index]);
                        setData(randomData);
                    } else {
                        // Si hay menos de 5, mostramos todos los usuarios
                        setData(data);
                    }
                }
            } catch (error) {
                console.error('Error al obtener los datos:', error);
            }
        };

        fetch_data();
    }, [id_user]);

  return (
    <>
      <h3>Estos Usuarios te podrían interesar</h3>
      <div className="friend-list-container">
        {Data.length > 0 ? (
          Data.map((user) => (
            <div className="friend-card" key={user.id_user}>
              <div >{user.name}</div>
              <div className='card-img'>
                <img
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(
                    user.username
                  )}&rounded=true&background=random`}
                  alt={`Avatar of ${user.username}`}
                />
              </div>
              <div className='card-username'>{user.username}</div>
              <div>
                <button key={user.id_user}>Seguir Usuario</button>
              </div>
            </div>
          ))
        ) : (
          <p>No hay datos para mostrar.</p>
        )}
      </div>
    </>
  );
};
