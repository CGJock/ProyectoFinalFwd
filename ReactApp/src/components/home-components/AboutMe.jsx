import React from 'react';
import '../../styles/AboutMe.css';
import { Container, Row, Col, Button } from 'react-bootstrap';
import InteractiveMap from './InteractiveMap';


const AboutMe = () => {

    return (
      <section className="about-me">
    
          <Row className="align-items-center">
            {/* Columna de imagen */}
            <Col md={6}>
              <img
                src="https://i.pinimg.com/564x/5a/db/a7/5adba73f3d5d4dbd279779e115244e41.jpg"
                alt="Descripción de la imagen"
                className="img-fluid"
              />
            </Col>
  
            {/* Columna de texto */}
            <Col md={6}>
              <div className="about-me-content">
                <h2 className="about-me-title">Sobre Nosotros</h2>
                <p className="about-me-text">
                  Somos una red social dedicada a combatir el bullying y ayudar a los jóvenes a superar los retos emocionales
                  que enfrentan. Nuestra misión es brindar un espacio seguro, con apoyo profesional y herramientas efectivas
                  para empoderar a los usuarios en su proceso de recuperación y crecimiento personal.
                </p>
                <p className="about-me-text">
                  Contamos con psicólogos en línea disponibles para ofrecer asesoramiento personalizado. Además, proporcionamos
                  recursos como eventos educativos, una biblioteca de autoayuda, y una comunidad de apoyo mutuo para fomentar
                  la resiliencia y el bienestar emocional.
                </p>
                <Button variant="primary">Leer más</Button>
              </div>
            </Col>
          </Row>
      
  
        <section>
          <Container className="my-5">
            <h2 className="text-center">Ubícanos en nuestras instalaciones</h2>
            <InteractiveMap />
          </Container>
        </section>
  
        {/* Sección de tarjetas */}
        <section className="card-section">
          <Container>
            <h2 className="text-center">Nuestros Servicios</h2>
            <Row className="justify-content-center">
              {[
                {
                  title: 'Asesoramiento Personalizado',
                  description: 'Nuestros psicólogos te ayudarán a encontrar el camino hacia la sanación.',
                },
                {
                  title: 'Eventos Educativos',
                  description: 'Participa en talleres y seminarios que fomentan el crecimiento personal.',
                },
                {
                  title: 'Biblioteca de Autoayuda',
                  description: 'Accede a una amplia variedad de recursos para ayudarte en tu viaje.',
                },
                {
                  title: 'Comunidad de Apoyo',
                  description: 'Únete a un grupo de personas que comparten tus experiencias y luchas.',
                },
              ].map((service, index) => (
                <Col md={3} key={index} className="mb-4">
                  <div className="card">
                    <h3>{service.title}</h3>
                    <p>{service.description}</p>
                  </div>
                </Col>
              ))}
            </Row>
          </Container>
        </section>
      </section>
    );
  };



export default AboutMe;
