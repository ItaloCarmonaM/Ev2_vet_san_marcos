import { Container, Row, Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import PlantillaPublica from "../components/templates/PlantillaPublica";
import FormularioSolicitudCita from "../components/organisms/FormularioSolicitudCita";
import { useServicios } from "../hooks/useServicios";
import { useCitas } from "../hooks/useCitas";
import { useTituloPagina } from "../hooks/useTituloPagina";

function SolicitarCita() {
  const navigate = useNavigate();
  const params = useParams();
  const { servicios } = useServicios();
  const { ocupadas, agregarCita } = useCitas();
  useTituloPagina("Solicitar cita");

  const existe = servicios.some((s) => s.codigo === params.codigo);
  const servicioInicial = existe ? params.codigo : "";

  // La cita queda guardada (como Pendiente) y se muestra en la confirmación
  function alSolicitar(cita) {
    const nueva = agregarCita(cita);
    navigate("/cita-confirmada", { state: { cita: nueva } });
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
          <Col md={8} lg={5}>
            <FormularioSolicitudCita
              key={servicioInicial}
              servicios={servicios}
              servicioInicial={servicioInicial}
              ocupadas={ocupadas}
              onSolicitar={alSolicitar}
            />
          </Col>
        </Row>
      </Container>
    </PlantillaPublica>
  );
}

export default SolicitarCita;