function Boton(props) {
  const variante = props.variante || "primary";
  const tipo = props.tipo || "button";

  return (
    <button
      type={tipo}
      className={`btn btn-${variante} btn-custom w-100`}
      onClick={props.onClick}
    >
      {props.texto}
    </button>
  );
}

export default Boton;