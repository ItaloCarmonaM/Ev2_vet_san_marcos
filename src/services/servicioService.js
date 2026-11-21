import { api } from "./api";

export async function listarServicios() {
  const respuesta = await api.get("/servicios");
  return respuesta.data;
}

export async function crearServicio(dto) {
  const respuesta = await api.post("/servicios", dto);
  return respuesta.data;
}

export async function actualizarServicio(id, dto) {
  const respuesta = await api.put(`/servicios/${id}`, dto);
  return respuesta.data;
}

export async function eliminarServicio(id) {
  await api.delete(`/servicios/${id}`);
}