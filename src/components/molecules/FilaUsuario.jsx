import EtiquetaActivo from "../atoms/EtiquetaActivo";
import Selector from "../atoms/Selector";
import Boton from "../atoms/Boton";
import { ROLES_OPCIONES, ETIQUETA_ROL } from "../../data/roles";

function FilaUsuario(props) {
  const u = props.usuario;

  return (
    <tr>
      <td className="fw-semibold">
        {u.nombre}
        {props.esPropio && " (tú)"}
      </td>
      <td>{u.email}</td>
      <td style={{ minWidth: 180 }}>
        {props.esPropio ? (
          ETIQUETA_ROL[u.rol]
        ) : (
          <>
            <label htmlFor={`rol-${u.id}`} className="visually-hidden">
              Rol de {u.nombre}
            </label>
            <Selector
              id={`rol-${u.id}`}
              name="rol"
              className="form-select-sm"
              placeholder="Rol"
              opciones={ROLES_OPCIONES}
              valor={u.rol}
              onChange={(e) => props.onCambiarRol(u.id, e.target.value)}
            />
          </>
        )}
      </td>
      <td>
        <EtiquetaActivo activo={u.activo} />
      </td>
      <td>
        {props.esPropio ? (
          <span className="text-muted">—</span>
        ) : (
          <Boton
            texto={u.activo ? "Desactivar" : "Reactivar"}
            variante={u.activo ? "outline-danger" : "outline-primary"}
            className="btn-sm"
            onClick={() => props.onAlternarEstado(u)}
          />
        )}
      </td>
    </tr>
  );
}

export default FilaUsuario;