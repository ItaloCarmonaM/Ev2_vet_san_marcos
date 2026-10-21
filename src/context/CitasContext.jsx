import { createContext, useState } from "react";
import citasIniciales from "../data/citas";

export const CitasContext = createContext(null);

export function CitasProvider({ children, iniciales = citasIniciales }) {
  const [citas, setCitas] = useState(iniciales);

  function agregarCita(cita) {
    const nueva = { ...cita, id: Date.now(), estado: "Pendiente" };
    setCitas((anterior) => [...anterior, nueva]);
    return nueva;
  }

  function cambiarEstado(id, estado) {
    setCitas((anterior) => anterior.map((c) => (c.id === id ? { ...c, estado } : c)));
  }

  const ocupadas = citas
    .filter((c) => c.estado !== "Cancelada")
    .map((c) => ({ fecha: c.fecha, hora: c.hora }));

  return (
    <CitasContext.Provider value={{ citas, ocupadas, agregarCita, cambiarEstado }}>
      {children}
    </CitasContext.Provider>
  );
}