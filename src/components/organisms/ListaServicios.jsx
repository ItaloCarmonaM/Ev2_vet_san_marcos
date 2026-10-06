import { Row, Col } from "react-bootstrap";
import TarjetaServicio from "../molecules/TarjetaServicio";
import { calcularPrecioServicio } from "../../utils/precios";

function ListaServicios(props) {
  const servicios = props.servicios || [];

  if (servicios.length === 0) {
    return (
      <p className="text-center text-muted py-5">
        No encontramos servicios con esa búsqueda.
      </p>
    );
  }

  return (
    <Row className="g-4">
      {servicios.map((s) => (
        <Col key={s.codigo} sm={6} lg={4}>
          <TarjetaServicio
            codigo={s.codigo}
            nombre={s.nombre}
            especie={s.especie}
            duracion={s.duracion}
            precio={calcularPrecioServicio(s)}
            onSolicitar={
              props.onSeleccionarServicio
                ? () => props.onSeleccionarServicio(s)
                : undefined
            }
          />
        </Col>
      ))}
    </Row>
  );
}

export default ListaServicios;