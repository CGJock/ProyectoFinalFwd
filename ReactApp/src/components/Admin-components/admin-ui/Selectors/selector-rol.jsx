import { useState, useEffect,  } from "react";
import { get_institutes_data } from "../../../../services/fetch";
import '../../../../styles/selectores.css'






const Selector_rols = ({id_rol,setid_rol}) => {
    
    
    const [roles, setroles] = useState([])
    
    
    
    
    const apiUrl = 'http://localhost:8000/api/rol/rols/'
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
    
    <>
      

        <select className='selector-rol'
        value={id_rol}
        onChange={(event) => setid_rol(event.target.value)}
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
