
import { useState, useEffect} from "react";
import { get_institutes_data } from "../../../services/fetch";






const Selector_institution = ({id_institution,setid_institution}) => {

const [institutions, setinstitutions] = useState([])
// const [institution, setinstitution] = useState('')

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
