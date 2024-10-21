
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {  useEffect } from 'react';
import { useState } from 'react';

export const ExpedienteModal = (Show,handleClose) => {
    const [TicketStatus, setTicketStatus] = useState('')
   

    
    useEffect(() => {
      if (Producto) {
        setNameEdit(Producto.Name);
        setDescription(Producto.Description);
        setPrecioEdit(Producto.Price);
        setimgEditada(Producto.imgUrl);
        setCategoryEdit(Producto.Category);
        setlocationEdit(Producto.Location);
      }
    },[Producto])
    
    
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
              <label htmlFor="Nombre" >Nombre </label>
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
              <Button variant="primary" onClick={() => editarItems(Producto.id,NameEdit,Description,
                CategoryEdit,locationEdit,PrecioEdit,imgEditada)} >Procesar</Button>
            </Modal.Footer>
          </Modal>
        </>
      );
    }
    
   