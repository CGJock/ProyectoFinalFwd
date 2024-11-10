import { useEffect, useState } from 'react'
import { get_institutes_data } from '../../../services/fetch';
import '../../../styles/administrator-styles/expedient_list.css'
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useAuth } from '../../../context/AuthContext';

export const ExpedientContainer = () => {
  const { formatDate } = useAuth();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      const apiUrl = "http://localhost:8000/api/psychologist/cases-list/";
      const datos = await get_institutes_data(apiUrl);
      setData(datos);
      console.log(datos)
    } catch (error) {
      console.error("Error al obtener datos:", error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <div>Cargando datos...</div>;
  }

  return (
    <div className="expedient_general_container">
      {/* Cabecera de la tabla */}
      <div className="expedient_container_header">
        <div className="table-id-user">ID Expediente</div>
        <div className="table-dni">ID Paciente</div>
        <div className="table-cell">ID Psicologo </div>
        <div className="table-cell">Estado</div>
        <div className="table-cell">Fecha de Creación</div>
        <div className="table-cell">Detalles</div>
      </div>

      {/* Cuerpo de la tabla */}
      <div className="expedient_table_body">
        {data.length > 0 ? (
          data.map((expedient) => (
            <div className="expedient-table-row" key={expedient.id_expedient}>
              <div className="expedient-row-">{expedient.id_expedient}</div>
              <div style={{color:"red"}} className="expedient-row-">Anonimo</div>
              <div className="expedient-row-">Dr: {expedient.id_psychologist.id_user.name} {expedient.id_psychologist.id_user.first_name}</div>
              <div className="expedient-row-">{expedient.state}</div>
              <div className="expedient-row-">{formatDate(expedient.created_at)}</div>
              <div className="expedient-row-"><MoreHorizIcon /></div>
            </div>
          ))
        ) : (
          <div>No hay expedientes disponibles</div>
        )}
      </div>
    </div>
  );
};
