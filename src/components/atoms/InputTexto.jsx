function InputTexto(props) {
  const tipo = props.tipo || "text";

  return (
    <input
      type={tipo}
      className="form-control campo-input"
      placeholder={props.placeholder}
      value={props.valor}
      onChange={props.onChange}
      required={props.requerido}
    />
  );
}

export default InputTexto;