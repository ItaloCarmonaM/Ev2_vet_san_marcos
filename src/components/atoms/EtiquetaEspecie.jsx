import React from 'react';
import Badge from 'react-bootstrap/Badge';

function EtiquetaEspecie({ especie = "General" }) {
  const obtenerVariante = (esp) => {
    switch (esp.toLowerCase()) {
      case 'perro':
        return 'primary';
      case 'gato':
        return 'info';
      case 'exótico':
      case 'exotico':
        return 'warning';
      case 'ave':
        return 'success';
      default:
        return 'secondary';
    }
  };

  return (
    <Badge bg={obtenerVariante(especie)} className="me-1">
      {especie}
    </Badge>
  );
}

export default EtiquetaEspecie;