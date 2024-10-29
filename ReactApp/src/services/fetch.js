
//servicio con metodo post para registrar usuarios
import emailjs from "emailjs-com"; // Ensure you have EmailJS installed
// import jwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';
import { jwtDecode } from "jwt-decode";
import  {isTokenExpired}   from "./token";
import { refreshAccessToken } from "./token";




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

        // verificar si la respuesta es ok
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || "Error al registrarse");
        }

        // inserta la data en json 
        const data = await response.json();
        //console.log(user_data.password)
        alert("Te has registrado correctamente");
        //console.log(data.user_data.email)
        


      const templateParams = {
        email: user_data.email,
        username: user_data.username,
        password: data.password,
        reset_url: user_data.reset_url

      }

        // Send the email using the response data
       await sendEmail(templateParams);
        

        return data; 
    } catch (error) {
        console.error("Error al procesar la data", error);
        throw error; // Rethrow the error to handle it in the calling function
    }
};

const sendEmail = async (templateParams) => {
    console.log(templateParams.email)
  try {
    const response = await emailjs.send(
            "service_73e4kpp", 
            "template_23n6rd4", 
            templateParams, 
            "WaYegO_6CWZJoBg6b"
        );

       
         alert(`Se ha enviado un correo a: ${templateParams.email}`);
            }catch (err)  {
                console.error("Error al enviar el correo:", err);
                alert(`Hubo un error al enviar el correo: ${err.text || err.message}`);
            }
};

//###################################################################################################################################

export const login_user = async(apiPost,user_data) => {
    try {
        const csrftoken = Cookies.get('csrftoken');

        const access_token = Cookies.get('acces_token')

        
        
        // Make the POST request to register the user
        const response = await fetch(apiPost, {
            
            
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken,
                'Authorization': `Bearer ${access_token}`,

                
            },
            body: JSON.stringify(user_data), // User data containing the input values
            credentials:'include'
        });
        
        
        
        
        

        // Check if the response is ok
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || "Error al logearse");
        }
        console.log(response.status);
        

        // Parse the response data
        const data = await response.json();
        Cookies.set('access_token', data.access, { secure: true, sameSite: 'Lax' });
        console.log(user_data)
        
        
        
        alert("Log exitoso");
        return data; // Return the data for further use if needed
    } catch (error) {
        console.error("Failed to process the data", error);
       
        throw error; // Rethrow the error to handle it in the calling function
    }
};





export const get_institutes_data = async (apiUrl) => {
    try {
        let access_token = Cookies.get('access_token'); // Recupera el token
        console.log({'access_token':access_token})

        const token_state =  isTokenExpired(access_token)
        if(token_state) {
           await refreshAccessToken();
           access_token = Cookies.get('access_token')
        }

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

