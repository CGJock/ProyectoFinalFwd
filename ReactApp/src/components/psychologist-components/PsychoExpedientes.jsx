//  const = 'psychologist-cases/<int:id_psychologist>/';
import { useState,useEffect } from 'react';
import { user_fetch } from '../../services/user_fetch';
import { Spinner } from '../utilities/spinner';
import AuthProvider, { useAuth } from '../../context/AuthContext'

export const PsychologistCases = () => {
    const { PsychologistData } = useAuth();
    const id_psychologist = PsychologistData?.id_psychologist;
  
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true); // Estado de carga
    const [error, setError] = useState(null); // Estado de error
  
    useEffect(() => {
      getData();
    }, []);
    
    async function getData() {
      try {
        setLoading(true); // Muestra el spinner mientras carga
        const apiUrl = "http://localhost:8000/api/psychologist/psychologist-cases";
        const datos = await user_fetch(apiUrl, id_psychologist);
        setData(datos);
      } catch (err) {
        setError("No hay casos disponibles para este psicólogo.");
      } finally {
        setLoading(false); // Oculta el spinner al finalizar la carga
      }
    }
  
    return (
      <div>
        {loading ? (
          <Spinner /> // Muestra el spinner mientras se carga
        ) : error ? (
          <p>{error}</p> // Muestra el mensaje de error si ocurre un problema
        ) : data.length === 0 ? (
          <p>No hay casos disponibles para este psicólogo.</p> // Muestra cuando no hay casos
        ) : (
          <div>
            <h3>Casos de Psicólogo:</h3>
            {/* Renderiza los casos cuando hay datos */}
            {data.map((e) => (
              <div key={e.id_expedient}>
                <p>{e.id_expedient}</p>
                {/* Incluye otros detalles del caso aquí */}
                
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };
