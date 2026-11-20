const CLAVE = "vet_token";

export function guardarToken(token) {
  try { sessionStorage.setItem(CLAVE, token); } catch { /* sin almacenamiento */ }
}

export function leerToken() {
  try { return sessionStorage.getItem(CLAVE); } catch { return null; }
}

export function borrarToken() {
  try { sessionStorage.removeItem(CLAVE); } catch { /* sin almacenamiento */ }
}