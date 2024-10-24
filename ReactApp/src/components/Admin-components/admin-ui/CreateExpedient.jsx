
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { GET,PUT,POST } from '../../../services/crud';
import {  useEffect } from 'react';
import { useState } from 'react';
import { useAuth } from '../../../context/AuthContext';

export const ExpedienteModal = ({ Show, setShow }) => {
    const [TicketStatus, setTicketStatus] = useState('')
    const {id_ticket} = useAuth()
    const {ticket_user_id} = useAuth()

    
    const handleClose = () => setShow(!Show);
    const handleShow = () => setShow(!Show);

   
    async function gestionar_data(TicketStatus) {
      let updated_data = {
        
        "state": TicketStatus
      }
      const post_link = 'http://localhost:8000/api/psychologist/create-case/'
      const api_link = 'http://localhost:8000/api/psychologist/list-tickets/'
      let data = await  GET(api_link)
      if(data){
        const find_data = data.some((e) => e.id_ticket == id_ticket && e.id_user == ticket_user_id)
      if(find_data){
      const update_link =  `http://localhost:8000/api/psychologist/update-ticket/${id_ticket}/`
        await PUT(updated_data,update_link)
        alert('ticket actualizado')
        if (TicketStatus == 'accepted'){
        const user_data = {
          'id_user': ticket_user_id
        }
        console.log(user_data)
        await POST(post_link,user_data)
      }
      }else {
        alert('No se encontró el ticket')
      }

    }

    }
   
 return (
        <>  
      
          <Modal
            show={Show}
            onHide={handleClose}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Procesar Ticket</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <label htmlFor="Nombre" >Determina si el ticket sera rechazado o aprovado</label>
              <select className='selector_gender'
                value={TicketStatus}
                onChange={(event) => setTicketStatus(event.target.value)}
                name="ticket-status"
                id="ticket-status"
              >
                <option key={1} value={'accepted'}> 
                aceptar
                </option>
                <option key={2} value={'rejected'}> 
                rechazar
                </option>
                
                </select>
                <div>
                <h4>{ticket_user_id}</h4>
                <h4>{id_ticket}</h4>
                <label>La solicitud sera:  {TicketStatus}</label>

                <h1>paco</h1>
                </div>
    
              
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={ () => gestionar_data(TicketStatus) }>Procesar</Button>
            </Modal.Footer>
          </Modal>
        </>
      );
    }
    
  