const PREFIJOS = {
  Consultas: "SV",
  Vacunación: "VA",
  Cirugía: "CI",
  Desparasitación: "DE",
  Exámenes: "EX",
  Otros: "OT",
};

export function generarCodigo(servicios, categoria) {
  const prefijo = PREFIJOS[categoria] || "XX";
  const numeros = servicios
    .filter((s) => s.codigo.startsWith(prefijo))
    .map((s) => Number(s.codigo.slice(prefijo.length)));
  const siguiente = (numeros.length ? Math.max(...numeros) : 0) + 1;
  return `${prefijo}${String(siguiente).padStart(3, "0")}`;
}