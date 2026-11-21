import { useState } from "react";
import PlantillaAdmin from "../components/templates/PlantillaAdmin";
import FormularioServicio from "../components/organisms/FormularioServicio";
import Boton from "../components/atoms/Boton";
import Alerta from "../components/atoms/Alerta";
import Cargando from "../components/atoms/Cargando";
import { useServicios } from "../hooks/useServicios";
import { formatearPrecio } from "../utils/formato";
import { obtenerMensajeError } from "../services/errores";

export default function AdminServicios() {
  const {
    servicios,
    cargando,
    error,
    agregarServicio,
    actualizarServicio,
    eliminarServicio,
  } = useServicios();
  const [editando, setEditando] = useState(null);
  const [errorAccion, setErrorAccion] = useState("");

  async function guardar(datos) {
    setErrorAccion("");
    try {
      if (editando) {
        await actualizarServicio(editando.id ?? editando.codigo, datos);
        setEditando(null);
      } else {
        await agregarServicio(datos);
      }
    } catch (e) {
      setErrorAccion(obtenerMensajeError(e));
    }
  }

  async function eliminar(servicio) {
    if (!window.confirm("¿Eliminar este servicio?")) return;
    setErrorAccion("");
    const clave = servicio.id ?? servicio.codigo;
    try {
      await eliminarServicio(clave);
      if ((editando?.id ?? editando?.codigo) === clave) setEditando(null);
    } catch (e) {
      setErrorAccion(obtenerMensajeError(e));
    }
  }

  return (
    <PlantillaAdmin titulo="Administrar servicios">
      {(error || errorAccion) && <Alerta texto={errorAccion || error} />}

      <FormularioServicio
        key={editando?.id ?? editando?.codigo ?? "nuevo"}
        servicio={editando}
        onGuardar={guardar}
        onCancelar={() => setEditando(null)}
      />

      {cargando ? (
        <Cargando texto="Cargando servicios..." />
      ) : servicios.length === 0 ? (
        <p className="text-secondary text-center">
          No hay servicios en la base de datos. Agrega el primero con el formulario.
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
                  <tr key={s.id ?? s.codigo}>
                    <td className="font-monospace">{s.codigo ?? s.id}</td>
                    <td className="fw-semibold">{s.nombre}</td>
                    <td>{s.categoria}</td>
                    <td>${formatearPrecio(s.precio)}</td>
                    <td className="text-end">
                      <div className="d-inline-flex gap-2">
                        <Boton
                          texto="Editar"
                          variante="outline-primary"
                          className="btn-sm"
                          onClick={() => setEditando(s)}
                        />
                        <Boton
                          texto="Eliminar"
                          variante="outline-danger"
                          className="btn-sm"
                          onClick={() => eliminar(s)}
                        />
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
