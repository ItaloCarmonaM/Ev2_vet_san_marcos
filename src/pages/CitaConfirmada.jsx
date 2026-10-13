import { Container, Row, Col } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import PlantillaPublica from "../components/templates/PlantillaPublica";
import Boton from "../components/atoms/Boton";
import EtiquetaEstadoCita from "../components/atoms/EtiquetaEstadoCita";
import { calcularPrecioServicio } from "../utils/precios";
import { formatearPrecio } from "../utils/formato";
import { useTituloPagina } from "../hooks/useTituloPagina";

function CitaConfirmada() {
  const navigate = useNavigate();
  const location = useLocation();
  const cita = location.state?.cita;
  useTituloPagina("Cita solicitada");

  if (!cita) {
    return (
      <PlantillaPublica>
        <Container className="py-5 text-center">
          <h1 className="h3 fw-bold">No hay una cita reciente</h1>
          <p className="text-muted">Solicita una hora desde nuestros servicios.</p>
          <Boton texto="Ver servicios" onClick={() => navigate("/servicios")} />
        </Container>
      </PlantillaPublica>
    );
  }

  const [anio, mes, dia] = cita.fecha.split("-");
  const precio = calcularPrecioServicio(cita.servicio, new Date(`${cita.fecha}T${cita.hora}:00`));

  return (
    <PlantillaPublica>
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <div className="card p-4 shadow-sm text-center">
              <h1 className="h3 fw-bold text-primary">¡Solicitud enviada!</h1>
              <p className="text-muted">Te contactaremos para confirmar tu hora.</p>

              <ul className="list-unstyled text-start my-3">
                <li><strong>Mascota:</strong> {cita.mascota} ({cita.especie})</li>
                <li><strong>Servicio:</strong> {cita.servicio.nombre}</li>
                <li><strong>Fecha:</strong> {dia}-{mes}-{anio} a las {cita.hora}</li>
                <li><strong>Precio:</strong> ${formatearPrecio(precio)}</li>
                <li><strong>Estado:</strong> <EtiquetaEstadoCita estado={cita.estado} /></li>
              </ul>

              <Boton texto="Volver al inicio" onClick={() => navigate("/")} />
            </div>
          </Col>
        </Row>
      </Container>
    </PlantillaPublica>
  );
}

export default CitaConfirmada;