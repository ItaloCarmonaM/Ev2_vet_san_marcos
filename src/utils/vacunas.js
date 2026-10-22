const DIAS_DE_AVISO = 30;

export function estadoVacuna(proxima, hoy = new Date()) {
  const [anio, mes, dia] = proxima.split("-").map(Number);
  const fecha = new Date(anio, mes - 1, dia);
  const inicio = new Date(hoy.getFullYear(), hoy.getMonth(), hoy.getDate());
  const dias = Math.round((fecha - inicio) / 86400000);

  if (dias < 0) return "Vencida";
  if (dias <= DIAS_DE_AVISO) return "Próxima a vencer";
  return "Al día";
}