import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Icono from "../atoms/Icono";

const ENLACES_POR_DEFECTO = [
  { texto: "Inicio", ruta: "/" },
  { texto: "Servicios", ruta: "/servicios" },
  { texto: "Solicitar cita", ruta: "/solicitar-cita" },
  { texto: "Mis citas", ruta: "/mis-citas" },
];

// Props opcionales: enlaces, direccion, telefono, email, horario
function Footer(props) {
  const enlaces = props.enlaces || ENLACES_POR_DEFECTO;
  const direccion = props.direccion || "San Bernardo, Santiago";
  const telefono = props.telefono || "+56 9 1234 5678";
  const email = props.email || "contacto@vetsanmarcos.cl";
  const horario = props.horario || "Lun a Vie 09:00 a 19:00 · Sáb 09:00 a 14:00";
  const anio = new Date().getFullYear();

  return (
    <footer className="footer-vet bg-light border-top mt-5 pt-4">
      <Container>
        <Row className="gy-4">
          <Col xs={12} md={4}>
            <div className="d-flex align-items-center gap-2 fw-bold mb-2">
              <Icono nombre="huella" tamano={26} />
              Veterinaria San Marcos
            </div>
            <p className="text-muted small">
              Cuidamos a tu mascota con cariño y profesionalismo.
            </p>
          </Col>

          <Col xs={6} md={4}>
            <h6 className="fw-bold">Navegación</h6>
            <ul className="list-unstyled mb-0">
              {enlaces.map((enlace) => (
                <li key={enlace.ruta}>
                  <Link to={enlace.ruta} className="text-decoration-none">
                    {enlace.texto}
                  </Link>
                </li>
              ))}
            </ul>
          </Col>

          <Col xs={6} md={4}>
            <h6 className="fw-bold">Contacto</h6>
            <ul className="list-unstyled small text-muted mb-0">
              <li>{direccion}</li>
              <li>{telefono}</li>
              <li>{email}</li>
              <li className="d-flex align-items-center gap-1">
                <Icono nombre="reloj" tamano={14} />
                {horario}
              </li>
            </ul>
          </Col>
        </Row>

        <hr />
        <p className="text-center text-muted small pb-3 mb-0">
          © {anio} Veterinaria San Marcos. Todos los derechos reservados.
        </p>
      </Container>
    </footer>
  );
}

export default Footer;