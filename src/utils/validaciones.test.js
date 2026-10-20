import { describe, it, expect } from "vitest";
import {
  campoObligatorio,
  validarEmail,
  validarClave,
  validarTelefono,
  validarConfirmacion,
} from "./validaciones";

describe("validarEmail", () => {
  it("pide el correo cuando está vacío", () => {
    expect(validarEmail("")).toBe("El correo es obligatorio");
  });

  it("rechaza un correo sin formato válido", () => {
    expect(validarEmail("correo-malo")).toBe("Ingresa un correo válido");
  });

  it("acepta un correo válido", () => {
    expect(validarEmail("ana@correo.cl")).toBe("");
  });
});

describe("validarClave", () => {
  it("rechaza contraseñas de menos de 6 caracteres", () => {
    expect(validarClave("123")).toBe("La contraseña debe tener al menos 6 caracteres");
  });

  it("acepta una contraseña de 6 caracteres", () => {
    expect(validarClave("123456")).toBe("");
  });
});

describe("validarTelefono", () => {
  it("acepta celulares chilenos con y sin +56", () => {
    expect(validarTelefono("+56 9 1234 5678")).toBe("");
    expect(validarTelefono("912345678")).toBe("");
  });

  it("rechaza un número que no es celular chileno", () => {
    expect(validarTelefono("12345")).not.toBe("");
  });
});

describe("campoObligatorio y validarConfirmacion", () => {
  it("trata un texto de solo espacios como vacío e incluye el nombre del campo", () => {
    expect(campoObligatorio("   ", "El nombre")).toBe("El nombre es obligatorio");
  });

  it("detecta contraseñas que no coinciden", () => {
    expect(validarConfirmacion("123456", "654321")).toBe("Las contraseñas no coinciden");
    expect(validarConfirmacion("123456", "123456")).toBe("");
  });
});