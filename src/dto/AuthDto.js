export function loginRequestDto(formulario) {
  return {
    email: formulario.email.trim().toLowerCase(),
    password: formulario.password,
  };
}
// falta teléfono
export function registroRequestDto(formulario) {
  return {
    nombre: formulario.nombre.trim(),
    email: formulario.email.trim().toLowerCase(),
    password: formulario.clave,
  };
}