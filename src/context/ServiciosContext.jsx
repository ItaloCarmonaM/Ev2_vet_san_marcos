import { createContext, useState } from "react";
import serviciosIniciales from "../data/servicios";
import { generarCodigo } from "../utils/codigos";

export const ServiciosContext = createContext(null);

export function ServiciosProvider({ children, iniciales = serviciosIniciales }) {
  const [servicios, setServicios] = useState(iniciales);

  function agregarServicio(datos) {
    const nuevo = { ...datos, codigo: generarCodigo(servicios, datos.categoria) };
    setServicios((anterior) => [...anterior, nuevo]);
  }

  function actualizarServicio(codigo, datos) {
    setServicios((anterior) => anterior.map((s) => (s.codigo === codigo ? { ...s, ...datos } : s)));
  }

  function eliminarServicio(codigo) {
    setServicios((anterior) => anterior.filter((s) => s.codigo !== codigo));
  }

  return (
    <ServiciosContext.Provider
      value={{ servicios, agregarServicio, actualizarServicio, eliminarServicio }}
    >
      {children}
    </ServiciosContext.Provider>
  );
}