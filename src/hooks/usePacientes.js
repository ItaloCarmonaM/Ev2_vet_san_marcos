import { useContext } from "react";
import { PacientesContext } from "../context/PacientesContext";

export function usePacientes() {
  const contexto = useContext(PacientesContext);
  if (!contexto) throw new Error("usePacientes debe usarse dentro de <PacientesProvider>");
  return contexto;
}