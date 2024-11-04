//  const = 'psychologist-cases/<int:id_psychologist>/';
import { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { user_fetch } from '../../services/user_fetch';
import { Spinner } from '../utilities/spinner';
import { useAuth } from '../../context/AuthContext';
import { DetailedExpedientMod } from '../Admin-components/admin-ui/Modals/DetailedExpedientMod';
import "../../styles/psycho-container/psycho_expedients.css"
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';


export const PsychologistCases = () => {
    const navigate = useNavigate()
   
    const { PsychologistData,formatDate } = useAuth();
    const {setExpedientData} = useAuth()
    const [Show, setShow] = useState(false)
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

    const handleShow =(id_expedient) =>  {
      // setShow(!Show);
      setExpedientData(id_expedient)
      navigate(`/profile/psychologist/all-expedients/${id_expedient}`)
      }
  
    return (
      <div className='expedients_general_container'>
        {loading ? (
          <Spinner /> // Muestra el spinner mientras se carga
        ) : error ? (
          <p>{error}</p> // Muestra el mensaje de error si ocurre un problema
        ) : data.length === 0 ? (
          <p>No hay casos disponibles para este psicólogo.</p> // Muestra cuando no hay casos
        ) : (
          <div>
            <h3>Cantidad de casos actuales: {data.length}</h3>
            {data.map((e) => (
              <div className="contenedor_exped_psy" key={e.id_expedient}>
                <div className='exped_header'>
                  <h5>Numero de Expediente: {e.id_expedient}</h5>
                </div>

                <div className='exped_titles'>
                <div><h6>Fecha de creacion: </h6></div>
                <div><h6>Paciente ID: </h6></div>
                <div><h6>Archivos:</h6></div>
                <div><h6>Sessiones: </h6></div>
                <div><h6>Estado del expediente: </h6></div>
                </div>
                {console.log(e)}
                <div className='exped_body'>
                  <div>{formatDate(e.created_at)}</div>
                  <div>{e.id_pacient.id_user}{e.id_pacient.name}</div>
                  <div></div>
                  <div>{e.Sessions.length}</div>
                  <div>{e.state}</div>
                </div>

                <div className='exped_button_container'>
                  <button onClick={() => handleShow(e.id_expedient)} className='exped_button'>Vista Detallada <RemoveRedEyeRoundedIcon /></button>
                </div>
                         
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };
