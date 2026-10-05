function Selector(props) {
  const opciones = props.opciones || [];
  const clases = `form-select campo-input ${props.className || ""}`.trim();

  return (
    <select
      id={props.id}
      name={props.name}
      className={clases}
      value={props.valor}
      onChange={props.onChange}
      required={props.requerido}
    >
      <option value="">{props.placeholder || "Selecciona una opción"}</option>
      {opciones.map((opcion) => (
        <option key={opcion.valor} value={opcion.valor}>
          {opcion.texto}
        </option>
      ))}
    </select>
  );
}

export default Selector;