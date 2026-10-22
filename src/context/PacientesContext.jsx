import { createContext, useState } from "react";
import pacientesIniciales from "../data/pacientes";

export const PacientesContext = createContext(null);

export function PacientesProvider({ children, iniciales = pacientesIniciales }) {
  const [pacientes, setPacientes] = useState(iniciales);

  function agregarAtencion(idPaciente, atencion) {
    setPacientes((anterior) =>
      anterior.map((p) =>
        p.id === idPaciente
          ? { ...p, atenciones: [{ ...atencion, id: Date.now() }, ...p.atenciones] }
          : p
      )
    );
  }

  return (
    <PacientesContext.Provider value={{ pacientes, agregarAtencion }}>
      {children}
    </PacientesContext.Provider>
  );
}