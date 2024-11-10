import { useEffect,  useState } from 'react'
import { get_institutes_data } from '../../../services/fetch';
import '../../../styles/administrator-styles/student_container.css'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import Tooltip from '@mui/material/Tooltip';
import { EditUser } from './Modals/EditUser';


const UsersContainer = () => {
  const [Show, setShow] = useState(false)
  const [userEdit, setuserEdit] = useState(null)
  const [refresh, setrefresh] = useState(0)
  
    const [data, setdata] = useState([])
    useEffect(() => {
        getData();//use effect revisa constantemente el estado de la data
      }, [refresh]);
    
      async function getData() {
        const apiUrl = "http://localhost:8000/api/student/all-students/"
        const datos = await get_institutes_data(apiUrl);//se llama la data constantemente
        setdata(datos);
      }

      const handleShow = (id_user) => {
        setShow(!Show);
        setuserEdit(id_user)
      }


  return (
    <div className="students-container">
      <div className="students-header-container" >
        {/* Cabecera de la tabla */}
        <div className="students-container-header">
            <div className="students-table-id-user">ID Usuario</div>
            <div className="students-table-dni">Cedula</div>
            <div className="students-table-cell">Nombre </div>
            <div className="students-table-cell">Primer Apellido</div>
            <div className="students-table-cell">Segundo Apellido</div>
            <div className="students-table-cell">Genero</div>
            <div className="students-table-cell">Institucion</div>
            <div className="students-table-cell">Grado</div>
            <div className="students-table-small">Beca</div>
            <div className="students-table-small">Subsidio</div>
            <div className="students-table-small">Institucion Publica</div>
            <div className="students-table-cell">Direccion Insitucion</div>
            <div className="students-table-cell">Detalles</div>
           
            
        </div>

        {/* Cuerpo de la tabla */}
        <div className="students-table-body">
          {data.map((student) => (
            <div className="students-table-row-header" key={student.id_user.id_user}>
              <div className="students-row-">{student.id_user.id_user}</div>
              <div className="students-row-">{student.id_user.dni_number}</div>
              <div className="students-row-">{student.id_user.name}</div>
              <div className="students-row-">{student.id_user.first_name} </div>
              <div className="students-row-">{student.id_user.last_name}</div>
              <div className="students-row-">{student.id_user.sex ? (student.id_user.sex === "masculino" ? "M"  : "F") : "N/A"}</div>
              <div className="students-row-">{student.id_institution.institution_name}</div>
              <div className="students-row-">{student.id_grade.grade_name}</div>
              <div className="students-row-small">{student.scholarship ? "Sí" : "No"}</div>
              <div className="students-row-small">{student.government_subsidy ? "Sí" : "No"} </div>
              <div className="students-row-small">{student.id_institution.public_institution ? "Sí" : "No"} </div>
              <div className='students-row'>{student.id_institution.institution_address}</div>
              <div className='students-row-' ><div onClick={() => handleShow(student.id_user.id_user)} > <Tooltip title="Vista detallada"> <MoreHorizIcon  /> </Tooltip></div> </div> 
             
            </div>
          ))}
        </div>

        <EditUser userEdit={userEdit} Show={Show} setShow={setShow} setrefresh={setrefresh} refresh={refresh}/>
        
      </div>
    </div>
  
);
};

export default UsersContainer
