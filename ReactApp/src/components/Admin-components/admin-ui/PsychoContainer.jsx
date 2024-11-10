import { useEffect,  useState } from 'react'
import { get_institutes_data } from '../../../services/fetch';
import '../../../styles/administrator-styles/psychologist_list.css'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';



export const PsychoContainer = () => {
    const [data, setdata] = useState([])
    useEffect(() => {
        getData();//use effect revisa constantemente el estado de la data
      }, []);
    
      async function getData() {
        const apiUrl = "http://localhost:8000/api/psychologist/all-psychologists/"
        const datos = await get_institutes_data(apiUrl);//se llama la data constantemente
        setdata(datos);
        console.log(datos)
      }
  return (

    
    <div className="table-psycho-container" >
    {/* Cabecera de la tabla */}
    <div className="psycho-container-header">
        <div className="psycho-table-id-user">ID Usuario</div>
        <div className="psycho-table-id-user">ID Psicolog</div>
        <div className="psycho-table-cell">Cedula</div>
        <div className="psycho-table-cell">Nombre </div>
        <div className="psycho-table-cell">Primer Apellido</div>
        <div className="psycho-table-cell">Segundo Apellido</div>
        <div className="psycho-table-cell">Genero</div>
        <div className="psycho-table-cell">Pacientes</div>
        <div className="psycho-table-cell">Numero Licencia</div>
        <div className="psycho-table-cell">Disponibilidad</div>
        <div className="psycho-table-cell">Experiencia</div>
        <div className="psycho-table-cell">Detalles</div>
  
       
    </div>

    {/* Cuerpo de la tabla */}
    <div className="psycho-table-body">
      {data.map((psychologists) => (
        <div className="psycho-table-row" key={psychologists.id_user.id_user}>
          <div className="psycho-row-">{psychologists.id_user.id_user}</div>
          <div className="psycho-row-">{psychologists.id_psychologist}</div>
          <div className="psycho-row-">{psychologists.id_user.dni_number}</div>
          <div className="psycho-row-">{psychologists.id_user.name}</div>
          <div className="psycho-row-">{psychologists.id_user.first_name} </div>
          <div className="psycho-row-">{psychologists.id_user.last_name}</div>
          <div className="psycho-row-small">{psychologists.id_user.sex ? (psychologists.id_user.sex === "masculino" ? "M"  : "F") : "N/A"}</div>
          <div className="psycho-row-small">{psychologists.pacient_count}</div>
          <div className="psycho-row-">{psychologists.license_code}</div>
          <div className="psycho-row-small">{psychologists.availability ? "Disponible" : "Ocupado"}</div>
          <div className="psycho-row-exp">{psychologists.years_experience}</div>
          <MoreHorizIcon />
        </div>
      ))}
    </div>
    
  </div>
  
);
};

