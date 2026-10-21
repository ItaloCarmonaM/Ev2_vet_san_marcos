import { useContext } from "react";
import { CitasContext } from "../context/CitasContext";

export function useCitas() {
  const contexto = useContext(CitasContext);
  if (!contexto) throw new Error("useCitas debe usarse dentro de <CitasProvider>");
  return contexto;
}