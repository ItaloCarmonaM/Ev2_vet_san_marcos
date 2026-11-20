import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import PlantillaPublica from "../components/templates/PlantillaPublica";
import Boton from "../components/atoms/Boton";
import { useTituloPagina } from "../hooks/useTituloPagina";

function SinPermiso() {
  const navigate = useNavigate();
  useTituloPagina("Sin permiso");

  return (
    <PlantillaPublica>
      <Container className="py-5 text-center">
        <h1 className="h3 fw-bold">No tienes permiso para ver esta página</h1>
        <p className="text-muted">Tu rol no tiene acceso a esta sección.</p>
        <Boton texto="Volver al inicio" onClick={() => navigate("/")} />
      </Container>
    </PlantillaPublica>
  );
}

export default SinPermiso;