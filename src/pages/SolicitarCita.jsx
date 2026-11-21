import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import PlantillaPublica from "../components/templates/PlantillaPublica";
import FormularioSolicitudCita from "../components/organisms/FormularioSolicitudCita";
import Cargando from "../components/atoms/Cargando";
import Alerta from "../components/atoms/Alerta";
import { useTituloPagina } from "../hooks/useTituloPagina";
import { listarServicios } from "../services/servicioService";
import { crearCita, listarOcupadas } from "../services/citaService";
import { obtenerMensajeError } from "../services/errores";

function SolicitarCita() {
  const navigate = useNavigate();
  const params = useParams();
  const [servicios, setServicios] = useState([]);
  const [ocupadas, setOcupadas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  useTituloPagina("Solicitar cita");

  useEffect(() => {
    async function cargar() {
      try {
        const [svcs, ocup] = await Promise.all([listarServicios(), listarOcupadas()]);
        setServicios(svcs);
        setOcupadas(ocup);
      } catch (e) {
        setError(obtenerMensajeError(e));
      } finally {
        setCargando(false);
      }
    }
    cargar();
  }, []);

  const servicioInicial = servicios.some((s) => s.codigo === params.codigo)
    ? params.codigo : "";

  async function alSolicitar(datos) {
    setError("");
    try {
      const nueva = await crearCita({
        mascota_nombre: datos.mascota,
        especie: datos.especie,
        servicio_codigo: datos.servicio.codigo,
        fecha: datos.fecha,
        hora: datos.hora,
        motivo: datos.motivo || "",
      });
      navigate("/cita-confirmada", { state: { cita: nueva } });
    } catch (e) {
      setError(obtenerMensajeError(e));
    }
  }

  if (cargando) return <PlantillaPublica><Cargando texto="Cargando..." /></PlantillaPublica>;

  return (
    <PlantillaPublica>
      <Container className="py-4">
        <header className="mb-4 text-center">
          <h1 className="fw-bold text-primary">Solicitar una cita</h1>
          <p className="text-muted fs-5">
            Completa el formulario y nuestra recepcionista confirmará tu hora.
          </p>
        </header>
        {error && <Alerta texto={error} />}
        <Row className="justify-content-center">
          <Col md={8} lg={5}>
            <FormularioSolicitudCita
              key={servicioInicial}
              servicios={servicios}
              servicioInicial={servicioInicial}
              ocupadas={ocupadas}
              onSolicitar={alSolicitar}
            />
          </Col>
        </Row>
      </Container>
    </PlantillaPublica>
  );
}

export default SolicitarCita;