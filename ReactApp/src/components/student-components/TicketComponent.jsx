import React from 'react'
// import { useAuth } from '../../context/AuthContext';
import '../../styles/ticket.css'

export const TicketComponent = () => {

  // const {id_user} = useAuth();

  function handle_form(event){
    event.preventDefault()
  }
  return (
    <>
      <div className='ticket-form'>
          <div className='titulo'>
            <h2>Solicitud de seguimiento psicologico</h2>
          </div>

          <div className='header'>
          <h4>Al presionar enviar se enviaran todos tus datos, donde se decidira si se aprueba o rechaza tu solicitud</h4>
          <h4>No te preocupes tus datos seran enviado automaticamente</h4>
          </div>

          <div className='button-container'>
            <button onClick={handle_form}>Enviar Solicitud</button>
          </div>
          
          <div className='posdata'>
          <p>Todos tus datos seran confidenciales, y seran tomados solamente para crear un expediente con tu caso</p>
          </div>
          
      </div>
    </>
  )
}
