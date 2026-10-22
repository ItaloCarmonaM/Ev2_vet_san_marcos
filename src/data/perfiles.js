export const PERFILES = {
  admin: {
    usuario: "Administrador",
    enlaces: [
      { texto: "Servicios", ruta: "/admin/servicios" },
      { texto: "Citas", ruta: "/admin/citas" },
      { texto: "Ver sitio", ruta: "/" },
    ],
  },
  veterinario: {
    usuario: "Dr. Andrés Soto",
    enlaces: [
      { texto: "Agenda y pacientes", ruta: "/veterinario" },
      { texto: "Ver sitio", ruta: "/" },
    ],
  },
};