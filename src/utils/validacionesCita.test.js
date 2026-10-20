import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { errorDeFecha, errorDeHora } from "./validacionesCita";

describe("validacionesCita", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 9, 19, 8, 0)); // lunes 19-10-2026
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("errorDeFecha rechaza fechas pasadas y domingos", () => {
    expect(errorDeFecha("2026-10-12")).toBe("La fecha no puede ser anterior a hoy.");
    expect(errorDeFecha("2026-10-25")).toBe("No atendemos los domingos.");
  });

  it("errorDeFecha rechaza fechas inexistentes y acepta una válida", () => {
    expect(errorDeFecha("2026-02-30")).toBe("Ingresa una fecha válida.");
    expect(errorDeFecha("2026-10-20")).toBe("");
  });

  it("errorDeHora detecta una hora ocupada y una fuera de horario", () => {
    const ocupadas = [{ fecha: "2026-10-20", hora: "10:00:00" }];

    expect(errorDeHora("2026-10-20", "10:00", ocupadas)).toBe("Esa hora ya no está disponible.");
    expect(errorDeHora("2026-10-20", "20:00", ocupadas)).toBe("Elige una hora válida.");
  });

  it("errorDeHora acepta una hora libre", () => {
    expect(errorDeHora("2026-10-20", "10:30", [])).toBe("");
  });
});