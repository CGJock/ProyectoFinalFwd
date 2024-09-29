
import { useState, useEffect} from "react";
import { get_institutes_data } from "../../../services/fetch";
import React from 'react'





const Selector_institution = () => {

const [institutions, setinstitutions] = useState([])
const [institution, setinstitution] = useState('')

const apiUrl = 'http://localhost:8000/instituto/institutions/'
const getInstitutions = async () => {
  
  try {
    const data = await get_institutes_data(apiUrl)
    setinstitutions(data)
  } catch (error) {
    console.error('Error al hacer el fetch:', error);
  }
};
  
useEffect(() => {
  getInstitutions()
},[])


 return (
    
    <div>
      <label>Selecciona Institucion</label>

        <select 
        value={institution}
        onChange={(event) => setinstitution(event.target.value)}
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
