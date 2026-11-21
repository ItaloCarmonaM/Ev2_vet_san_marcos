import { createContext, useState, useEffect, useCallback } from "react";
import {
  listarCitas,
  crearCita,
  cambiarEstadoCita,
  listarOcupadas,
} from "../services/citaService";
import { useAuth } from "../hooks/useAuth";
import { obtenerMensajeError } from "../services/errores";

export const CitasContext = createContext(null);

export function CitasProvider({ children }) {
  const { usuario } = useAuth();
  const [citas, setCitas] = useState([]);
  const [ocupadas, setOcupadas] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  const recargarCitas = useCallback(async () => {
    if (!usuario) {
      setCitas([]);
      setOcupadas([]);
      return;
    }
    setCargando(true);
    setError("");
    try {
      const [listaCitas, listaOcupadas] = await Promise.all([
        listarCitas(),
        listarOcupadas(),
      ]);
      setCitas(Array.isArray(listaCitas) ? listaCitas : []);
      setOcupadas(Array.isArray(listaOcupadas) ? listaOcupadas : []);
    } catch (e) {
      setError(obtenerMensajeError(e));
    } finally {
      setCargando(false);
    }
  }, [usuario]);

  useEffect(() => {
    recargarCitas();
  }, [recargarCitas]);

  async function agregarCita(dto) {
    const nueva = await crearCita(dto);
    setCitas((anterior) => [...anterior, nueva]);
    return nueva;
  }

  async function cambiarEstado(id, estado) {
    const actualizada = await cambiarEstadoCita(id, estado);
    setCitas((anterior) =>
      anterior.map((c) => (c.id === actualizada.id ? actualizada : c))
    );
    return actualizada;
  }

  return (
    <CitasContext.Provider
      value={{
        citas,
        ocupadas,
        cargando,
        error,
        recargarCitas,
        agregarCita,
        cambiarEstado,
      }}
    >
      {children}
    </CitasContext.Provider>
  );
}
