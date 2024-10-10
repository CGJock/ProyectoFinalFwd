import React from "react";
import { Link } from "react-router-dom";
import "../../../styles/SideModal.css";

const SideModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="side-modal-overlay" onClick={onClose}>
      <div className="side-modal" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          &times; {/* X para cerrar el modal */}
        </button>
        <nav className="modal-nav">
          <ul>
            <li>
              <Link to="/home" className="home_link">
                Pagina principal
              </Link>
            </li>
            <li>
              <Link to="/library">Biblioteca</Link>
            </li>
            <li>
              <Link to="/events">Próximos Eventos</Link>
            </li>

            <li>
              <Link to="/FAQ" className="questions_link">
                FAQ
              </Link>
            </li>
            <li>
              <Link to="/AboutMe" className="about_link">
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
