const ESTADOS = ["Pendiente", "Confirmada", "Cancelada"];

export default function TablaCitas({ citas, onCambiarEstado }) {
  if (citas.length === 0) {
    return <p>No hay citas registradas.</p>;
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Mascota</th>
          <th>Especie</th>
          <th>Servicio</th>
          <th>Fecha</th>
          <th>Hora</th>
          <th>Estado</th>
        </tr>
      </thead>
      <tbody>
        {citas.map((cita) => (
          <tr key={cita.id}>
            <td>{cita.mascota}</td>
            <td>{cita.especie}</td>
            <td>{cita.servicio}</td>
            <td>{cita.fecha}</td>
            <td>{cita.hora}</td>
            <td>
              <select
                aria-label={`Estado de la cita de ${cita.mascota}`}
                value={cita.estado}
                onChange={(e) => onCambiarEstado(cita.id, e.target.value)}
              >
                {ESTADOS.map((estado) => (
                  <option key={estado} value={estado}>{estado}</option>
                ))}
              </select>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}