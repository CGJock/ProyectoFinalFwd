import { useState } from "react";
import { useAuth } from '../../context/AuthContext';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';
import ErrorIcon from '@mui/icons-material/Error';
import InfoIcon from '@mui/icons-material/Info';
import { IconButton } from '@mui/material';  // Importamos IconButton para los íconos
import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';  // Íconos para el slideshow
import classNames from 'classnames';
import '../../styles/utilities-styles/login.css';

import icon1 from '../../assets/img/icon1.jpg';
import icon2 from '../../assets/img/icon2.jpg';

export const LoginComponent = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [infoMessage, setInfoMessage] = useState('');
  
  // Estado para controlar la imagen activa en el slideshow
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const { Loggin } = useAuth();

  // Lista de imágenes
  const images = [icon1, icon2];

  const handleLogin = async () => {
    if (!username || !password) {
      setInfoMessage("Por favor, complete ambos campos para continuar.");
      setErrorMessage('');
      setSuccessMessage('');
      return;
    }

    setInfoMessage('');

    const user_data = { username, password };

    try {
      await Loggin(user_data);
      setSuccessMessage("Login exitoso. Bienvenido!");
      setErrorMessage('');
    } catch (error) {
      console.error("Error en el login:", error.message);
      setErrorMessage("Usuario o contrasenna incorrectoss");
      setSuccessMessage('');
    }
  };

  // Función para cambiar la imagen del slideshow
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="login-container">
      <div className={classNames("login-form", { "form-left": true })}>
        <h1>Login</h1>
        <label>Correo Electrónico</label>
        <input className="login-input"
          type="text"
          placeholder="Ingrese correo electrónico"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label>Contraseña</label>
        <input className="login-input"
          type="password"
          placeholder="Ingrese contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="login-btn" onClick={handleLogin}>Login</button>

        {/* Mostrar alertas basadas en los mensajes de estado */}
        {infoMessage && (
          <Alert icon={<InfoIcon fontSize="inherit" />} severity="info">
            {infoMessage}
          </Alert>
        )}

        {successMessage && (
          <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
            {successMessage}
          </Alert>
        )}

        {errorMessage && (
          <Alert icon={<ErrorIcon fontSize="inherit" />} severity="error">
            {errorMessage}
          </Alert>
        )}
      </div>

      {/* Slideshow a la derecha */}
      <div className={classNames("slideshow", { "slideshow-right": true })}>
        <div className="slide">
          <img src={images[currentImageIndex]} alt={`Slide ${currentImageIndex + 1}`} />
        </div>

        {/* Botones minimalistas para el slideshow */}
        <div className="slideshow-controls">
          <IconButton onClick={prevImage} color="primary">
            <ArrowBackIos />
          </IconButton>
          <IconButton onClick={nextImage} color="primary">
            <ArrowForwardIos />
          </IconButton>
        </div>
      </div>
    </div>
  );
};
