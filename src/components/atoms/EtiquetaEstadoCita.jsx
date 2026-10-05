import React from 'react';
import Badge from 'react-bootstrap/Badge';

function EtiquetaEstadoCita({ estado = "Pendiente" }) {
  const obtenerVariante = (est) => {
    switch (est.toLowerCase()) {
      case 'confirmada':
        return 'success';
      case 'pendiente':
        return 'warning';
      case 'cancelada':
        return 'danger';
      case 'completada':
        return 'info';
      default:
        return 'secondary';
    }
  };

  return (
    <Badge bg={obtenerVariante(estado)}>
      {estado}
    </Badge>
  );
}

export default EtiquetaEstadoCita;