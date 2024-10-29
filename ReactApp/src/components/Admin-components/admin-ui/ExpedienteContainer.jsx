import { useEffect,  useState } from 'react'
import { get_institutes_data } from '../../../services/fetch';
import '../../../styles/administrator-styles/table_users.css'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';



export const ExpedientContainer = () => {
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
        const apiUrl = "http://localhost:8000/api/psychologist/cases-list/"
        const datos = await get_institutes_data(apiUrl);//se llama la data constantemente
        setdata(datos);
        console.log(datos)
      }
  return (

    
    <div className="table-users-container" >
    {/* Cabecera de la tabla */}
    <div className="container-header">
        <div className="table-id-user">ID Expediente</div>
        <div className="table-dni">ID Paciente</div>
        <div className="table-cell">ID Psicologo </div>
        <div className="table-cell">Estado</div>
       
       
    </div>

    {/* Cuerpo de la tabla */}
    <div className="table-body">
      {data.map((expedient) => (
        <div className="table-row" key={expedient.id_expedient}>
          <div className="row-">{expedient.id_expedient}</div>
          <div className="row-">Restringido</div>
          <div className="row-">{expedient.id_psychologist}</div>
          <div className="row-">{expedient.state} </div>
          <div className="row-">{expedient.created_at} </div>
          <MoreHorizIcon />
        </div>
      ))}
    </div>
    
  </div>
  
);
};

