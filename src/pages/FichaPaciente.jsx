import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import PlantillaAdmin from "../components/templates/PlantillaAdmin";
import DatosPaciente from "../components/molecules/DatosPaciente";
import AlertaVacunas from "../components/molecules/AlertaVacunas";
import HistorialAtenciones from "../components/organisms/HistorialAtenciones";
import TablaVacunas from "../components/organisms/TablaVacunas";
import FormularioAtencion from "../components/organisms/FormularioAtencion";
import Boton from "../components/atoms/Boton";
import { useCitas } from "../hooks/useCitas";
import { usePacientes } from "../hooks/usePacientes";
import { fechaHoy } from "../utils/horario";
import { PERFILES } from "../data/perfiles";

export default function FichaPaciente() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { pacientes, agregarAtencion } = usePacientes();
  const { ocupadas, agregarCita } = useCitas();
  const [mensaje, setMensaje] = useState("");

  const paciente = pacientes.find((p) => p.id === Number(id));

  if (!paciente) {
    return (
      <PlantillaAdmin titulo="Paciente no encontrado" perfil="veterinario">
        <p className="text-muted">No existe un paciente con ese código.</p>
        <Boton texto="Volver a pacientes" onClick={() => navigate("/veterinario")} />
      </PlantillaAdmin>
    );
  }

  function guardar(datos) {
    agregarAtencion(paciente.id, {
      fecha: fechaHoy(),
      motivo: datos.motivo,
      diagnostico: datos.diagnostico,
      medicamentos: datos.medicamentos,
      veterinario: PERFILES.veterinario.usuario,
    });

    if (datos.control) {
      agregarCita({
        mascota: paciente.nombre,
        especie: paciente.especie,
        servicio: "Control de seguimiento",
        fecha: datos.control.fecha,
        hora: datos.control.hora,
      });
    }
    setMensaje(datos.control ? "Atención registrada y control agendado." : "Atención registrada.");
  }

  return (
    <PlantillaAdmin titulo={`Ficha de ${paciente.nombre}`} perfil="veterinario">
      <Boton texto="← Volver a pacientes" variante="link" className="px-0 mb-3" onClick={() => navigate("/veterinario")} />

      <DatosPaciente paciente={paciente} />

      <section className="mb-5">
        <h2 className="h4 fw-bold mb-3">Historial de atenciones</h2>
        <HistorialAtenciones atenciones={paciente.atenciones} />
      </section>

      <section className="mb-5">
        <h2 className="h4 fw-bold mb-3">Vacunas</h2>
        <AlertaVacunas vacunas={paciente.vacunas} nombre={paciente.nombre} />
        <TablaVacunas vacunas={paciente.vacunas} />
      </section>

      <section>
        <h2 className="h4 fw-bold mb-3">Registrar nueva atención</h2>
        {mensaje && (
          <div className="alert alert-success" role="status">
            {mensaje}
          </div>
        )}
        {/* La key reinicia el formulario después de guardar */}
        <FormularioAtencion key={paciente.atenciones.length} ocupadas={ocupadas} onGuardar={guardar} />
      </section>
    </PlantillaAdmin>
  );
}