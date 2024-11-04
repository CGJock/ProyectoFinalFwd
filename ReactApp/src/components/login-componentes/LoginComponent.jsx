import { useState } from "react";
import { useAuth } from '../../context/AuthContext';

export const LoginComponent = () => {
  const [username, setUsername] = useState(''); // Use camelCase for state variables
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const { Loggin } = useAuth(); // Ensure Loggin is defined in your AuthContext

  const handleLogin = async () => {
    const user_data = { username, password };

    try {
      await Loggin(user_data); // Call the Loggin function
      console.log("Usuario autenticado con éxito");
    } catch (error) {
      console.error("Error en el login:", error.message);
      setErrorMessage("Error en las credenciales de usuario");
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
        onChange={(e) => setUsername(e.target.value)} // Match state setter name
      />
      <label>Contraseña</label>
      <input
        type="password"
        placeholder="Ingrese contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)} // Match state setter name
      />
      <button onClick={handleLogin}>Login</button>
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};
