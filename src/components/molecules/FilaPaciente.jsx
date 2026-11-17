import EtiquetaEspecie from "../atoms/EtiquetaEspecie";
import Boton from "../atoms/Boton";
import { formatearFecha } from "../../utils/formato";
import { ultimaAtencion } from "../../utils/pacientes";

function FilaPaciente(props) {
  const ultima = ultimaAtencion(props.paciente);

  return (
    <tr>
      <td className="fw-semibold">{props.paciente.nombre}</td>
      <td>{props.paciente.duenio}</td>
      <td>
        <EtiquetaEspecie especie={props.paciente.especie} />
      </td>
      <td>{ultima ? formatearFecha(ultima.fecha) : "—"}</td>
      <td>{ultima ? ultima.motivo : "—"}</td>
      <td>
        <Boton
          texto="Ver ficha"
          variante="outline-primary"
          className="btn-sm"
          onClick={() => props.onVerFicha(props.paciente)}
        />
      </td>
    </tr>
  );
}

export default FilaPaciente;