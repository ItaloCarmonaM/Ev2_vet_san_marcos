const SIN_DATO = "No registrada";

const pacientes = [
  {
    id: 1, nombre: "Rocky", duenio: "María Pérez", especie: "Perro",
    raza: "Golden Retriever", edad: "4 años", peso: "28 kg",
    atenciones: [
      { id: 1, fecha: "2026-08-02", motivo: "Rascado excesivo de orejas", diagnostico: "Otitis leve", medicamentos: "Gotas óticas cada 12 hrs por 7 días", veterinario: "Dr. Andrés Soto" },
      { id: 2, fecha: "2026-05-15", motivo: "Control rutinario", diagnostico: "Sin observaciones", medicamentos: "Desparasitante interno", veterinario: "Dra. Camila Rojas" },
    ],
    vacunas: [
      { id: 1, nombre: "Séxtuple canina", aplicada: "2025-09-20", proxima: "2026-09-20" },
      { id: 2, nombre: "Antirrábica", aplicada: "2026-03-05", proxima: "2027-03-05" },
      { id: 3, nombre: "Bordetella", aplicada: "2026-01-10", proxima: "2027-01-10" },
    ],
  },
  {
    id: 2, nombre: "Michi", duenio: "Jorge Díaz", especie: "Gato",
    raza: SIN_DATO, edad: SIN_DATO, peso: "No registrado",
    atenciones: [
      { id: 1, fecha: "2026-08-28", motivo: "Esterilización", diagnostico: "Sin registrar", medicamentos: "", veterinario: "Dra. Camila Rojas" },
    ],
    vacunas: [
      { id: 1, nombre: "Triple felina", aplicada: "2025-11-10", proxima: "2026-11-10" },
    ],
  },
  {
    id: 3, nombre: "Toby", duenio: "Camila Fuentes", especie: "Perro",
    raza: SIN_DATO, edad: SIN_DATO, peso: "No registrado",
    atenciones: [
      { id: 1, fecha: "2026-08-30", motivo: "Vacunación", diagnostico: "Sin registrar", medicamentos: "", veterinario: "Dr. Andrés Soto" },
    ],
    vacunas: [
      { id: 1, nombre: "Séxtuple canina", aplicada: "2026-08-30", proxima: "2027-08-30" },
    ],
  },
  {
    id: 4, nombre: "Kiwi", duenio: "Camila Fuentes", especie: "Ave",
    raza: SIN_DATO, edad: SIN_DATO, peso: "No registrado",
    atenciones: [
      { id: 1, fecha: "2026-07-18", motivo: "Consulta general", diagnostico: "Sin registrar", medicamentos: "", veterinario: "Dr. Andrés Soto" },
    ],
    vacunas: [],
  },
];

export default pacientes;