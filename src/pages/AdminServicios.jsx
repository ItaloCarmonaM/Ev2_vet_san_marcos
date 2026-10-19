import { useState } from "react";
import PlantillaAdmin from "../components/templates/PlantillaAdmin";
import FormularioServicio from "../components/organisms/FormularioServicio";

const INICIAL = [
  { id: 1, nombre: "Consulta general", categoria: "Consultas", especie: "Perro / Gato", duracion: "30 min", precio: 15000, descripcion: "Revisión general de la mascota." },
  { id: 2, nombre: "Vacunación", categoria: "Prevención", especie: "Perro / Gato", duracion: "10 min", precio: 12000, descripcion: "Vacunas al día." },
];

export default function AdminServicios() {
  const [servicios, setServicios] = useState(INICIAL);
  const [editando, setEditando] = useState(null);

  const guardar = (datos) => {
    if (editando) {
      setServicios((prev) =>
        prev.map((s) => (s.id === editando.id ? { ...s, ...datos } : s))
      );
      setEditando(null);
    } else {
      setServicios((prev) => [...prev, { ...datos, id: Date.now() }]);
    }
  };

  const eliminar = (id) => {
    if (window.confirm("¿Eliminar este servicio?")) {
      setServicios((prev) => prev.filter((s) => s.id !== id));
      if (editando?.id === id) setEditando(null);
    }
  };

  return (
    <PlantillaAdmin titulo="Administrar servicios">
      <FormularioServicio
        key={editando?.id ?? "nuevo"}
        servicio={editando}
        onGuardar={guardar}
        onCancelar={() => setEditando(null)}
      />

      {servicios.length === 0 ? (
        <p className="text-secondary text-center">
          No hay servicios. Agrega el primero con el formulario.
        </p>
      ) : (
        <div className="card border-0 shadow-sm">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Categoría</th>
                  <th>Precio</th>
                  <th className="text-end">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {servicios.map((s) => (
                  <tr key={s.id}>
                    <td className="fw-semibold">{s.nombre}</td>
                    <td>{s.categoria}</td>
                    <td>${s.precio.toLocaleString("es-CL")}</td>
                    <td className="text-end">
                      <div className="d-inline-flex gap-2">
                        <button type="button" className="btn btn-outline-primary btn-sm" onClick={() => setEditando(s)}>
                          Editar
                        </button>
                        <button type="button" className="btn btn-outline-danger btn-sm" onClick={() => eliminar(s.id)}>
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </PlantillaAdmin>
  );
}