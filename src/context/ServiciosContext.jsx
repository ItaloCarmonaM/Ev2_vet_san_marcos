import { createContext, useState, useEffect, useCallback } from "react";
import {
  listarServicios,
  crearServicio,
  actualizarServicio as actualizarServicioApi,
  eliminarServicio as eliminarServicioApi,
} from "../services/servicioService";
import { obtenerMensajeError } from "../services/errores";

export const ServiciosContext = createContext(null);

export function ServiciosProvider({ children }) {
  const [servicios, setServicios] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  const recargarServicios = useCallback(async () => {
    setCargando(true);
    setError("");
    try {
      const lista = await listarServicios();
      setServicios(Array.isArray(lista) ? lista : []);
    } catch (e) {
      setError(obtenerMensajeError(e));
    } finally {
      setCargando(false);
    }
  }, []);

  useEffect(() => {
    recargarServicios();
  }, [recargarServicios]);

  async function agregarServicio(datos) {
    const creado = await crearServicio(datos);
    setServicios((anterior) => [...anterior, creado]);
    return creado;
  }

  async function actualizarServicio(idOCodigo, datos) {
    const actualizado = await actualizarServicioApi(idOCodigo, datos);
    setServicios((anterior) =>
      anterior.map((s) => ((s.id ?? s.codigo) === idOCodigo ? actualizado : s))
    );
    return actualizado;
  }

  async function eliminarServicio(idOCodigo) {
    await eliminarServicioApi(idOCodigo);
    setServicios((anterior) =>
      anterior.filter((s) => (s.id ?? s.codigo) !== idOCodigo)
    );
  }

  return (
    <ServiciosContext.Provider
      value={{
        servicios,
        cargando,
        error,
        recargarServicios,
        agregarServicio,
        actualizarServicio,
        eliminarServicio,
      }}
    >
      {children}
    </ServiciosContext.Provider>
  );
}
