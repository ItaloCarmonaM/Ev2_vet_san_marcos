import { api } from "./api";

export async function listarCitas() {
  const respuesta = await api.get("/citas");
  return respuesta.data;
}

export async function crearCita(dto) {
  const respuesta = await api.post("/citas", dto);
  return respuesta.data;
}

export async function cambiarEstadoCita(id, estado) {
  const respuesta = await api.patch(`/citas/${id}/estado`, { estado });
  return respuesta.data;
}

export async function listarOcupadas() {
  const respuesta = await api.get("/citas/ocupadas");
  return respuesta.data;
}