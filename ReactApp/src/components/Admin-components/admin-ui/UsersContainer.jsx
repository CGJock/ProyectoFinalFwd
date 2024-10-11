import { useEffect,  useState } from 'react'

import { get_institutes_data } from '../../../services/fetch';
import '../../styles/table_users.css'



const UsersContainer = () => {
    const [data, setdata] = useState([])
    useEffect(() => {
        getData();//use effect revisa constantemente el estado de la data
      }, []);
    
      async function getData() {
        const apiUrl = "http://localhost:8000/api/student/all-students/"
        const datos = await get_institutes_data(apiUrl);//se llama la data constantemente
        setdata(datos);
      }
  return (
    <div className="table-users-container" >
    {/* Cabecera de la tabla */}
    <div className="container-header">
        <div className="table-id-user">ID Usuario</div>
        <div className="table-dni">Cedula</div>
        <div className="table-cell">Nombre </div>
        <div className="table-cell">Primer Apellido</div>
        <div className="table-cell">Segundo Apellido</div>
        <div className="table-cell">Genero</div>
        <div className="table-cell">Institucion</div>
        <div className="table-cell">Grado</div>
        <div className="table-cell">Beca</div>
        <div className="table-cell">Subsidio</div>
        <div className="table-cell">Institucion Publica</div>
        <div className="table-cell">Direccion Insitucion</div>
    </div>

    {/* Cuerpo de la tabla */}
    <div className="table-body">
      {data.map((student) => (
        <div className="table-row" key={student.id_user.id_user}>
          <div className="row-id-user">{student.id_user.id_user}</div>
          <div className="row-dni">{student.id_user.dni_number}</div>
          <div className="row-">{student.id_user.name}</div>
          <div className="row-">{student.id_user.first_name} </div>
          <div className="row-">{student.id_user.last_name}</div>
          <div className="row-">{student.id_user.sex}</div>
          <div className="row-">{student.id_institution.institution_name}</div>
          <div className="row-">{student.id_grade}</div>
          <div className="row-">{student.scholarship ? "Sí" : "No"}</div>
          <div className="row-">{student.government_subsidy ? "Sí" : "No"} </div>
          <div className="row-">{student.scholarship ? "Sí" : "No"} </div>
          <div className='row'>{student.id_institution.institution_address}</div>
          
        </div>
      ))}
    </div>
    
  </div>
  
);
};

export default UsersContainer
