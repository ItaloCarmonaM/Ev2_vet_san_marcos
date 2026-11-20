import FilaUsuario from "../molecules/FilaUsuario";

function TablaUsuarios(props) {
  const usuarios = props.usuarios || [];

  if (usuarios.length === 0) {
    return <p className="text-center text-muted py-4">No hay usuarios registrados.</p>;
  }

  return (
    <div className="card shadow-sm">
      <div className="table-responsive">
        <table className="table table-hover align-middle mb-0">
          <thead>
            <tr>
              <th scope="col">Nombre</th>
              <th scope="col">Correo</th>
              <th scope="col">Rol</th>
              <th scope="col">Estado</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((u) => (
              <FilaUsuario
                key={u.id}
                usuario={u}
                esPropio={u.id === props.idActual}
                onCambiarRol={props.onCambiarRol}
                onAlternarEstado={props.onAlternarEstado}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TablaUsuarios;