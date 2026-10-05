function CampoTexto(props) {
  const tipo = props.tipo || "text";
  const className = props.className ? `form-control campo-input ${props.className}` : "form-control campo-input";

  return (
    <input
      id={props.id}
      name={props.name}
      type={tipo}
      className={className}
      placeholder={props.placeholder}
      value={props.valor}
      onChange={props.onChange}
      required={props.requerido}  
    />
  );
}

export default CampoTexto;