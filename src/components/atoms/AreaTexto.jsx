function AreaTexto(props) {
  const className = props.className ? `form-control campo-input ${props.className}` : "form-control campo-input";

  return (
    <textarea
      id={props.id}
      name={props.name}
      rows={props.filas || 3}
      className={className}
      placeholder={props.placeholder}
      value={props.valor}
      onChange={props.onChange}
    />
  );
}

export default AreaTexto;