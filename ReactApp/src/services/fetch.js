
//servicio con metodo post para registrar usuarios
import emailjs from "emailjs-com"; // Ensure you have EmailJS installed

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
            throw new Error(errorData.detail || "Error in registration");
        }

        // Parse the response data
        const data = await response.json();
        alert("User registered successfully");

        // Send the email using the response data
        sendEmail(data.email, data.username, data.password, data.reset_url);

        return data; // Return the data for further use if needed
    } catch (error) {
        console.error("Failed to process the data", error);
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
            },
            (err) => {
                console.error("Error sending email", err);
            }
        );
};

//###################################################################################################################################

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


