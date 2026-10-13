import { Container, Row, Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import PlantillaPublica from "../components/templates/PlantillaPublica";
import FormularioSolicitudCita from "../components/organisms/FormularioSolicitudCita";
import servicios from "../data/servicios";
import { useTituloPagina } from "../hooks/useTituloPagina";

function SolicitarCita() {
  const navigate = useNavigate();
  const params = useParams();
  useTituloPagina("Solicitar cita");

  const existe = servicios.some((s) => s.codigo === params.codigo);
  const servicioInicial = existe ? params.codigo : "";

  function alSolicitar(cita) {
    navigate("/cita-confirmada", { state: { cita: { ...cita, estado: "Pendiente" } } });
  }

  return (
    <PlantillaPublica>
      <Container className="py-4">
        <header className="mb-4 text-center">
          <h1 className="fw-bold text-primary">Solicitar una cita</h1>
          <p className="text-muted fs-5">
            Completa el formulario y nuestra recepcionista confirmará tu hora.
          </p>
        </header>

        <Row className="justify-content-center">
          <Col md={10} lg={7}>
            <FormularioSolicitudCita
              key={servicioInicial}
              servicios={servicios}
              servicioInicial={servicioInicial}
              ocupadas={[]}
              onSolicitar={alSolicitar}
            />
          </Col>
        </Row>
      </Container>
    </PlantillaPublica>
  );
}

export default SolicitarCita;