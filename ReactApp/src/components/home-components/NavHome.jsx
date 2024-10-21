import { Link } from "react-router-dom";
import '../../styles/nav-home.css';
import { useState } from "react";
import { Modal, Button, Alert } from "react-bootstrap";
import { useEmail } from '../../context/AuthContext.jsx'
const NavHome = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showAlert, setShowAlert] = useState(false); // Estado para la alerta
  
    const toggleMenu = () => {
      setIsOpen(!isOpen);
    };
    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    const handleSubmit = () => {
        setShowAlert(true); // Mostrar la alerta
        setShowModal(false); // Cerrar el modal
        setTimeout(() => setShowAlert(false), 5000); 
    };

    return (
      <>
        <nav className="navHome">
            <div className="navHome-container">
             {/* menu hamburgesa para responsividad */}
            <button className="nav-toggle" onClick={toggleMenu}>
          ☰
        </button>
            <ul className={`navHome-menu ${isOpen ? 'open' : ''}`}>
                <li><Link to="/home" className="home_link">Home</Link></li>
                <li><Link to="/AboutMe"className="about_link">About</Link></li>
                
                <li><Link to="/FAQ" className="questions_link">FAQ</Link></li>
                <li><Link to="/profileStudient"className="profileStudient">perfil</Link></li>
                <li><Button variant="outline-secondary" onClick={handleShow} className="contact_link">Contact</Button>{' '}</li>
            </ul>
            </div>
        </nav>
        
        {/* Alerta de envío correcto */}
     
        {/* Modal para el formulario de contacto */}
        <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Contact Me</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <form>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" className="form-control" id="name" placeholder="Enter your name" />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" id="email" placeholder="Enter your email" />
                </div>
                <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea className="form-control" id="message" rows="3" placeholder="Your message"></textarea>
                </div>
            </form>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
                Close
            </Button>
            {showAlert && (
            <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
                se envio correcto!
            </Alert>
        )}

            <Button variant="primary" onClick={handleSubmit}>
                Send Message
            </Button>
        </Modal.Footer>
    </Modal>
    </>
    );
};

export default NavHome;
