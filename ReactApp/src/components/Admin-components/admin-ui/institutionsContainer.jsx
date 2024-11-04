import { useEffect, useState } from "react";
import { get_institutes_data } from "../../../services/fetch";
import "../../../styles/administrator-styles/institutions_container.css";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";

export const InstitutionsContainer = () => {
  const [data, setdata] = useState([]);
  useEffect(() => {
    getData(); //use effect revisa constantemente el estado de la data
  }, []);

  async function getData() {
    const apiUrl = "http://localhost:8000/api/instituto/institutions/";
    const datos = await get_institutes_data(apiUrl); //se llama la data constantemente
    setdata(datos);
    console.log(datos);
  }
  return (
    <div className="table-institutions-container">
      {/* Cabecera de la tabla */}
      <div className="institution-container-header">
        <div className="table-id-user">ID Instituto</div>
        <div className="table-id-user">Nombre Institucion</div>
        <div className="table-cell">Ubicacion</div>
        <div className="table-cell">Publica o Privada</div>
        <div className="table-cell">Detalle </div>
      </div>

      {/* Cuerpo de la tabla */}
      <div className="institution-table-body">
        {data.map((instituto) => (
          <div className="institution-table-row" key={instituto.id_institution}>
            <div className="institution-row">{instituto.id_institution}</div>
            <div className="institution-row">{instituto.institution_name}</div>
            <div className="institution-row">
              {instituto.institution_address}
            </div>
            <div className="institution-row">
              {instituto.public_institution ? "Publica" : "Privada"}
            </div>
            <div>
              <MoreHorizIcon />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
