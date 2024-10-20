import { GET } from "../../../services/crud";
import { useState, useEffect } from "react";
import '../../../styles/administrator-styles/tickets_views.css'

export const TicketsView = () => {
  const [data, setdata] = useState([]);
  useEffect(() => {
    getData(); 
  }, []);

  async function getData() {
    const apiUrl = "http://localhost:8000/api/psychologist/list-tickets/";
    const datos = await GET(apiUrl); //se llama la data constantemente
    setdata(datos);
    console.log(datos);
    console.log
  }

    return (
      <>
        <div className="table-tickets-container">
          {/* Cabecera de la tabla */}
          <div className="container-header">
            <div className="table-id-user">ID Ticket</div>
            <div className="table-dni">ID user</div>
            <div className="table-cell">ESTADO </div>
          </div>

          {/* Cuerpo de la tabla */}
          <div className="table-body">
            {data.map((e) => (
              <div className="table-row" key={e.id_ticket}>
                <div className="row-">{e.id_ticket}</div>
                <div className="row-">{e.id_user}</div>
                <div className="row-">{e.state}</div>
              </div>
            ))}
          </div>
        </div>
      </>
    );
};
