import { describe, it, expect } from "vitest";
import {
  formatearPrecio,
  separarEspecies,
  normalizarTexto,
  formatearFecha,
} from "./formato";

describe("formato", () => {
  it("formatearPrecio usa el separador de miles chileno", () => {
    expect(formatearPrecio(15000)).toBe("15.000");
    expect(formatearPrecio(180000)).toBe("180.000");
  });

  it("formatearPrecio devuelve vacío si no hay precio", () => {
    expect(formatearPrecio("")).toBe("");
    expect(formatearPrecio(undefined)).toBe("");
  });

  it("separarEspecies crea una entrada por especie", () => {
    expect(separarEspecies("Perro / Gato")).toEqual(["Perro", "Gato"]);
    expect(separarEspecies("")).toEqual([]);
  });

  it("normalizarTexto ignora mayúsculas y tildes para buscar", () => {
    expect(normalizarTexto("Séxtuple CANINA")).toBe("sextuple canina");
  });

  it("formatearFecha pasa de AAAA-MM-DD a DD-MM-AAAA", () => {
    expect(formatearFecha("2026-10-20")).toBe("20-10-2026");
  });
});