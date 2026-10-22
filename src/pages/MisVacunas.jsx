import { Container } from "react-bootstrap";
import PlantillaPublica from "../components/templates/PlantillaPublica";
import AlertaVacunas from "../components/molecules/AlertaVacunas";
import TablaVacunas from "../components/organisms/TablaVacunas";
import EtiquetaEspecie from "../components/atoms/EtiquetaEspecie";
import { usePacientes } from "../hooks/usePacientes";
import { useTituloPagina } from "../hooks/useTituloPagina";

const DUENIO_DEMO = "María Pérez";

function MisVacunas() {
  const { pacientes } = usePacientes();
  useTituloPagina("Mis vacunas");

  const mascotas = pacientes.filter((p) => p.duenio === DUENIO_DEMO);

  return (
    <PlantillaPublica>
      <Container className="py-4">
        <header className="mb-4 text-center">
          <h1 className="fw-bold text-primary">Historial de vacunación</h1>
          <p className="text-muted fs-5">Revisa qué vacunas están al día y cuáles están por vencer.</p>
        </header>

        {mascotas.map((m) => (
          <section key={m.id} className="mb-5">
            <h2 className="h4 fw-bold mb-3">
              {m.nombre} <EtiquetaEspecie especie={m.especie} />
            </h2>
            <AlertaVacunas vacunas={m.vacunas} nombre={m.nombre} />
            <TablaVacunas vacunas={m.vacunas} />
          </section>
        ))}
      </Container>
    </PlantillaPublica>
  );
}

export default MisVacunas;