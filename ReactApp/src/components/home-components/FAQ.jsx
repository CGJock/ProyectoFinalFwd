import React, { useState } from "react";
import "../../styles/home-styles/faq.css";

// Importa las imágenes
import toggleOffIcon from "../../assets/icon/toggle_off.png";  
import toggleOnIcon from "../../assets/icon/toggle_on.png";

const FAQ = () => {
  // Estado para manejar qué preguntas están abiertas o cerradas
  const [toggleState, setToggleState] = useState([false, false, false, false, false, false]);

  // Manejar click para cambiar el estado del toggle
  const handleToggle = (index) => {
    const newState = toggleState.map((item, idx) => (idx === index ? !item : item));
    setToggleState(newState);
  };

  return (
    <div className="faq-container">
      <h2 className="faq-title">Preguntas Frecuentes</h2>

      {/* Pregunta 1 */}
      <div className="faq-item">
        <div className="faq-header" onClick={() => handleToggle(0)}>
          <span>¿Cómo se protege mi privacidad en esta plataforma?</span>
          {/* Cambiar icono de acuerdo al estado del toggle */}
          <img
            src={toggleState[0] ? toggleOnIcon : toggleOffIcon}
            alt="Toggle"
            className="toggle-icon"
          />
        </div>
        {toggleState[0] && (
          <div className="faq-item-answer">
            <p>
              Tomamos la privacidad muy en serio. Todas las interacciones en esta plataforma son confidenciales y tus datos personales se almacenan de manera segura.
            </p>
            <ul>
              <li>Todas las comunicaciones entre tú y los profesionales están encriptadas.</li>
              <li>Puedes permanecer anónimo al interactuar con otros estudiantes.</li>
              <li>No compartimos tu información personal con terceros.</li>
            </ul>
          </div>
        )}
      </div>

      {/* Pregunta 2 */}
      <div className="faq-item">
        <div className="faq-header" onClick={() => handleToggle(1)}>
          <span>¿Qué apoyo puedo esperar de los consejeros?</span>
          <img
            src={toggleState[1] ? toggleOnIcon : toggleOffIcon}
            alt="Toggle"
            className="toggle-icon"
          />
        </div>
        {toggleState[1] && (
          <div className="faq-item-answer">
            <p>Nuestra plataforma proporciona apoyo profesional de consejeros licenciados.</p>
            <ul>
              <li>Puedes programar sesiones individuales con un consejero.</li>
              <li>Hay un foro para el apoyo entre pares.</li>
              <li>Los consejeros pueden ofrecer estrategias de afrontamiento.</li>
            </ul>
          </div>
        )}
      </div>

      {/* Puedes agregar más preguntas de manera similar */}
    </div>
  );
};

export default FAQ;
