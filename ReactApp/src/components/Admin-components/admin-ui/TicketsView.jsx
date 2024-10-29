import { GET,PUT } from "../../../services/crud";
import { useState, useEffect } from "react";
import { ExpedienteModal } from "./CreateExpedient";
import { useAuth } from "../../../context/AuthContext";
import '../../../styles/administrator-styles/tickets_views.css'

export const TicketsView = () => {
  
  const [Show, setShow] = useState(false)
  // const handleShow = () => setShow(!Show)
  const [data, setdata] = useState([]);
  const {setTicketData} =  useAuth()

  
  useEffect(() => {
    getData(); 
  }, [data]);

  async function getData() {
    const apiUrl = "http://localhost:8000/api/psychologist/list-tickets/";
    const datos = await GET(apiUrl); //se llama la data constantemente
    setdata(datos);
    console.log(datos);
    console.log
  }

  const handleShow = (id_ticket,ticket_user_id) => {
    setShow(!Show);
    setTicketData(id_ticket,ticket_user_id)
    
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
                <div> <button onClick={() => handleShow(e.id_ticket,e.id_user)}> Procesar Ticket</button></div>
              </div>
            ))}
          </div>
        </div>

        <ExpedienteModal setShow={setShow} Show={Show} handleShow={handleShow}/>
      </>
    );
};
