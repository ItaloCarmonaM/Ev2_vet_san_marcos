import { useEffect, useState } from "react";
import PlantillaAdmin from "../components/templates/PlantillaAdmin";
import TablaCitas from "../components/organisms/TablaCitas";
import Cargando from "../components/atoms/Cargando";
import Alerta from "../components/atoms/Alerta";
import { listarCitas, cambiarEstadoCita } from "../services/citaService";
import { obtenerMensajeError } from "../services/errores";

export default function AdminCitas() {
  const [citas, setCitas] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [exito, setExito] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    async function cargar() {
      try {
        const datos = await listarCitas();
        setCitas(datos);
      } catch (e) {
        setError(obtenerMensajeError(e));
      } finally {
        setCargando(false);
      }
    }
    cargar();
  }, []);

  async function cambiarEstado(id, estado) {
    setExito(""); setError("");
    try {
      const actualizada = await cambiarEstadoCita(id, estado);
      setCitas((prev) => prev.map((c) => c.id === actualizada.id ? actualizada : c));
      setExito("Estado actualizado correctamente.");
    } catch (e) {
      setError(obtenerMensajeError(e));
    }
  }

  return (
    <PlantillaAdmin titulo="Administrar citas">
      {exito && <Alerta variante="success" texto={exito} />}
      {error && <Alerta texto={error} />}
      {cargando ? (
        <Cargando texto="Cargando citas..." />
      ) : (
        <TablaCitas citas={citas} onCambiarEstado={cambiarEstado} />
      )}
    </PlantillaAdmin>
  );
}