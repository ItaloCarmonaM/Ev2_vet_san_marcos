import PlantillaAdmin from "../components/templates/PlantillaAdmin";
import TablaCitas from "../components/organisms/TablaCitas";
import { useCitas } from "../hooks/useCitas";

export default function AdminCitas() {
  const { citas, cambiarEstado } = useCitas();

  return (
    <PlantillaAdmin titulo="Administrar citas">
      <TablaCitas citas={citas} onCambiarEstado={cambiarEstado} />
    </PlantillaAdmin>
  );
}