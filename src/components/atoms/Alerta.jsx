import Alert from "react-bootstrap/Alert";

function Alerta(props) {
  return (
    <Alert variant={props.variante || "danger"} className={props.className}>
      {props.texto}
    </Alert>
  );
}

export default Alerta;