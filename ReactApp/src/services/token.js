import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";

 

export const isTokenExpired = (access_token) => {
    if (!access_token) return true; // Si no hay token, se considera expirado
  
    try {
      const decodedToken = jwtDecode(access_token); // Decodifica el JWT sin verificar su firma
      const currentTime = Date.now() / 1000; // Tiempo actual en segundos (el JWT usa segundos)
      return decodedToken.exp < currentTime; // Compara si ya expiró
    } catch (error) {
      console.error('Error decoding token:', error);
      return true; // En caso de error, se considera expirado por seguridad
    }
  };

export const refreshAccessToken = async () => {
    try {
      let access_token = Cookies.get('access_token');
        const response = await fetch('http://localhost:8000/api/user/token/refresh/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`,
            },
            
            credentials: 'include'
        });

        if (!response.ok) throw new Error("Error al refrescar el token.");

        const data = await response.json();
        Cookies.set('access_token', data.access); // Guarda el nuevo token
        console.log("Access token refrescado exitosamente.");

    } catch (error) {
        console.error("Failed to refresh access token", error);
        throw error;
    }
};