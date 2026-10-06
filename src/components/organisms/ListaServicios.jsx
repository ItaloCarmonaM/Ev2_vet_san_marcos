import { useState } from "react";
import { Row, Col } from "react-bootstrap";
import BuscadorServicios from "../molecules/BuscadorServicios";
import TarjetaServicio from "../molecules/TarjetaServicio";
import Selector from "../atoms/Selector";
import { normalizarTexto } from "../../utils/formato";

// servicios: [{ codigo, categoria, nombre, especie, duracion, precio, observaciones }]
// onSolicitar: función que recibe el código del servicio (opcional)
function ListaServicios(props) {
  const servicios = props.servicios || [];
  const [busqueda, setBusqueda] = useState("");
  const [categoria, setCategoria] = useState("");

  // Categorías únicas, en el orden en que aparecen
  const categorias = [...new Set(servicios.map((s) => s.categoria))].map(
    (c) => ({ valor: c, texto: c })
  );

  const filtrados = servicios.filter(
    (s) =>
      normalizarTexto(s.nombre).includes(normalizarTexto(busqueda.trim())) &&
      (categoria === "" || s.categoria === categoria)
  );

  return (
    <section className="lista-servicios">
      <Row className="g-3 mb-4">
        <Col xs={12} md={8}>
          <BuscadorServicios
            valor={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </Col>
        <Col xs={12} md={4}>
          <Selector
            id="filtroCategoria"
            name="filtroCategoria"
            placeholder="Todas las categorías"
            opciones={categorias}
            valor={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          />
        </Col>
      </Row>

      {filtrados.length === 0 ? (
        <p className="text-center text-muted py-5">
          No se encontraron servicios.
        </p>
      ) : (
        <Row xs={1} sm={2} lg={3} className="g-4">
          {filtrados.map((servicio) => (
            <Col key={servicio.codigo}>
              <TarjetaServicio
                codigo={servicio.codigo}
                nombre={servicio.nombre}
                especie={servicio.especie}
                duracion={servicio.duracion}
                precio={servicio.precio}
                onSolicitar={props.onSolicitar}
              />
            </Col>
          ))}
        </Row>
      )}
    </section>
  );
}

export default ListaServicios;