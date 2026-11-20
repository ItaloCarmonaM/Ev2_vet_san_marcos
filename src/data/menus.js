export const ENLACES_PUBLICOS = [
  { texto: "Inicio", ruta: "/" },
  { texto: "Servicios", ruta: "/servicios" },
];

export const ENLACES_POR_ROL = {
  dueno_mascota: [
    { texto: "Inicio", ruta: "/" },
    { texto: "Servicios", ruta: "/servicios" },
    { texto: "Solicitar cita", ruta: "/solicitar-cita" },
    { texto: "Mis citas", ruta: "/mis-citas" },
  ],
  recepcionista: [
    { texto: "Inicio", ruta: "/" },
    { texto: "Servicios", ruta: "/servicios" },
    { texto: "Citas", ruta: "/admin/citas" },
  ],
  administrador: [
    { texto: "Inicio", ruta: "/" },
    { texto: "Servicios", ruta: "/admin/servicios" },
    { texto: "Citas", ruta: "/admin/citas" },
  ],
};

export function enlacesDeRol(rol) {
  return ENLACES_POR_ROL[rol] || ENLACES_PUBLICOS;
}

// Adónde va cada rol justo después de iniciar sesión
export function rutaInicialDeRol(rol) {
  if (rol === "administrador") return "/admin/servicios";
  if (rol === "recepcionista") return "/admin/citas";
  return "/";
}