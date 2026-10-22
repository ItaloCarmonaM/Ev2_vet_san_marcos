import EtiquetaEspecie from "../atoms/EtiquetaEspecie";
import Boton from "../atoms/Boton";
import { formatearFecha } from "../../utils/formato";
import { ultimaAtencion } from "../../utils/pacientes";

function FilaPaciente({ paciente, onVerFicha }) {
  const ultima = ultimaAtencion(paciente);

  return (
    <tr>
      <td className="fw-semibold">{paciente.nombre}</td>
      <td>{paciente.duenio}</td>
      <td>
        <EtiquetaEspecie especie={paciente.especie} />
      </td>
      <td>{ultima ? formatearFecha(ultima.fecha) : "—"}</td>
      <td>{ultima ? ultima.motivo : "—"}</td>
      <td>
        <Boton
          texto="Ver ficha"
          variante="outline-primary"
          className="btn-sm"
          onClick={() => onVerFicha(paciente)}
        />
      </td>
    </tr>
  );
}

export default FilaPaciente;