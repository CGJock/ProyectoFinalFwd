
//servicio con metodo post para registrar usuarios
import emailjs from "emailjs-com"; // Ensure you have EmailJS installed
// import jwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';

export const postRegister = async (apiPost, user_data) => {
    try {
        const csrftoken = Cookies.get('csrftoken');
        const access_token = Cookies.get('access_token')
        // Make the POST request to register the user
        const response = await fetch(apiPost, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken,
                'Authorization': `Bearer ${access_token}`, // Incluye el access token
            },
            credentials: 'include',
            body: JSON.stringify(user_data) // User data containing the input values
        });

        // Check if the response is ok
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || "Error al registrarse");
        }

        // Parse the response data
        const data = await response.json();
        alert("Te has registrado correctamente");

      

        // Send the email using the response data
        sendEmail(data.email, data.username, data.password, data.reset_url);
        

        return data; 
    } catch (error) {
        console.error("Error al procesar la data", error);
        throw error; // Rethrow the error to handle it in the calling function
    }
};

const sendEmail = (email, username, password, reset_url) => {
    const templateParams = {
        to_email: email,
        user_name: username,
        user_password: password,
        reset_url: reset_url,
    };
    console.log({'template': templateParams})

    emailjs
        .send(
            "service_73e4kpp", 
            "template_23n6rd4", 
            templateParams, 
            "WaYegO_6CWZJoBg6b"
        )
        .then(
            (response) => {
                console.log("Email enviado con éxito:", response.status, response.text);
                alert(`Se ha enviado un correo a: ${email}`);
            },
            (err) => {
                console.error("Error al enviar el correo:", err);
                alert(`Hubo un error al enviar el correo: ${err.text || err.message}`);
            }
        );
};

//###################################################################################################################################

export const login_user = async(apiPost,user_data) => {
    try {
        const csrftoken = Cookies.get('csrftoken');
        
        // Make the POST request to register the user
        const response = await fetch(apiPost, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken
            },
            body: JSON.stringify(user_data), // User data containing the input values
            credentials:'include'
        });
        
        

        // Check if the response is ok
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || "Error al logearse");
        }

        // Parse the response data
        const data = await response.json();
        Cookies.set('access_token', data.access, { secure: true, sameSite: 'Lax' });
        
        
        alert("Log exitoso");
        return data; // Return the data for further use if needed
    } catch (error) {
        console.error("Failed to process the data", error);
        throw error; // Rethrow the error to handle it in the calling function
    }
};

export const refreshAccessToken = async () => {
    try {
        const refresh_token = Cookies.get('refresh_token'); // Obtén el refresh token de las cookies

        if (!refresh_token) throw new Error("No hay refresh token disponible.");

        const response = await fetch('http://localhost:8000/api/user/token/refresh/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refresh: refresh_token }),
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


export const get_institutes_data = async (apiUrl) => {
    try {
        const access_token = Cookies.get('access_token'); // Recupera el token
        console.log({'access_token':access_token})

        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${access_token}`, // Incluye el access token
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || "Error al obtener los datos.");
        }

        const data = await response.json();
        console.log(data);
        return data;

    } catch (error) {
        console.error("Error en el servidor", error);
        throw error;
    }
};

