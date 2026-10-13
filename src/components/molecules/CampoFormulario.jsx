import CampoTexto from "../atoms/CampoTexto";
import Selector from "../atoms/Selector";

function CampoFormulario(props) {
  const esSelector = props.tipo === "select" || Boolean(props.opciones);
  const className = `${props.className || ""} ${props.error ? "is-invalid" : ""}`.trim();

  return (
    <div className="mb-3 campo-grupo">
      {props.etiqueta && (
        <label htmlFor={props.id} className="form-label etiqueta-campo fw-bold">
          {props.etiqueta}
        </label>
      )}
      {esSelector ? (
        <Selector
          id={props.id}
          name={props.name}
          className={className}
          opciones={props.opciones}
          placeholder={props.placeholder}
          valor={props.valor}
          onChange={props.onChange}
          requerido={props.requerido}
        />
      ) : (
        <CampoTexto
          id={props.id}
          name={props.name}
          className={className}
          tipo={props.tipo}
          placeholder={props.placeholder}
          valor={props.valor}
          onChange={props.onChange}
          requerido={props.requerido}
        />
      )}
      {props.error && <div className="text-danger small mt-1">{props.error}</div>}
    </div>
  );
}

export default CampoFormulario;