function DatosPaciente(props) {
  const datos = [
    ["Dueño", props.paciente.duenio],
    ["Especie", props.paciente.especie],
    ["Raza", props.paciente.raza],
    ["Edad", props.paciente.edad],
    ["Peso", props.paciente.peso],
  ];

  return (
    <div className="card p-3 mb-4">
      <div className="row g-3">
        {datos.map(([etiqueta, valor]) => (
          <div key={etiqueta} className="col-6 col-md">
            <small className="text-muted d-block">{etiqueta}</small>
            <span className="fw-semibold">{valor}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DatosPaciente;