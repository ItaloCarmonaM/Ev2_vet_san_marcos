import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import PlantillaPublica from "../components/templates/PlantillaPublica";
import Boton from "../components/atoms/Boton";
import serviciosData, { CATEGORIAS } from "../data/servicios";
import { useTituloPagina } from "../hooks/useTituloPagina";

function Categorias() {
  const navigate = useNavigate();
  useTituloPagina("Categorías");

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
          {CATEGORIAS.map((cat) => {
            const cantidad = serviciosData.filter((s) => s.categoria === cat).length;
            return (
              <Col key={cat} xs={12} md={6} lg={4}>
                <div className="card h-100 shadow-sm">
                  <div className="card-body d-flex flex-column">
                    <h2 className="h5 fw-bold text-primary">{cat}</h2>
                    <p className="text-muted flex-grow-1">
                      {cantidad} {cantidad === 1 ? "servicio disponible" : "servicios disponibles"} en esta categoría.
                    </p>
                    <Boton
                      texto="Ver servicios"
                      variante="outline-primary"
                      onClick={() => navigate(`/servicios?categoria=${encodeURIComponent(cat)}`)}
                    />
                  </div>
                </div>
              </Col>
            );
          })}
        </Row>
      </Container>
    </PlantillaPublica>
  );
}

export default Categorias;