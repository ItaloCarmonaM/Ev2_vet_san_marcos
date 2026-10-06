import React from 'react';
import EtiquetaEspecie from '../atoms/EtiquetaEspecie';
import EtiquetaEstadoCita from '../atoms/EtiquetaEstadoCita';
import Boton from '../atoms/Boton';

function FilaCita({ cita, onAccion }) {
  const { servicio, mascota, especie, fecha, hora, estado } = cita;

  return (
    <div className="d-flex align-items-center justify-content-between p-3 mb-2 border rounded bg-white shadow-sm">
      <div className="d-flex align-items-center gap-3">
        <div>
          <h6 className="mb-0 fw-bold">{servicio}</h6>
          <small className="text-muted">
            Mascota: {mascota} • {fecha} {hora}
          </small>
        </div>
        <EtiquetaEspecie especie={especie} />
        <EtiquetaEstadoCita estado={estado} />
      </div>

      {onAccion && (
        <Boton
          texto="Ver Detalle"
          onClick={() => onAccion(cita)}
          variante="outline-primary"
        />
      )}
    </div>
  );
}

export default FilaCita;