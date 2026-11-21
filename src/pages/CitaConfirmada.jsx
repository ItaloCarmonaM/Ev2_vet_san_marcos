import { Container, Row, Col } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import PlantillaPublica from "../components/templates/PlantillaPublica";
import Boton from "../components/atoms/Boton";
import EtiquetaEstadoCita from "../components/atoms/EtiquetaEstadoCita";
import { calcularPrecioServicio } from "../utils/precios";
import {
  formatearPrecio,
  nombreDeServicio,
  nombreDeMascota,
  especieDeCita,
} from "../utils/formato";
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

  const [anio, mes, dia] = String(cita.fecha || "").split("-");
  const horaCorta = String(cita.hora || "").slice(0, 5);
  const fechaObj = new Date(`${cita.fecha}T${horaCorta || "12:00"}:00`);
  const precio = cita.servicio
    ? calcularPrecioServicio(cita.servicio, fechaObj)
    : Number(cita.precio ?? cita.servicio_precio ?? 0);
  const mascota = nombreDeMascota(cita);
  const especie = especieDeCita(cita);
  const servicioNombre = nombreDeServicio(cita);

  return (
    <PlantillaPublica>
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <div className="card p-4 shadow-sm text-center">
              <h1 className="h3 fw-bold text-primary">¡Solicitud enviada!</h1>
              <p className="text-muted">Te contactaremos para confirmar tu hora.</p>

              <ul className="list-unstyled text-start my-3">
                <li><strong>Mascota:</strong> {mascota} {especie ? `(${especie})` : ""}</li>
                <li><strong>Servicio:</strong> {servicioNombre}</li>
                <li><strong>Fecha:</strong> {dia}-{mes}-{anio} a las {horaCorta}</li>
                {precio > 0 && <li><strong>Precio:</strong> ${formatearPrecio(precio)}</li>}
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
