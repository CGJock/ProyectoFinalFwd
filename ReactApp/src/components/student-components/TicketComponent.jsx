import  { useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { POST, GET } from '../../services/crud';
import '../../styles/ticket.css';

export const TicketComponent = () => {
  const { id_user } = useAuth();
  const apiUrl = 'http://localhost:8000/api/psychologist/create-ticket/';

  async function handle_form() {
    const user_data = {
      id_user: id_user,
    };

    try {
      let data = await GET(apiUrl);

      const dataExists = Array.isArray(data) && data.find((e) => e.id_user === id_user && e.state === 'pending');

      if (dataExists) {
        alert('Tienes un ticket en proceso');
      } else {
        const response = await POST(apiUrl, user_data);
        alert('Ticket enviado con éxito');
        return response;
      }
    } catch (error) {
      console.error("Error al registrar el ticket", error);
      alert('No se logró enviar el ticket');
    }
  }

  return (
    <div className='ticket-form'>
      <div className='titulo'>
        <h2>Solicitud de seguimiento psicológico</h2>
      </div>
      <div className='header'>
        <h4>Al presionar enviar se enviarán todos tus datos, donde se decidirá si se aprueba o rechaza tu solicitud</h4>
        <h4>No te preocupes, tus datos serán enviados automáticamente</h4>
        <h2>Al enviar la solicitud aceptas que tus datos sean utilizados para crear un expediente con tu caso</h2>
      </div>
      <div className='button-container'>
        <button onClick={handle_form}>Enviar Solicitud</button>
      </div>
      <div className='posdata'>
        <p>Todos tus datos serán confidenciales, y serán tomados solamente para crear un expediente con tu caso</p>
      </div>
    </div>
  );
};
