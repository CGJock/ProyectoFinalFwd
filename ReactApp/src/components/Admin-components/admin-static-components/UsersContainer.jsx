import { useEffect,  useState } from 'react'
import { get_institutes_data } from '../../../services/fetch';
import 

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
    <div className="table-header">
      <div className="table-row">
        <div className="table-cell">ID Usuario</div>
        <div className="table-cell">Nombre Completo</div>
        <div className="table-cell">Sexo</div>
        <div className="table-cell">DNI</div>
        <div className="table-cell">Grado</div>
        <div className="table-cell">Beca</div>
        <div className="table-cell">Subsidio</div>
       
      </div>
    </div>

    {/* Cuerpo de la tabla */}
    <div className="table-body">
      {data.map((student, index) => (
        <div className="table-row" key={index}>
          {/* Accediendo a las propiedades anidadas en id_user */}
          <div className="table-cell">{student.id_user.id_user}</div>
          <div className="table-cell">
            {student.id_user.first_name} {student.id_user.last_name}
          </div>
          <div className="table-cell">{student.id_user.sex}</div>
          <div className="table-cell">{student.id_user.dni_number}</div>
          <div className="table-cell">{student.id_grade}</div>
          <div className="table-cell">
            {student.scholarship ? "Sí" : "No"}
          </div>
          <div className="table-cell">
            {student.government_subsidy ? "Sí" : "No"}
          </div>
        </div>
      ))}
    </div>
  </div>
);
};

export default UsersContainer
