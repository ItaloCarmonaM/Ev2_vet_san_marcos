function Casilla(props) {
  return (
    <div className="form-check">
      <input
        id={props.id}
        name={props.name}
        type="checkbox"
        className="form-check-input"
        checked={props.marcada}
        onChange={props.onChange}
      />
      <label htmlFor={props.id} className="form-check-label">
        {props.etiqueta}
      </label>
    </div>
  );
}

export default Casilla;