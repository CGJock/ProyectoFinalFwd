import Cookies from 'js-cookie';

export const POST = async(apiPost,user_data) => {
    try {
        const csrftoken = Cookies.get('csrftoken');
        const access_token =  Cookies.get('access_token')
        
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
            throw new Error(errorData.detail || "Error al procesar la data");
        }

        // Parse the response data
        const data = await response.json();
       
        
        
        alert("datos enviados exitosamente");
        return data; // Return the data for further use if needed
    } catch (error) {
        console.error("Fallo al procesar la data", error);
        throw error; // Rethrow the error to handle it in the calling function
    }
};


export const GET = async(apiPost) => {
    try {
        const csrftoken = Cookies.get('csrftoken');
        const access_token = Cookies.get('access_token')
        
        // Make the POST request to register the user
        const response = await fetch(apiPost, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken,
                'Authorization': `Bearer ${access_token}`, // Incluye el access token
            }, // User data containing the input values
            credentials:'include'
        });
        
        
        // Check if the response is ok
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || "Error al procesar la data");
        }

        // Parse the response data
        const data = await response.json()
        return data; // Return the data for further use if needed
    } catch (error) {
        console.error("Fallo al procesar la data", error);
        throw error; // Rethrow the error to handle it in the calling function
    }
};

export const GETWLINK = async(url_link,id_item) => {
    try {
        const csrftoken = Cookies.get('csrftoken');
        const access_token = Cookies.get('access_token')
        
        // Make the POST request to register the user
        const response = await fetch(apiPost, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken,
                'Authorization': `Bearer ${access_token}`, // Incluye el access token
            }, // User data containing the input values
            credentials:'include'
        });
        
        
        // Check if the response is ok
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || "Error al procesar la data");
        }

        // Parse the response data
        const data = await response.json()
        return data; // Return the data for further use if needed
    } catch (error) {
        console.error("Fallo al procesar la data", error);
        throw error; // Rethrow the error to handle it in the calling function
    }
};

export const PUT = async(updated_data,edit_link) => {
    try{
        const csrftoken = Cookies.get('csrftoken');
        const access_token = Cookies.get('access_token')
        const response = await fetch(edit_link, {
           method: 'PATCH',
           headers:{
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken,
            'Authorization': `Bearer ${access_token}`, // Incluye el access token
           } ,
           body: JSON.stringify(updated_data),
           credentials: 'include'
        })
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || "Error al procesar la data");
        }

        // Parse the response data
        const data = await response.json()
        return data; // Return the data for further use if needed
    } catch (error) {
        console.error("Fallo al procesar la data", error);
        throw error; // Rethrow the error to handle it in the calling function
    }
    }

