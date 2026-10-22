import Badge from "react-bootstrap/Badge";

function EtiquetaEstadoVacuna({ estado = "Al día" }) {
  const obtenerVariante = (est) => {
    switch (est.toLowerCase()) {
      case "al día":
        return "success";
      case "próxima a vencer":
        return "warning";
      case "vencida":
        return "danger";
      default:
        return "secondary";
    }
  };

  return <Badge bg={obtenerVariante(estado)}>{estado}</Badge>;
}

export default EtiquetaEstadoVacuna;