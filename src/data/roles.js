export const ETIQUETA_ROL = {
  administrador: "Administrador",
  recepcionista: "Recepcionista",
  dueno_mascota: "Dueño de mascota",
};

export const ROLES_OPCIONES = Object.entries(ETIQUETA_ROL).map(([valor, texto]) => ({
  valor,
  texto,
}));