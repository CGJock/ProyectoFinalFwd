import { useState, useEffect, useContext } from "react";
import { get_institutes_data } from "../../../services/fetch";
import React from 'react'





const Selector_grades = () => {
    
    
    const [grades, setgrades] = useState([])
    const [grade, setgrade] = useState('')
    
    
    const apiUrl = 'http://localhost:8000/grade/grades/'
    const getgrades = async () => {
      
      try {
        const data = await get_institutes_data(apiUrl)
        setgrades(data)
      } catch (error) {
        console.error('Error al hacer el fetch:', error);
      }
    };
      
    useEffect(() => {
      getgrades()
    },[])
    

  return (
    
    <div>
      <label>Selecciona Grado Academico</label>

        <select 
        value={grade}
        onChange={(event) => setgrade(event.target.value)}
        name="institution"
        id="institution"
        >
   
  {grades.map((element) => (
  <option key={element.id_grade} value={element.id_grade}> 
    
    {element.grade_name}
    </option>
        ))}
    </select>
    </div>
    
  )
}

export default Selector_grades
