import "../../styles/home-styles/faq.css";

// Component that contains the FAQs a student might have
const FAQ = () => {
  return (
    <div className="faq-container">
      <h2 className="faq-title">Preguntas Frecuentes</h2>
      
      {/* Question 1 */}
      <div className="faq-item">
        <input
          type="checkbox"
          id="faq-item-1"
          className="faq-item-toggle"
        />
        <label htmlFor="faq-item-1" className="faq-item-question">
          ¿Cómo se protege mi privacidad en esta plataforma?
        </label>
        <div className="faq-item-answer">
          <p>
            Tomamos la privacidad muy en serio. Todas las interacciones en esta plataforma son confidenciales y tus datos personales se almacenan de manera segura.
          </p>
          <ul>
            <li>
              Todas las comunicaciones entre tú y los profesionales están encriptadas para asegurar la privacidad.
            </li>
            <li>
              Puedes permanecer anónimo al interactuar con otros estudiantes.
            </li>
            <li>
              No compartimos tu información personal con terceros.
            </li>
          </ul>
        </div>
      </div>
      
      {/* Question 2 */}
      <div className="faq-item">
        <input
          type="checkbox"
          id="faq-item-2"
          className="faq-item-toggle"
        />
        <label htmlFor="faq-item-2" className="faq-item-question">
          ¿Qué apoyo puedo esperar de los consejeros?
        </label>
        <div className="faq-item-answer">
          <p>
            Nuestra plataforma proporciona apoyo profesional de consejeros licenciados que están capacitados para ayudar a estudiantes que enfrentan acoso o dificultades emocionales.
          </p>
          <ul>
            <li>
              Puedes programar sesiones individuales con un consejero.
            </li>
            <li>
              Hay un foro para el apoyo entre pares, donde puedes compartir experiencias de manera anónima.
            </li>
            <li>
              Los consejeros pueden ofrecer estrategias de afrontamiento, apoyo emocional y consejos prácticos para manejar situaciones difíciles.
            </li>
          </ul>
        </div>
      </div>
      
      {/* Question 3 */}
      <div className="faq-item">
        <input
          type="checkbox"
          id="faq-item-3"
          className="faq-item-toggle"
        />
        <label htmlFor="faq-item-3" className="faq-item-question">
          ¿Está segura mi información en esta plataforma?
        </label>
        <div className="faq-item-answer">
          <p>
            Sí, utilizamos protocolos de seguridad de estándares industriales para proteger tus datos.
          </p>
          <ul>
            <li>
              Todos los datos están encriptados tanto en tránsito como en reposo.
            </li>
            <li>
              El acceso a tus datos está restringido solo a personal autorizado.
            </li>
            <li>
              Puedes solicitar la eliminación de tus datos en cualquier momento.
            </li>
          </ul>
        </div>
      </div>
      
      {/* Question 4 */}
      <div className="faq-item">
        <input
          type="checkbox"
          id="faq-item-4"
          className="faq-item-toggle"
        />
        <label htmlFor="faq-item-4" className="faq-item-question">
          ¿Puedo permanecer en el anonimato?
        </label>
        <div className="faq-item-answer">
          <p>
            Sí, el anonimato es una opción al interactuar con otros estudiantes en la plataforma. Sin embargo, los consejeros pueden necesitar información básica para brindar apoyo adecuado.
          </p>
        </div>
      </div>

      {/* Question 5 */}
      <div className="faq-item">
        <input
          type="checkbox"
          id="faq-item-5"
          className="faq-item-toggle"
        />
        <label htmlFor="faq-item-5" className="faq-item-question">
          ¿Cómo reporto contenido o comportamiento inapropiado?
        </label>
        <div className="faq-item-answer">
          <p>
            Si encuentras contenido o comportamiento inapropiado en la plataforma, por favor repórtalo inmediatamente a través de nuestro formulario de contacto o notificando a un moderador.
          </p>
          <ul>
            <li>
              Usa el botón "Reportar" ubicado en cada publicación.
            </li>
            <li>
              Contacta directamente a un moderador para problemas urgentes.
            </li>
            <li>
              Todos los informes son revisados y manejados de manera confidencial por nuestro equipo.
            </li>
          </ul>
        </div>
      </div>

      {/* Question 6 */}
      <div className="faq-item">
        <input
          type="checkbox"
          id="faq-item-6"
          className="faq-item-toggle"
        />
        <label htmlFor="faq-item-6" className="faq-item-question">
          ¿Dónde puedo acceder a servicios de emergencia?
        </label>
        <div className="faq-item-answer">
          <p>
            Si necesitas ayuda urgente, te recomendamos contactar a los servicios de emergencia locales. También proporcionamos enlaces a varias líneas de ayuda y recursos en la plataforma.
          </p>
          <ul>
            <li>
              Los contactos de emergencia están listados en la página "Ayuda".
            </li>
            <li>
              Nuestros consejeros pueden guiarte sobre cómo llegar a los servicios de apoyo más cercanos.
            </li>
            <li>
              En caso de situaciones críticas, no dudes en llamar a los números de emergencia de tu área.
            </li>
          </ul>
        </div>
      </div>
      
    </div>
  );
};

export default FAQ;
