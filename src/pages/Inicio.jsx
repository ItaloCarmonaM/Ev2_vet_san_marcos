import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import PlantillaPublica from "../components/templates/PlantillaPublica";
import TarjetaServicio from "../components/molecules/TarjetaServicio";
import Boton from "../components/atoms/Boton";
import Icono from "../components/atoms/Icono";
import servicios from "../data/servicios";

const CODIGOS_DESTACADOS = ["SV001", "VA002", "EX004", "OT002"];

const CIFRAS = [
  { numero: "2009", texto: "Año de fundación" },
  { numero: "3", texto: "Médicos veterinarios" },
  { numero: "25", texto: "Pacientes atendidos al día" },
];

function Inicio() {
  const navigate = useNavigate();
  const destacados = servicios.filter((s) => CODIGOS_DESTACADOS.includes(s.codigo));

  return (
    <PlantillaPublica>
      {/* Hero */}
      <section className="bg-light py-5">
        <Container className="text-center py-4">
          <Icono nombre="huella" tamano={56} />
          <h1 className="fw-bold mt-3">Cuidamos a tu mascota como parte de tu familia</h1>
          <p className="lead text-muted mx-auto" style={{ maxWidth: 640 }}>
            Agenda tu hora en línea y consulta el historial de tu mascota, todo desde un solo lugar.
          </p>
          <Boton
            texto="Agendar una cita"
            variante="primary"
            className="btn-lg"
            onClick={() => navigate("/solicitar-cita")}
          />
        </Container>
      </section>

      {/* Cifras */}
      <section className="py-5">
        <Container>
          <h2 className="fw-bold text-center mb-4">Quiénes somos</h2>
          <p className="text-center text-muted mx-auto mb-4" style={{ maxWidth: 720 }}>
            Somos una clínica veterinaria en Rancagua que atiende perros, gatos, conejos y aves,
            con consulta general, vacunación, cirugía menor, desparasitación y control de peso.
          </p>
          <Row className="g-3 text-center">
            {CIFRAS.map((c) => (
              <Col key={c.texto} md={4}>
                <div className="card shadow-sm p-3 h-100">
                  <p className="fs-2 fw-bold text-primary mb-0">{c.numero}</p>
                  <p className="text-muted mb-0">{c.texto}</p>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Servicios destacados */}
      <section className="py-5 bg-light">
        <Container>
          <h2 className="fw-bold text-center mb-4">Servicios destacados</h2>
          <Row className="g-4">
            {destacados.map((s) => (
              <Col key={s.codigo} sm={6} lg={3}>
                <TarjetaServicio
                  {...s}
                  onSolicitar={() => navigate("/solicitar-cita")}
                />
              </Col>
            ))}
          </Row>
          <div className="text-center mt-4">
            <Boton
              texto="Ver todos los servicios"
              variante="outline-primary"
              onClick={() => navigate("/servicios")}
            />
          </div>
        </Container>
      </section>
    </PlantillaPublica>
  );
}

export default Inicio;