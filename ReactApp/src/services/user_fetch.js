import Cookies from 'js-cookie';

export const user_fetch = async (apiPost, user_id) => {
    try {
        const csrftoken = Cookies.get('csrftoken');
        const access_token = Cookies.get('access_token'); // Recupera el access token actual

        const url = `${apiPost}/${user_id}`

        // Primera solicitud para logear
        let response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': csrftoken,
                'Authorization': `Bearer ${access_token}`, // Incluye el access token
            },
            credentials: 'include',
        });

        // Si el access token está vencido, intenta refrescarlo
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            console.log("usuario encontrado");
            return data; // Devuelve los datos para su uso posterior
        } else {
            const errorData = await response.json();
            console.error("Error en la respuesta", errorData);
            throw new Error(errorData.message || 'Error desconocido');
        } 
        }catch (error){
            console.error("Failed to process the data", error);
        throw error }
    }