import React from 'react'
import { useAuth } from '../../context/AuthContext';
import { POST,GET } from '../../services/crud';
import '../../styles/ticket.css'

export const TicketComponent = () => {

  const {id_user} = useAuth();
  const apiUrl = 'http://localhost:8000/api/psychologist/create-ticket/'
  console.log(id_user)

  async function handle_form(){
    
    const user_data = {
        id_user: id_user,
    }

    try {
      // Realiza una solicitud POST para obtener los tickets actuales del usuario
      let data = await GET(apiUrl); // Asegúrate de pasar `user_data` al POST
      
      // Verifica si hay algún ticket pendiente
      const dataExists = Array.isArray(data) && data.find((e) => e.id_user == id_user && e.state == 'pending');
      console.log(data)
      
      if (dataExists) {
        alert('Tienes un ticket en proceso');
      } else {
        // Si no hay ticket pendiente, envía una nueva solicitud
        const response = await POST(apiUrl, user_data);
        alert('Ticket enviado con éxito');
        return response
      }
    } catch (error) {
      console.error("Error al registrar el ticket", error);
      alert('No se logró enviar el ticket');
    }
  }

  return (
    <>
      <div className='ticket-form'>
        <div className='titulo'>
          <h2>Solicitud de seguimiento psicológico</h2>
        </div>

        <div className='header'>
          <h4>Al presionar enviar se enviarán todos tus datos, donde se decidirá si se aprueba o rechaza tu solicitud</h4>
          <h4>No te preocupes, tus datos serán enviados automáticamente</h4>
        </div>

        <div className='button-container'>
          <button onClick={handle_form}>Enviar Solicitud</button>
        </div>

        <div className='posdata'>
          <p>Todos tus datos serán confidenciales, y serán tomados solamente para crear un expediente con tu caso</p>
        </div>
      </div>
    </>
  );
};