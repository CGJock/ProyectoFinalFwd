import React from "react";
import { Link } from "react-router-dom";
import "../../styles/sideModal.css";
/**
 * Componente que representa un menú lateral (modal) que se puede abrir y cerrar.
 * 
 * Este componente muestra enlaces a diferentes secciones de la aplicación.
 * 
 * @param {Object} props - Propiedades del componente.
 * @param {boolean} props.isOpen - Indica si el modal está abierto o cerrado.
 * @param {function} props.onClose - Función para cerrar el modal.
 */

const SideModal = ({ isOpen, onClose }) => {
  // Si el modal no está abierto, no se renderiza nada
  if (!isOpen) return null;

  return (
    <div className="side-modal-overlay" onClick={onClose}>
      <div className="side-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          &times; {/* X para cerrar el modal */}
        </button>
        <nav className="modal-nav"> {/* Navegación dentro del modal */}
          <ul>
            <li>
              <Link to="/home" className="home_link">  {/* Enlace a la página principal */}
                Pagina principal
              </Link>
            </li>
            <li>
              <Link to="/library">Biblioteca</Link> {/* Enlace a la biblioteca */}
            </li>
            <li>
              <Link to="/events">Próximos Eventos</Link>  {/* Enlace a próximos eventos */}
            </li>

            <li>
              <Link to="/FAQ" className="questions_link"> {/* Enlace a la sección de preguntas frecuentes */}
                FAQ
              </Link>
            </li>
            <li>
              <Link to="/AboutMe" className="about_link"> {/* Enlace a la sección "Sobre mí" */}
                About
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default SideModal;
