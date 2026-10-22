import FilaVacuna from "../molecules/FilaVacuna";

function TablaVacunas(props) {
  const vacunas = props.vacunas || [];

  if (vacunas.length === 0) {
    return <p className="text-muted">Sin vacunas registradas.</p>;
  }

  return (
    <div className="card shadow-sm">
      <div className="table-responsive">
        <table className="table table-hover align-middle mb-0">
          <thead>
            <tr>
              <th scope="col">Vacuna</th>
              <th scope="col">Fecha aplicada</th>
              <th scope="col">Próxima dosis</th>
              <th scope="col">Estado</th>
            </tr>
          </thead>
          <tbody>
            {vacunas.map((v) => (
              <FilaVacuna key={v.id} vacuna={v} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TablaVacunas;