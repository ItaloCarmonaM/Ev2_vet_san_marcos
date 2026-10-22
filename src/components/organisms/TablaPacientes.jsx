import FilaPaciente from "../molecules/FilaPaciente";

// Props: pacientes, onVerFicha(paciente).
function TablaPacientes(props) {
  const pacientes = props.pacientes || [];

  if (pacientes.length === 0) {
    return <p className="text-center text-muted py-4">No hay pacientes que coincidan con la búsqueda.</p>;
  }

  return (
    <div className="card shadow-sm">
      <div className="table-responsive">
        <table className="table table-hover align-middle mb-0">
          <thead>
            <tr>
              <th scope="col">Mascota</th>
              <th scope="col">Dueño</th>
              <th scope="col">Especie</th>
              <th scope="col">Última visita</th>
              <th scope="col">Motivo</th>
              <th scope="col">Ficha</th>
            </tr>
          </thead>
          <tbody>
            {pacientes.map((p) => (
              <FilaPaciente key={p.id} paciente={p} onVerFicha={props.onVerFicha} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TablaPacientes;