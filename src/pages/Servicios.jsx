import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import PlantillaPublica from "../components/templates/PlantillaPublica";
import BuscadorServicios from "../components/molecules/BuscadorServicios";
import CampoFormulario from "../components/molecules/CampoFormulario";
import ListaServicios from "../components/organisms/ListaServicios";
import serviciosData from "../data/servicios";
import { normalizarTexto } from "../utils/formato";

// Categorías sacadas del catálogo, sin repetir
const CATEGORIAS = [...new Set(serviciosData.map((s) => s.categoria))].map(
(c) => ({ valor: c, texto: c })
);

function Servicios() {
  const [busqueda, setBusqueda] = useState("");
  const [categoria, setCategoria] = useState("");

  const texto = normalizarTexto(busqueda.trim());

  const serviciosFiltrados = serviciosData.filter((s) => {
    const coincideTexto =
      normalizarTexto(s.nombre).includes(texto) ||
      normalizarTexto(s.observaciones).includes(texto);
    const coincideCategoria = categoria === "" || s.categoria === categoria;
    return coincideTexto && coincideCategoria;
  });

  function manejarSeleccionarServicio(servicio) {
    alert(`Has seleccionado el servicio: ${servicio.nombre}`);
  }

  return (
    <PlantillaPublica>
      <Container className="py-4">
        <header className="mb-4 text-center">
          <h1 className="fw-bold text-primary">Nuestros Servicios Médicos</h1>
          <p className="text-muted fs-5">
            Conoce nuestras prestaciones para el cuidado y salud integral de tu mascota.
          </p>
        </header>

        <section className="mb-4">
          <Row className="g-3 align-items-start">
            <Col md={8}>
              <BuscadorServicios
                valor={busqueda}
                onChange={(e) => setBusqueda(e.target.value)}
              />
            </Col>
            <Col md={4}>
              <CampoFormulario
                id="filtroCategoria"
                name="categoria"
                tipo="select"
                opciones={CATEGORIAS}
                placeholder="Todas las categorías"
                valor={categoria}
                onChange={(e) => setCategoria(e.target.value)}
              />
            </Col>
          </Row>
        </section>

        <section>
          <ListaServicios
            servicios={serviciosFiltrados}
            onSeleccionarServicio={manejarSeleccionarServicio}
          />
        </section>
      </Container>
    </PlantillaPublica>
  );
}

export default Servicios;