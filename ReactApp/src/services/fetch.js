
//servicio con metodo post para registrar usuarios
import emailjs from "emailjs-com"; // Ensure you have EmailJS installed
// import jwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';

export const postRegister = async (apiPost, user_data) => {
    try {
        // Make the POST request to register the user
        const response = await fetch(apiPost, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
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

    emailjs
        .send("service_73e4kpp", "template_23n6rd4", templateParams, "WaYegO_6CWZJoBg6b")
        .then(
            (response) => {
                console.log("Email sent successfully", response.status, response.text);
                alert('se ha enviado un correo con tu conta a',  email);

            },
            (err) => {
                console.error("Error sending email", err);
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
        console.log(response)

        // Check if the response is ok
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || "Error al logearse");
        }

        // Parse the response data
        const data = await response.json();
        console.log(data)
        
        alert("Log exitoso");
        return data; // Return the data for further use if needed
    } catch (error) {
        console.error("Failed to process the data", error);
        throw error; // Rethrow the error to handle it in the calling function
    }
};



export const get_institutes_data = async(apiUrl) => {
  try{
      const response = await fetch(apiUrl);
      const data = await response.json()
      console.log(data)
      return data
    
  } catch(error){
    console.log("error en el servidor")
  }
  
}


