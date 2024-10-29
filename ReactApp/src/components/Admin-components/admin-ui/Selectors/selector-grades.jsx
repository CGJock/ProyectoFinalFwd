import { useState, useEffect, useContext } from "react";
import React from 'react'
import Cookies from 'js-cookie';
import '../../../../styles/administrator-styles/selectores.css'
import { refreshAccessToken } from "../../../../services/token";





const Selector_grades = ({id_grade, setid_grade}) => {
    
    
    const [grades, setgrades] = useState([])
   
   const apiUrl = 'http://localhost:8000/api/grade/grades/';
   console.log(id_grade)
   

   const getgrades = async () => {
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
            
            return getgrades(); // Reintenta la solicitud
          } catch (refreshError) {
            console.error("Error al refrescar el token:", refreshError);
            throw refreshError;
          }
        }
        throw new Error(errorData.detail || "Error al obtener los roles.");
      }
  
      const data = await response.json();
      setgrades(data); // Actualiza el estado con los datos obtenidos
    } catch (error) {
      console.error('Error al hacer el fetch:', error);
    }
  };
  
  useEffect(() => {
    getgrades();
  }, []); 
  

  return (
    
    <div>
    
    <select className="grade_selector"
        value={id_grade}
        
        onChange={(event) => setid_grade(parseInt(event.target.value))}
        
        
        name="id_grade"
        id="grade"
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
