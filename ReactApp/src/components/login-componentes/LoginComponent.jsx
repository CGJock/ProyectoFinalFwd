import { useState } from "react"
import { postRegister } from "../../services/fetch"
import {  useNavigate } from "react-router-dom";
import { useAuth } from '../../context/AuthContext';

export const LoginComponent = () => {
  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');
  const [errorMessage, seterrorMessage] = useState('');
  const { Loggin } = useAuth(); // Obtén la función Loggin desde el contexto

  const handleLogin = async () => {
    const user_data = { username, password };

    try {
      await Loggin(user_data);
      console.log("Usuario autenticado con éxito");
    } catch (error) {
      console.error("Error en el login:", error.message);
      seterrorMessage("Error en las credenciales de usuario");
    }
  };

  return (
    <div className="contenedor_login">
      <h1>Login</h1>
      <label>Correo Electrónico</label>
      <input
        type="text"
        placeholder="Ingrese correo electrónico"
        value={username}
        onChange={(e) => setusername(e.target.value)}
      />
      <label>Contraseña</label>
      <input
        type="password"
        placeholder="Ingrese contraseña"
        value={password}
        onChange={(e) => setpassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};