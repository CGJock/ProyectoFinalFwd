import { useState, useEffect,  } from "react";
import { get_institutes_data } from "../../../services/fetch";
import React from 'react'





const Selector_rols = () => {
    
    
    const [roles, setroles] = useState([])
    const [rol, setrol] = useState('')
    
    
    const apiUrl = 'http://localhost:8000/rol/rols/'
    const getroles = async () => {
      
      try {
        const data = await get_institutes_data(apiUrl)
        setroles(data)
      } catch (error) {
        console.error('Error al hacer el fetch:', error);
      }
    };
      
    useEffect(() => {
      getroles()
    },[])
    

  return (
    
    <div>
      <label>Selecciona Grado Academico</label>

        <select 
        value={rol}
        onChange={(event) => setrol(event.target.value)}
        name="institution"
        id="institution"
        >
   
  {roles.map((element) => (
  <option key={element.id_rol} value={element.id_rol}> 
    
    {element.rol_name}
    </option>
        ))}
    </select>
    </div>
    
  )
}

export default Selector_rols
