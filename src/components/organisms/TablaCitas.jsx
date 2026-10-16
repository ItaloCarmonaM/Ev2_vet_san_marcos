import FilaTablaCita from "../molecules/FilaTablaCita";

function TablaCitas(props) {
  const citas = props.citas || [];

  if (citas.length === 0) {
    return <p className="text-center text-muted py-5">No hay citas registradas.</p>;
  }

  return (
    <div className="card shadow-sm">
      <div className="table-responsive">
        <table className="table table-hover align-middle mb-0">
          <thead>
            <tr>
              <th scope="col">Fecha</th>
              <th scope="col">Hora</th>
              <th scope="col">Mascota</th>
              <th scope="col">Servicio</th>
              <th scope="col">Estado</th>
              {props.onCambiarEstado && <th scope="col">Acciones</th>}
            </tr>
          </thead>
          <tbody>
            {citas.map((c) => (
              <FilaTablaCita key={c.id} cita={c} onCambiarEstado={props.onCambiarEstado} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TablaCitas;