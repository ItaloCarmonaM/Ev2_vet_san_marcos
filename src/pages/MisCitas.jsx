import { Container } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import PlantillaPublica from "../components/templates/PlantillaPublica";
import ListaMisCitas from "../components/organisms/ListaMisCitas";
import Boton from "../components/atoms/Boton";
import Cargando from "../components/atoms/Cargando";
import Alerta from "../components/atoms/Alerta";
import { useCitas } from "../hooks/useCitas";
import { useTituloPagina } from "../hooks/useTituloPagina";

function MisCitas() {
  const navigate = useNavigate();
  const { citas, cargando, error } = useCitas();
  useTituloPagina("Mis citas");

  return (
    <PlantillaPublica>
      <Container className="py-4">
        <header className="mb-4 d-flex flex-wrap align-items-center justify-content-between gap-3">
          <h1 className="fw-bold text-primary mb-0">Mis citas</h1>
          <Boton texto="Solicitar cita" onClick={() => navigate("/solicitar-cita")} />
        </header>

        {error && <Alerta texto={error} />}
        {cargando ? (
          <Cargando texto="Cargando tus citas..." />
        ) : (
          <ListaMisCitas citas={citas} onSolicitar={() => navigate("/solicitar-cita")} />
        )}
      </Container>
    </PlantillaPublica>
  );
}

export default MisCitas;
