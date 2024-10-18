
import { useState, useEffect} from "react";
import { refreshAccessToken } from "../../../../services/fetch";
import Cookies from 'js-cookie';
import '../../../../styles/selectores.css'






const Selector_institution = ({id_institution,setid_institution}) => {

const [institutions, setinstitutions] = useState([])

const apiUrl = 'http://localhost:8000/api/instituto/institutions/'
const getInstitutions = async () => {
  
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
          
          return getInstitutions(); // Reintenta la solicitud
        } catch (refreshError) {
          console.error("Error al refrescar el token:", refreshError);
          throw refreshError;
        }
      }
      throw new Error(errorData.detail || "Error al obtener ;as instituciones.");
    }

    const data = await response.json();
    setinstitutions(data); // Actualiza el estado con los datos obtenidos
  } catch (error) {
    console.error('Error al hacer el fetch:', error);
  }
};
  
useEffect(() => {
  getInstitutions()
},[])


 return (
    
    <div>

        <select className="institution-selector"
        value={id_institution}
        onChange={(event) => setid_institution(event.target.value)}
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
