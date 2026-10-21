import { useState } from "react";
import PlantillaAdmin from "../components/templates/PlantillaAdmin";
import FormularioServicio from "../components/organisms/FormularioServicio";
import Boton from "../components/atoms/Boton";
import { useServicios } from "../hooks/useServicios";
import { formatearPrecio } from "../utils/formato";

export default function AdminServicios() {
  const { servicios, agregarServicio, actualizarServicio, eliminarServicio } = useServicios();
  const [editando, setEditando] = useState(null);

  function guardar(datos) {
    if (editando) {
      actualizarServicio(editando.codigo, datos);
      setEditando(null);
    } else {
      agregarServicio(datos);
    }
  }

  function eliminar(codigo) {
    if (window.confirm("¿Eliminar este servicio?")) {
      eliminarServicio(codigo);
      if (editando?.codigo === codigo) setEditando(null);
    }
  }

  return (
    <PlantillaAdmin titulo="Administrar servicios">
      <FormularioServicio
        key={editando?.codigo ?? "nuevo"}
        servicio={editando}
        onGuardar={guardar}
        onCancelar={() => setEditando(null)}
      />

      {servicios.length === 0 ? (
        <p className="text-secondary text-center">
          No hay servicios. Agrega el primero con el formulario.
        </p>
      ) : (
        <div className="card shadow-sm">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Nombre</th>
                  <th>Categoría</th>
                  <th>Precio</th>
                  <th className="text-end">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {servicios.map((s) => (
                  <tr key={s.codigo}>
                    <td className="font-monospace">{s.codigo}</td>
                    <td className="fw-semibold">{s.nombre}</td>
                    <td>{s.categoria}</td>
                    <td>${formatearPrecio(s.precio)}</td>
                    <td className="text-end">
                      <div className="d-inline-flex gap-2">
                        <Boton texto="Editar" variante="outline-primary" className="btn-sm" onClick={() => setEditando(s)} />
                        <Boton texto="Eliminar" variante="outline-danger" className="btn-sm" onClick={() => eliminar(s.codigo)} />
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