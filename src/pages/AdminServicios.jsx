import { useState } from "react";
import PlantillaAdmin from "../components/templates/PlantillaAdmin";
import FormularioServicio from "../components/organisms/FormularioServicio";

const INICIAL = [
  { id: 1, nombre: "Consulta general", categoria: "Consultas", precio: 15000, descripcion: "Revisión general de la mascota." },
  { id: 2, nombre: "Vacunación", categoria: "Prevención", precio: 12000, descripcion: "Vacunas al día." },
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
        <p>No hay servicios. Agrega el primero con el formulario.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Categoría</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {servicios.map((s) => (
              <tr key={s.id}>
                <td>{s.nombre}</td>
                <td>{s.categoria}</td>
                <td>${s.precio.toLocaleString("es-CL")}</td>
                <td>
                  <button type="button" onClick={() => setEditando(s)}>Editar</button>
                  <button type="button" onClick={() => eliminar(s.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </PlantillaAdmin>
  );
}