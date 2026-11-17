import EtiquetaEstadoVacuna from "../atoms/EtiquetaEstadoVacuna";
import { formatearFecha } from "../../utils/formato";
import { estadoVacuna } from "../../utils/vacunas";

function FilaVacuna(props) {
  return (
    <tr>
      <td className="fw-semibold">{props.vacuna.nombre}</td>
      <td>{formatearFecha(props.vacuna.aplicada)}</td>
      <td>{formatearFecha(props.vacuna.proxima)}</td>
      <td>
        <EtiquetaEstadoVacuna estado={estadoVacuna(props.vacuna.proxima)} />
      </td>
    </tr>
  );
}

export default FilaVacuna;