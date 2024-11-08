import { Link } from "react-router-dom";
import '../../styles/home-styles/nav-home.css';
import { useState } from "react";
import { Modal, Button, Alert } from "react-bootstrap";
import { sendEmail } from '../../services/email.js';
import { useAuth } from "../../context/AuthContext.jsx";

const NavHome = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showAlert, setShowAlert] = useState(false); 
    const [formData, setFormData] = useState({ name: '', email: '', message: '' }); // Estado para los datos del formulario
    const { StudentData, PsychologistData } = useAuth(); // Incluye PsychologistData si es parte del contexto

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);

    // Manejar el cambio de los inputs
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData({ ...formData, [id]: value });
    };

    // Enviar el formulario por email
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const emailData = {
                from_name: formData.name,
                from_email: formData.email,
                message: formData.message,
            };

            const result = await sendEmail(emailData);
            if (result) {
                setFormData({ name: '', email: '', message: '' }); // Limpiar el formulario
                setShowAlert(true); // Mostrar la alerta
                setTimeout(() => setShowAlert(false), 5000); // Ocultar la alerta después de 5 segundos
            }
        } catch (error) {
            console.error('Error al enviar el email:', error);
        }

        setShowModal(false); // Cerrar el modal
    };

    return (
        <>
            <nav className="navHome">
                <div className="navHome-container">
                    <button className="nav-toggle" onClick={toggleMenu}>
                        ☰
                    </button>
                    <ul className={`navHome-menu ${isOpen ? 'open' : ''}`}>
                        <li><Link to="/home" className="home_link">Home</Link></li>
                        <li><Link to="/AboutUs" className="about_link">About</Link></li>
                        <li><Link to="/FAQ" className="questions_link">FAQ</Link></li>
                        {/* Renderizar solo si StudentData o PsychologistData no son null */}
                        {(StudentData || PsychologistData) && (
                            <li><Link to="/Profile/user" className="profileStudient">Perfil</Link></li>
                        )}
                        <li><Link to="/login" className="home_link">Logueate</Link></li>
                        <li>
                            <Button variant="outline-secondary" onClick={handleShow} className="contact_link">
                                Contact
                            </Button>
                        </li>
                    </ul>
                </div>
            </nav>

            {/* Modal para el formulario de contacto */}
            <Modal show={showModal} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Contact Me</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                placeholder="Enter your name"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email address</label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                placeholder="Enter your email"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="message">Message</label>
                            <textarea
                                className="form-control"
                                id="message"
                                value={formData.message}
                                onChange={handleInputChange}
                                rows="3"
                                placeholder="Your message"
                            ></textarea>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    {showAlert && (
                        <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
                            ¡Correo enviado con éxito!
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
