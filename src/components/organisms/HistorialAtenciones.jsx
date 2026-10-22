import { formatearFecha } from "../../utils/formato";

function HistorialAtenciones(props) {
  const atenciones = [...(props.atenciones || [])].sort((a, b) => b.fecha.localeCompare(a.fecha));

  if (atenciones.length === 0) {
    return <p className="text-muted">Este paciente aún no tiene atenciones.</p>;
  }

  return (
    <div className="card shadow-sm">
      <div className="table-responsive">
        <table className="table table-hover align-middle mb-0">
          <thead>
            <tr>
              <th scope="col">Fecha</th>
              <th scope="col">Motivo</th>
              <th scope="col">Diagnóstico</th>
              <th scope="col">Medicamentos</th>
              <th scope="col">Veterinario</th>
            </tr>
          </thead>
          <tbody>
            {atenciones.map((a) => (
              <tr key={a.id}>
                <td>{formatearFecha(a.fecha)}</td>
                <td>{a.motivo}</td>
                <td>{a.diagnostico}</td>
                <td>{a.medicamentos || "—"}</td>
                <td>{a.veterinario}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default HistorialAtenciones;