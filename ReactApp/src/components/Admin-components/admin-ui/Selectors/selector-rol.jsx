import { useState, useEffect,  } from "react";
import { refreshAccessToken } from "../../../../services/fetch";
import Cookies from 'js-cookie';
import '../../../../styles/administrator-styles/selectores.css'






const Selector_rols = ({id_rol,setid_rol}) => {
    
  console.log(id_rol)
  console.log(typeof(id_rol))
    const [roles, setroles] = useState([])
    
    
    
    
const apiUrl = 'http://localhost:8000/api/rol/rols/';

const getroles = async () => {
  try {
    const csrftoken = Cookies.get('csrftoken');
    const access_token = Cookies.get('access_token');
    
    console.log({ access_token, csrftoken }); // Verifica los valores

    const response = await fetch(apiUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${access_token}`,
      },
      credentials: 'include',
    });

    if (!response.ok) {
      const errorData = await response.json();
      if (errorData.code === 'token_not_valid') {
        console.warn("Token inválido. Intentando refrescar...");
        
        try {
          await refreshAccessToken(); // Intenta refrescar el token
          const newAccessToken = Cookies.get('access_token'); // Verifica el nuevo token
          if (!newAccessToken) throw new Error("No se pudo refrescar el token");
          
          return getroles(); // Reintenta la solicitud
        } catch (refreshError) {
          console.error("Error al refrescar el token:", refreshError);
          throw refreshError;
        }
      }
      throw new Error(errorData.detail || "Error al obtener los roles.");
    }

    const data = await response.json();
    setroles(data); // Actualiza el estado con los datos obtenidos
  } catch (error) {
    console.error('Error al hacer el fetch:', error);
  }
};

useEffect(() => {
  getroles();
}, []); // O [id_rol] si depende de ese valor


  return (
    
    <>
      

        <select className='selector-rol'
        value={id_rol}
        onChange={(event) => setid_rol(parseInt(event.target.value))}
        name="institution"
        id="institution"
        >
   
  {roles.map((element) => (
  <option  key={element.id_rol} value={element.id_rol}> 
    
    {element.rol_name}
    </option>
        ))}
    </select>
    </>
    
  )
}

export default Selector_rols
