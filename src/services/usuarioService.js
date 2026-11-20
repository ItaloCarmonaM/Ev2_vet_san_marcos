import { api } from "./api";

export async function listarUsuarios() {
  const respuesta = await api.get("/usuarios");
  return respuesta.data;
}

export async function crearUsuario(dto) {
  const respuesta = await api.post("/usuarios", dto);
  return respuesta.data;
}

export async function cambiarRolUsuario(id, rol) {
  const respuesta = await api.patch(`/usuarios/${id}/rol`, { rol });
  return respuesta.data;
}

export async function cambiarEstadoUsuario(id, activo) {
  const respuesta = await api.patch(`/usuarios/${id}/estado`, { activo });
  return respuesta.data;
}