import { useState, useEffect, useContext } from "react";
import React from 'react'
import Cookies from 'js-cookie';
import '../../../../styles/administrator-styles/selectores.css'




const Selector_grades = ({id_grade, setid_grade}) => {
    
    
    const [grades, setgrades] = useState([])
   
   const apiUrl = 'http://localhost:8000/api/grade/grades/';
   console.log(id_grade)

const getgrades = async () => {
    try {
        const access_token = Cookies.get('access_token'); // Obtiene el token de acceso
        
        
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${access_token}`, // Incluye el token
            },
            credentials: 'include',
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || "Error al obtener las calificaciones.");
        }

        const data = await response.json(); // Parsear la respuesta
        setgrades(data); // Actualiza el estado con los datos
    } catch (error) {
        console.error('Error al hacer el fetch:', error);
    }
};
      
    useEffect(() => {
      getgrades()
    },[])
    

  return (
    
    <div>
    
    <select className="grade_selector"
        value={id_grade || ''}
        onChange={(event) => setid_grade(parseInt(event.target.value))}
        
        name="id_grade"
        id="grade"
        >
   
  {grades.map((element) => (
  <option key={element.id_grade} value={element.id_grade}> 
    
    {element.id_grade}
    </option>
        ))}
    </select>
    </div>
    
  )
}

export default Selector_grades
