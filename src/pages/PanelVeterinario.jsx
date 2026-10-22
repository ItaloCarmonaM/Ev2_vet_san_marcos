import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PlantillaAdmin from "../components/templates/PlantillaAdmin";
import TablaCitas from "../components/organisms/TablaCitas";
import TablaPacientes from "../components/organisms/TablaPacientes";
import BuscadorPacientes from "../components/molecules/BuscadorPacientes";
import { useCitas } from "../hooks/useCitas";
import { usePacientes } from "../hooks/usePacientes";
import { fechaHoy } from "../utils/horario";
import { filtrarPacientes } from "../utils/pacientes";

export default function PanelVeterinario() {
  const navigate = useNavigate();
  const { citas } = useCitas();
  const { pacientes } = usePacientes();
  const [busqueda, setBusqueda] = useState("");

  const hoy = fechaHoy();
  const agenda = citas
    .filter((c) => (c.estado === "Pendiente" || c.estado === "Confirmada") && c.fecha >= hoy)
    .sort((a, b) => `${a.fecha} ${a.hora}`.localeCompare(`${b.fecha} ${b.hora}`));

  return (
    <PlantillaAdmin titulo="Panel del veterinario" perfil="veterinario">
      <section className="mb-5">
        <h2 className="h4 fw-bold">Agenda</h2>
        <p className="text-muted">Citas pendientes y confirmadas, desde hoy en adelante.</p>
        <TablaCitas citas={agenda} />
      </section>

      <section>
        <h2 className="h4 fw-bold mb-3">Pacientes</h2>
        <BuscadorPacientes valor={busqueda} onChange={(e) => setBusqueda(e.target.value)} />
        <TablaPacientes
          pacientes={filtrarPacientes(pacientes, busqueda)}
          onVerFicha={(p) => navigate(`/veterinario/paciente/${p.id}`)}
        />
      </section>
    </PlantillaAdmin>
  );
}