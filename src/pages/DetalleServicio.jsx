import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import PlantillaPublica from '../components/templates/PlantillaPublica';
import serviciosData from '../data/servicios';

function DetalleServicio() {
  const { codigo } = useParams();
  const navigate = useNavigate();
  const servicio = serviciosData.find((s) => s.codigo === codigo);

  if (!servicio) {
    return (
      <PlantillaPublica>
        <Container className="py-5 text-center">
          <h2 className="text-danger">Servicio no encontrado</h2>
          <p className="text-muted">El servicio que buscas no existe o fue eliminado.</p>
          <Button variant="primary" onClick={() => navigate('/servicios')}>
            Volver a servicios
          </Button>
        </Container>
      </PlantillaPublica>
    );
  }

  return (
    <PlantillaPublica>
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={8}>
            <Card className="shadow border-0 p-4">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <span className="badge bg-secondary fs-6">{servicio.categoria}</span>
                  <span className="text-muted font-monospace">{servicio.codigo}</span>
                </div>
                <h1 className="fw-bold text-primary mb-3">{servicio.nombre}</h1>
                <hr />
                <p className="fs-5 mb-3">
                  <strong>Especie:</strong> {servicio.especie}
                </p>
                <p className="fs-5 mb-3">
                  <strong>Duración aproximada:</strong> {servicio.duracion} min
                </p>
                <p className="fs-5 mb-3 text-success fw-bold">
                  <strong>Precio:</strong> ${Number(servicio.precio).toLocaleString('es-CL')} CLP
                </p>
                {servicio.observaciones && (
                  <p className="fs-6 text-muted mb-4">
                    <strong>Observaciones:</strong> {servicio.observaciones}
                  </p>
                )}
                <div className="d-flex gap-3">
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={() => navigate(`/solicitar-cita/${servicio.codigo}`)}
                  >
                    Solicitar cita para este servicio
                  </Button>
                  <Button
                    variant="outline-secondary"
                    size="lg"
                    onClick={() => navigate('/servicios')}
                  >
                    Volver
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </PlantillaPublica>
  );
}

export default DetalleServicio;