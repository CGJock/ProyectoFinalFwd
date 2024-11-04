
import React, { useState,useEffect } from 'react';
import "../../styles/profileStudient.css";
import { user_fetch } from '../../services/user_fetch.js';
import { useImage } from '../../context/AuthContext.jsx';
import SideModal from './SideModal';
import PostList from "../post-components/PostList.jsx";
import { useAuth } from '../../context/AuthContext.jsx';
import FriendsList from '../post-components/FriendsList.jsx';
import "../../styles/profileStudient-styles/profileStudient.css"
import { useImage } from '../../context/AuthContext.jsx';
import SideModal from './SideModal';
import PostList from "../post-components/PostList.jsx";

// import PostForm from "../Admin-components/post/PostForm";

const ProfileStudent = () => {
    const { id_user } = useAuth();
    const [userData, setuserData] = useState(null); // Estado inicial en null
    const apiPost = "http://localhost:8000/api/user/user"
    



/**
 * Componente que representa el perfil de un estudiante.
 * 
 * Este componente permite al usuario ver su foto de perfil, agregar una nueva foto,
 * escribir y guardar una descripción, y mostrar una lista de amigos y publicaciones.
 */

const ProfileStudent = () => {
    // Obtener la imagen y la función para cambiarla del contexto de autenticación

    const { image, handleImageChange } = useImage() || { image: null, handleImageChange: () => {} };
    //estados locale para manejar  la descripción
    const [tempDescription, setTempDescription] = useState(''); // Descripción temporal del usuario
    const [description, setDescription] = useState('');  // Descripción guardada del usuario
    const [isModalOpen, setModalOpen] = useState(false); // Estado para controlar la apertura del modal
 /**
     * Maneja el cambio de la descripción temporal.
     * 
     * @param {Event} e - El evento del campo de texto.
     */
    const handleTempDescriptionChange = (e) => {
        setTempDescription(e.target.value); // Actualiza la descripción temporal con el valor del campo de texto
    };
     /**
     * Guarda la descripción temporal en la descripción guardada.
     */

    const saveDescription = () => {
        setDescription(tempDescription); // Actualiza la descripción guardada
    };
    /**
     * Alterna el estado de apertura del modal.
     */
    const toggleModal = () => {
        setModalOpen(!isModalOpen);
    };
    useEffect(() => {
        const fetchUserData = async () => {
          if (id_user) { // Verificar que id_user tenga valor antes de llamar a la API
            try {
                const userData = await user_fetch(apiPost,id_user); 
                setuserData(userData); // Actualiza el estado con la información del usuario
                
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
          }
        };
      
        fetchUserData();
      }, [id_user]); 
      
          
      
          // Verifica si User está disponible antes de acceder a sus propiedades
          if (!userData) return <p>Cargando...</p>;

    return (
        <div className="container">
            <h2>Perfil de Usuario</h2>

            <button onClick={toggleModal}>Abrir Menú</button>
            <SideModal isOpen={isModalOpen} onClose={toggleModal} />
            <FriendsList />

            {/* Contenedor de la imagen de perfil */}
            <div className="ProfileStudientContainer">
                <div className="imageContainer">
                    {image ? (
                        <img src={image} alt="Perfil" className="image" /> // Muestra la imagen de perfil si existe
                    ) : (
                        <div className="placeholder">Sin Foto de Perfil</div> // Placeholder si no hay imagen
                    )}
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange} // Usa la función del contexto
                        className="fileInput"
                        id="fileInput"
                        style={{ display: 'none' }}
                    />
                    <button
                        onClick={() => document.getElementById('fileInput').click()} // Abre el selector de archivos al hacer clic
                        className="uploadButton"
                    >
                        Agregar foto de perfil
                    </button>
                </div>

                <PostList /> {/* Componente que muestra las publicaciones del usuario */}

                {/* Añadir la descripción */}
                <div className="infoContainer">
                    <textarea
                        value={tempDescription}
                        onChange={handleTempDescriptionChange}
                        placeholder="Agrega una descripción..."
                        className="textArea"
                    />
                    <button
                        onClick={saveDescription}
                        className="saveDescriptionButton"
                    >
                        Añadir Descripción
                    </button>
                   

                    {/* Descripción guardada */}
                    <div className="savedDescription">
                        <h4>Descripción Guardada:</h4>
                        <p>{description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProfileStudent;
