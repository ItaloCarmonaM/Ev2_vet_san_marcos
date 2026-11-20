import Badge from "react-bootstrap/Badge";

function EtiquetaActivo(props) {
  return (
    <Badge bg={props.activo ? "success" : "danger"}>
      {props.activo ? "Activo" : "Desactivado"}
    </Badge>
  );
}

export default EtiquetaActivo;