import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useEffect, useState } from 'react';
import { user_fetch } from '../../../../services/user_fetch';
import { useAuth } from '../../../../context/AuthContext';
import "../../../../styles/psycho-container/detailed_expedient.css";
import SessionInput from '../../../psychologist-components/Modals/DatePicker';

export const DetailedExpedientMod = ({ Show, setShow }) => {
  const { id_expedient } = useAuth();
  const [DetailedData, setDetailedData] = useState(null);
  const apiExpedient = "http://localhost:8000/api/psychologist/expedient-detailed";
  
//   const [isModalOpen, setIsModalOpen] = useState(false);
  
//   async function openModal(){
//     setIsModalOpen(true);
// } 
//   const closeModal = () => setIsModalOpen(false);

  async function handleClose() {
    setShow(!Show);
    setDetailedData(null);
  }

  const [ShowDate, setShowDate] = useState(false)
  async function handleCloseDate() {
    setShowDate(!ShowDate);
  }

  useEffect(() => {
    if (Show && id_expedient) {
      const gestionar_data = async () => {
        try {
          const data = await user_fetch(apiExpedient, id_expedient);
          setDetailedData(data);
        } catch (error) {
          console.error("Error al obtener los datos del expediente:", error);
        }
      };
      gestionar_data();
    }
  }, [Show, id_expedient]);

  return (
    <>
    <div className='detailed_expedient_container'>
      <Modal
        style={{ width: '700px', textAlign: 'center', marginLeft: "25%" }}
        className="modalbody custom-modal"
        show={Show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        dialogClassName="modal-dialog-centered custom-dialog"
      >
        <Modal.Header closeButton>
          <Modal.Title>Vista detallada del expediente: {id_expedient}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {DetailedData ? (
            <div className="modal_content">
              <div className="modal_titles">
                <div><h6>Fecha de creación:</h6></div>
                <div><h6>Paciente ID:</h6></div>
                <div><h6>Archivos:</h6></div>
                <div><h6>Sesiones:</h6></div>
                <div><h6>Estado del expediente:</h6></div>
              </div>
              <div className="modal_body">
                <div>{DetailedData.created_at}</div>
                <div>{DetailedData.id_pacient.id_user} {DetailedData.id_pacient.name}</div>
                <div>{/* Añade aquí el contenido de archivos si lo tienes */}</div>
                <div>
                  <div>{DetailedData.Sessions.length}</div>
                  <div>
                    <button className='create_session_btn' onClick={() => handleCloseDate()}>
                      Crear Sesión
                    </button>
                  </div>
                </div>
                <div>{DetailedData.state}</div>
              </div>
            </div>
          ) : (
            <p>Cargando detalles del expediente...</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          <Button variant="primary">Procesar</Button>
        </Modal.Footer>
      </Modal>
      </div>

      {/* Modal para crear sesión */}
      <SessionInput 
        ShowDate={ShowDate}
        setShowDate={setShowDate}
        id_expedient={id_expedient} 
      />
    </>
  );
};
