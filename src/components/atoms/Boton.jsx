function Boton(props) {
  const variante = props.variante || "primary";
  const tipo = props.tipo || "button";
  const className = props.className ? `btn btn-${variante} ${props.className}` : `btn btn-${variante}`;

  return (
    <button
      type={tipo}
      className={className}
      onClick={props.onClick}
    >
      {props.texto}
    </button>
  );
}

export default Boton;