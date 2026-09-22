import InputTexto from "../atoms/InputTexto";

function CampoFormulario(props) {
  return (
    <div className="campo-grupo">
      <label className="form-label etiqueta-campo">{props.etiqueta}</label>
      <InputTexto
        tipo={props.tipo}
        placeholder={props.placeholder}
        valor={props.valor}
        onChange={props.onChange}
        requerido={props.requerido}
      />
    </div>
  );
}

export default CampoFormulario;