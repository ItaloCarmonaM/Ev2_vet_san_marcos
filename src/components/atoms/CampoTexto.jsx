import CampoTexto from "../atoms/CampoTexto";
import Selector from "../atoms/Selector";

function CampoFormulario(props) {
  return (
    <div className="mb-3 campo-grupo">
      {props.etiqueta && (
        <label htmlFor={props.id} className="form-label etiqueta-campo fw-bold">
          {props.etiqueta}
        </label>
      )}

      {props.opciones ? (
        <Selector
          id={props.id}
          name={props.name}
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