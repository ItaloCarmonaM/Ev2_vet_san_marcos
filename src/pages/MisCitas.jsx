import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import PlantillaPublica from "../components/templates/PlantillaPublica";
import TablaCitas from "../components/organisms/TablaCitas";
import Boton from "../components/atoms/Boton";
import citas from "../data/citas";
import { useTituloPagina } from "../hooks/useTituloPagina";

// Ordenadas por fecha y hora
const ordenadas = [...citas].sort((a, b) =>
  `${a.fecha} ${a.hora}`.localeCompare(`${b.fecha} ${b.hora}`)
);

function MisCitas() {
  const navigate = useNavigate();
  useTituloPagina("Mis citas");

  return (
    <PlantillaPublica>
      <Container className="py-4">
        <header className="mb-4 d-flex flex-wrap align-items-center justify-content-between gap-3">
          <h1 className="fw-bold text-primary mb-0">Mis citas</h1>
          <Boton texto="Solicitar cita" onClick={() => navigate("/solicitar-cita")} />
        </header>

        <TablaCitas citas={ordenadas} />
      </Container>
    </PlantillaPublica>
  );
}

export default MisCitas;