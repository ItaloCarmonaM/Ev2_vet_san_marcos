export function campoObligatorio(valor, nombreCampo = "Este campo") {
  if (!String(valor ?? "").trim()) return `${nombreCampo} es obligatorio`;
  return "";
}

export function validarEmail(email) {
  const texto = String(email ?? "").trim();
  if (!texto) return "El correo es obligatorio";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(texto)) return "Ingresa un correo válido";
  return "";
}

export function validarClave(clave) {
  if (!clave) return "La contraseña es obligatoria";
  if (clave.length < 6) return "La contraseña debe tener al menos 6 caracteres";
  return "";
}