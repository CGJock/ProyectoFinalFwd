import React from "react";
import "../../styles/home-styles/info-section.css";

const InfoSection = () => {
  return (
    <div className="container_infoSection">
      <header>
        <h2>Hub de Superación</h2>
        <h1>Crecimiento Personal</h1>
        <p className="subheader">Te ofrecemos las siguientes herramientas</p>
      </header>

      <section className="tools">
        <div className="tool">
          <div className="icon-box">
            <img src="/path-to-your-icons/icon1.png" alt="Artículos y Herramientas" />
          </div>
          <h3>Artículos y Herramientas</h3>
          <p>
            Descubre nuestra amplia colección de recursos, desde artículos
            informativos hasta herramientas prácticas, para impulsar tu
            crecimiento personal y bienestar emocional.
          </p>
        </div>

        <div className="tool">
          <div className="icon-box">
            <img src="/path-to-your-icons/icon2.png" alt="Únete a la Comunidad" />
          </div>
          <h3>Únete a la Comunidad</h3>
          <p>
            Regístrate de forma gratuita para acceder a contenido exclusivo y
            conectarte con otros miembros de nuestra comunidad que están
            comprometidos con su superación personal.
          </p>
        </div>

        <div className="tool">
          <div className="icon-box">
            <img src="/path-to-your-icons/icon3.png" alt="Apoyo Personalizado" />
          </div>
          <h3>Apoyo Personalizado</h3>
          <p>
            Si te registras, podrás tener un psicólogo personalizado para ti,
            que estará dispuesto a ayudarte.
          </p>
        </div>
      </section>

      <section className="features">
        <div className="feature">
          <span className="feature-icon">😊</span>
          <h3>Servicios</h3>
          <p>
            Descubre nuestros servicios diseñados para apoyar y guiar a jóvenes en su camino hacia el bienestar emocional y social.
          </p>
        </div>

        <div className="feature">
          <span className="feature-icon">⭐</span>
          <h3>Comunidad</h3>
          <p>
            Únete a nuestra comunidad de jóvenes comprometidos con el crecimiento personal y el apoyo mutuo.
          </p>
        </div>

        <div className="feature">
          <span className="feature-icon">🤝</span>
          <h3>Apoyo</h3>
          <p>
            Nuestro equipo de profesionales especializados está aquí para ayudarte.
          </p>
        </div>

        <div className="feature">
          <span className="feature-icon">⚡</span>
          <h3>Recursos</h3>
          <p>
            Explora nuestra variedad de recursos educativos y herramientas para el crecimiento personal.
          </p>
        </div>
      </section>

      {/* Nueva Sección de Citas */}
      <section className="quotes">
        <div className="quote">
          <p>"La curiosa paradoja es que cuando me acepto tal como soy, entonces puedo cambiar."</p>
          <h4>Carl Rogers</h4>
        </div>

        <div className="quote">
          <p>"Las creencias sobre nuestras capacidades tienen una profunda influencia en cómo nos sentimos y lo que logramos."</p>
          <h4>Albert Bandura</h4>
        </div>

        <div className="quote">
          <p>"No soy lo que me sucedió, soy lo que decido ser."</p>
          <h4>Carl Jung</h4>
        </div>
      </section>
    </div>
  );
};

export default InfoSection;
