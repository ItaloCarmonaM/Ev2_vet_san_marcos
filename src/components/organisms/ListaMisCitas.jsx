import FilaCita from "../molecules/FilaCita";
import Boton from "../atoms/Boton";

function ListaMisCitas(props) {
  const citas = [...(props.citas || [])].sort((a, b) =>
    `${a.fecha} ${a.hora}`.localeCompare(`${b.fecha} ${b.hora}`)
  );

  if (citas.length === 0) {
    return (
      <div className="text-center text-muted py-5">
        <p>Aún no tienes citas.</p>
        {props.onSolicitar && (
          <Boton texto="Solicitar una cita" onClick={() => props.onSolicitar()} />
        )}
      </div>
    );
  }

  return (
    <div>
      {citas.map((c) => (
        <FilaCita key={c.id} cita={c} onAccion={props.onVerDetalle} />
      ))}
    </div>
  );
}

export default ListaMisCitas;