const ICONOS = {
  huella:
    "M8 13c-2 0-3 1.5-3 3 0 1.6 1.2 2.5 3 2.5 1 0 1.5-.5 2-.5s1 .5 2 .5c1.8 0 3-.9 3-2.5 0-1.5-1-3-3-3-1 0-1.5.5-2 .5S9 13 8 13zM5 8a1.5 2 0 1 0 0 .01M9 5a1.5 2 0 1 0 0 .01M15 5a1.5 2 0 1 0 0 .01M19 8a1.5 2 0 1 0 0 .01",
  calendario: "M5 4h14a1 1 0 0 1 1 1v14a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1zM4 9h16M8 2v4M16 2v4",
  reloj: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM12 7v5l3 2",
  usuario: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4 20c0-4 4-6 8-6s8 2 8 6",
  buscar: "M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM16 16l4 4",
};

const ICONO_POR_DEFECTO =
  "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18zM9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.7M12 17v.01";

function Icono(props) {
  const tamano = props.tamano || 20;
  const trazo = ICONOS[props.nombre] || ICONO_POR_DEFECTO;
  const clases = `icono ${props.className || ""}`.trim();

  return (
    <svg
      width={tamano}
      height={tamano}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={clases}
    >
      <path d={trazo} />
    </svg>
  );
}

export default Icono;