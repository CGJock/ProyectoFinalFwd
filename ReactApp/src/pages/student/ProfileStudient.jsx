import React, { useState, useEffect } from 'react';
import "../../styles/profileStudient.css";
import { saveToLocalStorage, getFromLocalStorage, fileToBase64 } from '../../services/storageUtils';
import SideModal from '../../components/student-components/SideModal';

const ProfileStudient = () => {
    const [image, setImage] = useState(null);
    const [description, setDescription] = useState('');
    const [tempDescription, setTempDescription] = useState('');
    const [isModalOpen, setModalOpen] = useState(false);


    // Cargar la imagen y descripción guardadas en localStorage al cargar la página
    useEffect(() => {
        const savedImage = getFromLocalStorage('profileImage');
        if (savedImage) {
            setImage(savedImage);
        }

        const savedDescription = getFromLocalStorage('profileDescription');
        if (savedDescription) {
            setDescription(savedDescription);
        }
    }, []);

    // Guardar la imagen en localStorage
    useEffect(() => {
        if (image) {
            saveToLocalStorage('profileImage', image);
        }
    }, [image]);

    // Guardar la descripción en localStorage
    useEffect(() => {
        if (description) {
            saveToLocalStorage('profileDescription', description);
        }
    }, [description]);

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            const base64Image = await fileToBase64(file);
            setImage(base64Image);
        }
    };

    const handleTempDescriptionChange = (e) => {
        setTempDescription(e.target.value);
    };

    const saveDescription = () => {
        setDescription(tempDescription); 
    };
    const toggleModal = () => {
        setModalOpen(!isModalOpen);
    };
    

    return (
        <div className="container">
            <h2>Perfil de Usuario</h2>
            <button onClick={toggleModal}>Abrir Menú</button>
            <SideModal isOpen={isModalOpen} onClose={toggleModal} />
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
                        onChange={handleImageChange}
                        className="fileInput"
                        id="fileInput"
                        style={{ display: 'none' }}
                    />
                    <button
                        onClick={() => document.getElementById('fileInput').click()}
                        className="uploadButton"
                    >
                        agregar foto de perfil
                    </button>
                </div>
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
                <div className="savedDescription">
                    <h4>Descripción Guardada:</h4>
                    <p>{description}</p>
                </div>
            </div>

        </div>
        
    );
};

export default ProfileStudient;
