import { Container, Row, Col } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import PlantillaPublica from "../components/templates/PlantillaPublica";
import Boton from "../components/atoms/Boton";
import EtiquetaEspecie from "../components/atoms/EtiquetaEspecie";
import serviciosData from "../data/servicios";
import { useTituloPagina } from "../hooks/useTituloPagina";
import { formatearPrecio, separarEspecies } from "../utils/formato";
import { calcularPrecioServicio } from "../utils/precios";

function DetalleServicio() {
  const { codigo } = useParams();
  const navigate = useNavigate();
  const servicio = serviciosData.find((s) => s.codigo === codigo);
  useTituloPagina(servicio ? servicio.nombre : "Servicio no encontrado");

  if (!servicio) {
    return (
      <PlantillaPublica>
        <Container className="py-5 text-center">
          <h2 className="text-danger">Servicio no encontrado</h2>
          <p className="text-muted">El servicio que buscas no existe o fue eliminado.</p>
          <Boton texto="Volver a servicios" onClick={() => navigate("/servicios")} />
        </Container>
      </PlantillaPublica>
    );
  }

  return (
    <PlantillaPublica>
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={8}>
            <div className="card p-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <span className="badge bg-secondary fs-6">{servicio.categoria}</span>
                <span className="text-muted font-monospace">{servicio.codigo}</span>
              </div>

              <h1 className="fw-bold text-primary mb-3">{servicio.nombre}</h1>
              <hr />

              <p className="fs-5 mb-3">
                <strong>Especie:</strong>{" "}
                {separarEspecies(servicio.especie).map((e) => (
                  <EtiquetaEspecie key={e} especie={e} />
                ))}
              </p>
              <p className="fs-5 mb-3">
                <strong>Duración aproximada:</strong> {servicio.duracion}
              </p>
              <p className="fs-5 mb-3 fw-bold">
                <strong>Precio:</strong> ${formatearPrecio(calcularPrecioServicio(servicio))} CLP
              </p>
              {servicio.observaciones && (
                <p className="fs-6 text-muted mb-4">
                  <strong>Observaciones:</strong> {servicio.observaciones}
                </p>
              )}

              <div className="d-flex gap-3 flex-wrap">
                <Boton
                  texto="Solicitar cita para este servicio"
                  variante="primary"
                  className="btn-lg"
                  onClick={() => navigate(`/solicitar-cita/${servicio.codigo}`)}
                />
                <Boton
                  texto="Volver"
                  variante="outline-primary"
                  className="btn-lg"
                  onClick={() => navigate("/servicios")}
                />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </PlantillaPublica>
  );
}

export default DetalleServicio;