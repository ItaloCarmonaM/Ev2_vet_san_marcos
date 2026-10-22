import { estadoVacuna } from "../../utils/vacunas";

function AlertaVacunas({ vacunas = [], nombre }) {
  if (vacunas.length === 0) return null;

  const estados = vacunas.map((v) => estadoVacuna(v.proxima));
  const vencidas = estados.filter((e) => e === "Vencida").length;
  const proximas = estados.filter((e) => e === "Próxima a vencer").length;

  let variante = "success";
  let texto = `${nombre} tiene todas sus vacunas al día.`;

  if (vencidas > 0 || proximas > 0) {
    const partes = [];
    if (vencidas > 0) partes.push(`${vencidas} ${vencidas === 1 ? "vencida" : "vencidas"}`);
    if (proximas > 0) partes.push(`${proximas} ${proximas === 1 ? "próxima" : "próximas"} a vencer`);
    variante = vencidas > 0 ? "danger" : "warning";
    texto = `Atención, ${nombre}: ${partes.join(" y ")}.`;
  }

  return (
    <div className={`alert alert-${variante} mb-3`} role="alert">
      {texto}
    </div>
  );
}

export default AlertaVacunas;