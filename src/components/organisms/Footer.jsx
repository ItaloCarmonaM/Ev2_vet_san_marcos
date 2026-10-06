import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Footer() {
  return (
    <footer className="bg-dark text-light py-4 mt-5">
      <Container>
        <Row className="gy-3">
          <Col md={4}>
            <h5 className="fw-bold text-info">Veterinaria San Marcos</h5>
            <p className="small text-secondary mb-0">
              Cuidamos la salud y el bienestar de tus mascotas con atención profesional y personalizada en Rancagua.
            </p>
          </Col>

          <Col md={4}>
            <h6 className="text-white">Contacto y Ubicación</h6>
            <ul className="list-unstyled small text-secondary mb-0">
              <li>📍 Av. San Marcos 1234, Rancagua</li>
              <li>📞 +56 9 1234 5678</li>
              <li>✉️ contacto@veterinariasanmarcos.cl</li>
            </ul>
          </Col>

          <Col md={4}>
            <h6 className="text-white">Horario de Atención</h6>
            <ul className="list-unstyled small text-secondary mb-0">
              <li>Lunes a Viernes: 09:00 - 19:00 hrs</li>
              <li>Sábados: 10:00 - 14:00 hrs</li>
              <li>Urgencias 24/7 (Sujeto a tarifa especial)</li>
            </ul>
          </Col>
        </Row>

        <hr className="my-3 border-secondary" />

        <Row>
          <Col className="text-center small text-light">
            &copy; {new Date().getFullYear()} Veterinaria San Marcos. Todos los derechos reservados.
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;
