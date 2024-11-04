import React, { useState,useEffect } from 'react';
import "../../styles/profileStudient.css";
import { user_fetch } from '../../services/user_fetch.js';
import { useImage } from '../../context/AuthContext.jsx';
import SideModal from './SideModal';
import PostList from "../post-components/PostList.jsx";
import { useAuth } from '../../context/AuthContext.jsx';
// import PostForm from "../Admin-components/post/PostForm";

const ProfileStudent = () => {
    const { id_user } = useAuth();
    const [userData, setuserData] = useState(null); // Estado inicial en null
    const apiPost = "http://localhost:8000/api/user/user"
    
    const { image, handleImageChange } = useImage() || { image: null, handleImageChange: () => {} };
    const [tempDescription, setTempDescription] = useState('');
    const [description, setDescription] = useState('');
    const [isModalOpen, setModalOpen] = useState(false);

    const handleTempDescriptionChange = (e) => {
        setTempDescription(e.target.value);
    };

    const saveDescription = () => {
        setDescription(tempDescription);
    };

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

            {/* Contenedor de la imagen de perfil */}
            <div className="ProfileStudientContainer">
                <div className="imageContainer">
                    {image ? (
                        <img src={image} alt="Perfil" className="image" />
                    ) : (
                        <div className="placeholder">Sin Foto de Perfil</div>
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
                        onClick={() => document.getElementById('fileInput').click()}
                        className="uploadButton"
                    >
                        Agregar foto de perfil
                    </button>
                </div>

                <PostList />
                {/* <PostForm /> */}

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
