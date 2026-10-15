import { useState } from "react";
import PlantillaAdmin from "../components/templates/PlantillaAdmin";
import TablaCitas from "../components/organisms/TablaCitas";

const INICIAL = [
  { id: 1, mascota: "Rocky", especie: "Perro", servicio: "Vacunación", fecha: "2026-10-20", hora: "10:00", estado: "Pendiente" },
  { id: 2, mascota: "Misu", especie: "Gato", servicio: "Consulta general", fecha: "2026-10-21", hora: "15:30", estado: "Confirmada" },
];

export default function AdminCitas() {
  const [citas, setCitas] = useState(INICIAL);

  const cambiarEstado = (id, estado) => {
    setCitas((prev) => prev.map((c) => (c.id === id ? { ...c, estado } : c)));
  };

  return (
    <PlantillaAdmin titulo="Administrar citas">
      <TablaCitas citas={citas} onCambiarEstado={cambiarEstado} />
    </PlantillaAdmin>
  );
}