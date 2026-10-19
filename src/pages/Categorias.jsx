import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import PlantillaPublica from '../components/templates/PlantillaPublica';
import serviciosData from '../data/servicios';

function Categorias() {
  const navigate = useNavigate();
  const categoriasUnicas = [...new Set(serviciosData.map((s) => s.categoria))];

  return (
    <PlantillaPublica>
      <Container className="py-4">
        <header className="mb-4 text-center">
          <h1 className="fw-bold text-primary">Categorías de Servicios</h1>
          <p className="text-muted fs-5">
            Explora nuestros servicios veterinarios agrupados por especialidad.
          </p>
        </header>

        <Row className="g-4">
          {categoriasUnicas.map((cat) => {
            const serviciosCategoria = serviciosData.filter((s) => s.categoria === cat);
            return (
              <Col key={cat} xs={12} md={6} lg={4}>
                <Card className="h-100 shadow-sm border-0">
                  <Card.Body className="d-flex flex-column">
                    <Card.Title className="fw-bold text-primary">{cat}</Card.Title>
                    <Card.Text className="text-muted flex-grow-1">
                      {serviciosCategoria.length} {serviciosCategoria.length === 1 ? 'servicio disponible' : 'servicios disponibles'} en esta categoría.
                    </Card.Text>
                    <Button
                      variant="outline-primary"
                      onClick={() => navigate(`/servicios`)}
                    >
                      Ver servicios
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </PlantillaPublica>
  );
}

export default Categorias;