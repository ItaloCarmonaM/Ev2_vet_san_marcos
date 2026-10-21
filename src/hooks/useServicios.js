import { useContext } from "react";
import { ServiciosContext } from "../context/ServiciosContext";

export function useServicios() {
  const contexto = useContext(ServiciosContext);
  if (!contexto) throw new Error("useServicios debe usarse dentro de <ServiciosProvider>");
  return contexto;
}