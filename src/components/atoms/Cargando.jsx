import Spinner from "react-bootstrap/Spinner";

function Cargando(props) {
  return (
    <div className="text-center text-muted py-5" role="status">
      <Spinner animation="border" size="sm" className="me-2" />
      {props.texto || "Cargando..."}
    </div>
  );
}

export default Cargando;