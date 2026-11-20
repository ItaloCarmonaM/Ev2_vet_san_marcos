export function crearUsuarioRequestDto(formulario) {
  return {
    nombre: formulario.nombre.trim(),
    email: formulario.email.trim().toLowerCase(),
    password: formulario.password,
    rol: formulario.rol,
  };
}