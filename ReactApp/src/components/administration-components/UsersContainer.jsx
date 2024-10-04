import { useEffect,  useState } from 'react'
<<<<<<< HEAD:ReactApp/src/components/Admin-components/admin-static-components/UsersContainer.jsx
import { get_institutes_data } from '../../../services/fetch';
=======
import { get_institutes_data } from '../../services/fetch';
import '../../../styles/table_users.css'
>>>>>>> 6d935eaf2473f2ca095b21ac86f43d2ddbb1b9ab:ReactApp/src/components/administration-components/UsersContainer.jsx


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
    <div className="table-users-container" style={{display:'flex', flexDirection:'column'}}>
    {/* Cabecera de la tabla */}
    <div className="container-header">
      
        <div className="table-cell">ID Usuario</div>
        <div className="table-cell">DNI</div>
        <div className="table-cell">Nombre </div>
        <div className="table-cell">1er Apellido</div>
        <div className="table-cell">2ndo Apellido</div>
        <div className="table-cell">Genero</div>
        <div className="table-cell">Grado</div>
        <div className="table-cell">Beca</div>
        <div className="table-cell">Subsidio</div>
        <div className="table-cell">Institucion</div>
        <div className="table-cell">Institucion Publica</div>
        <div className="table-cell">Direccion Insitucion</div>
    </div>

    {/* Cuerpo de la tabla */}
    <div className="table-body">
      {data.map((student) => (
        <div className="table-row" key={student.id_user.id_user}>
          <div className="table-cell">{student.id_user.id_user}</div>
          <div className="table-cell">{student.id_user.dni_number}</div>
          <div className="table-cell">{student.id_user.name}</div>
          <div className="table-cell">{student.id_user.first_name} </div>
          <div className="table-cell">{student.id_user.last_name}</div>
          <div className="table-cell">{student.id_user.sex}</div>
          <div className="table-cell">{student.id_grade}</div>
          <div className="table-cell">{student.scholarship ? "Sí" : "No"}</div>
          <div className="table-cell">{student.government_subsidy ? "Sí" : "No"} </div>
          <div className="table-cell">{student.scholarship ? "Sí" : "No"} </div>
          <div className="table-cell">{student.id_institution.institution_name}</div>
        </div>
      ))}
    </div>
  </div>
);
};

export default UsersContainer
