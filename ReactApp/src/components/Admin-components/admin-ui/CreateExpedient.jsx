
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {  useEffect } from 'react';
import { useState } from 'react';

export const ExpedienteModal = ({ Show, setShow }) => {
    const [TicketStatus, setTicketStatus] = useState('')
    
    const handleClose = () => setShow(!Show);
    const handleShow = () => setShow(!Show);

    function gestionar_data(params) {
      
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
              <label htmlFor="Nombre" >procesa los datos </label>
              <select className='selector_gender'
                value={TicketStatus}
                onChange={(event) => setTicketStatus(event.target.value)}
                name="ticket-status"
                id="ticket-status"
              >
                <option key={1} value={'acepted'}> 
                aceptar
                </option>
                <option key={2} value={'rejected'}> 
                rechazar
                </option>
                
                </select>
    
              
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" onClick={ () => gestionar_data() }>Procesar</Button>
            </Modal.Footer>
          </Modal>
        </>
      );
    }
    
   