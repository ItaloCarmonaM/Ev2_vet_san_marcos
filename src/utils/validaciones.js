
export function campoObligatorio(valor, nombreCampo = "Este campo") {
  if (!String(valor ?? "").trim()) return `${nombreCampo} es obligatorio`;
  return "";
}

export function validarEmail(email) {
  const texto = String(email ?? "").trim();
  if (!texto) return "El correo es obligatorio";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(texto)) {
    return "Ingresa un correo válido";
  }
  return "";
}

export function validarClave(clave) {
  if (!clave) return "La contraseña es obligatoria";
  if (clave.length < 6) return "La contraseña debe tener al menos 6 caracteres";
  return "";
}

export function validarConfirmacion(clave, confirmacion) {
  if (!confirmacion) return "Confirma tu contraseña";
  if (clave !== confirmacion) return "Las contraseñas no coinciden";
  return "";
}

// Celular chileno: +56 9 1234 5678 o 912345678
export function validarTelefono(telefono) {
  const limpio = String(telefono ?? "").replace(/[\s-]/g, "");
  if (!limpio) return "El teléfono es obligatorio";
  if (!/^(\+?56)?9\d{8}$/.test(limpio)) {
    return "Ingresa un celular chileno válido (ej: +56 9 1234 5678)";
  }
  return "";
}
