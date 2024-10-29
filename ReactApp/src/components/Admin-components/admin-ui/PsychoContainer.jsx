import { useEffect,  useState } from 'react'
import { get_institutes_data } from '../../../services/fetch';
import '../../../styles/administrator-styles/table_users.css'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';



export const PsychoContainer = () => {
  <MoreHorizIcon>
      {/* credit: cog icon from https://heroicons.com */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m16.5 0H21m-1.5 0H12m-8.457 3.077l1.41-.513m14.095-5.13l1.41-.513M5.106 17.785l1.15-.964m11.49-9.642l1.149-.964M7.501 19.795l.75-1.3m7.5-12.99l.75-1.3m-6.063 16.658l.26-1.477m2.605-14.772l.26-1.477m0 17.726l-.26-1.477M10.698 4.614l-.26-1.477M16.5 19.794l-.75-1.299M7.5 4.205L12 12m6.894 5.785l-1.149-.964M6.256 7.178l-1.15-.964m15.352 8.864l-1.41-.513M4.954 9.435l-1.41-.514M12.002 12l-3.75 6.495"
        />
      </svg>
    </MoreHorizIcon>
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

    
    <div className="table-users-container" >
    {/* Cabecera de la tabla */}
    <div className="container-header">
        <div className="table-id-user">ID Usuario</div>
        <div className="table-id-user">ID Psicolog</div>
        <div className="table-dni">Cedula</div>
        <div className="table-cell">Nombre </div>
        <div className="table-cell">Primer Apellido</div>
        <div className="table-cell">Segundo Apellido</div>
        <div className="table-cell">Genero</div>
        <div className="table-cell">Numero Pacientes</div>
        <div className="table-cell">Numero Licencia</div>
        <div className="table-small">disponibilidad</div>
        <div className="table-small">Experiencia</div>
       
    </div>

    {/* Cuerpo de la tabla */}
    <div className="table-body">
      {data.map((psychologists) => (
        <div className="table-row" key={psychologists.id_user.id_user}>
          <div className="row-">{psychologists.id_user.id_user}</div>
          <div className="row-">{psychologists.id_psychologist}</div>
          <div className="row-">{psychologists.id_user.dni_number}</div>
          <div className="row-">{psychologists.id_user.name}</div>
          <div className="row-">{psychologists.id_user.first_name} </div>
          <div className="row-">{psychologists.id_user.last_name}</div>
          <div className="row-">{psychologists.sex ? "masculino" : "femenino"}</div>
          <div className="row-">{psychologists.pacient_count}</div>
          <div className="row-">{psychologists.license_code}</div>
          <div className="row-">{psychologists.availability ? 1 : 0}</div>
          <div className="row-">{psychologists.years_experience}</div>
          <MoreHorizIcon />
        </div>
      ))}
    </div>
    
  </div>
  
);
};

