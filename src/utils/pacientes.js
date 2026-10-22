import { normalizarTexto } from "./formato";

export function ultimaAtencion(paciente) {
  const atenciones = paciente.atenciones || [];
  if (atenciones.length === 0) return null;
  return [...atenciones].sort((a, b) => b.fecha.localeCompare(a.fecha))[0];
}

export function filtrarPacientes(pacientes, texto) {
  const buscado = normalizarTexto(texto.trim());
  return pacientes.filter(
    (p) => normalizarTexto(p.nombre).includes(buscado) || normalizarTexto(p.duenio).includes(buscado)
  );
}