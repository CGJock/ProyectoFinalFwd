
import { useState, useEffect} from "react";
import { refreshAccessToken } from "../../../../services/fetch";
import Cookies from 'js-cookie';
import '../../../../styles/administrator-styles/selectores.css'






const Selector_institution = ({id_institution,setid_institution}) => {

const [institutions, setinstitutions] = useState([])

const apiUrl = 'http://localhost:8000/api/instituto/institutions/'
console.log({'id_institution': id_institution})

const getinstitutions = async () => {
  try {
    
    const access_token = Cookies.get('access_token');
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
          
          return getinstitutions(); // Reintenta la solicitud
        } catch (refreshError) {
          console.error("Error al refrescar el token:", refreshError);
          throw refreshError;
        }
      }
      throw new Error(errorData.detail || "Error al obtener los roles.");
    }

    const data = await response.json();
    setinstitutions(data); // Actualiza el estado con los datos obtenidos
  } catch (error) {
    console.error('Error al hacer el fetch:', error);
  }
};

useEffect(() => {
  getinstitutions();
}, []); // O [id_rol] si depende de ese valor


 return (
    
    <div>

        <select className="institution-selector"
        value={id_institution}
        onChange={(event) => setid_institution(parseInt(event.target.value))}
        name="institution"
        id="institution"
        >
   
  {institutions.map((element) => (
  <option key={element.id_institution} value={element.id_institution}> 
    
    {element.institution_name}
    </option>
        ))}
    </select>
    </div>
    
  )
}

export default Selector_institution
