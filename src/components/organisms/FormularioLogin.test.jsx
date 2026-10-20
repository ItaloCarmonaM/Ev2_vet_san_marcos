import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import FormularioLogin from "./FormularioLogin";

describe("FormularioLogin", () => {
  it("muestra los errores y no avisa a la página si se envía vacío", async () => {
    const onLogin = vi.fn();
    render(<FormularioLogin onLogin={onLogin} />);

    await userEvent.click(screen.getByRole("button", { name: /ingresar/i }));

    expect(screen.getByText("El correo es obligatorio")).toBeInTheDocument();
    expect(screen.getByText("La contraseña es obligatoria")).toBeInTheDocument();
    expect(onLogin).not.toHaveBeenCalled();
  });

  it("rechaza una contraseña corta", async () => {
    const onLogin = vi.fn();
    render(<FormularioLogin onLogin={onLogin} />);

    await userEvent.type(screen.getByLabelText("Correo Electrónico"), "ana@correo.cl");
    await userEvent.type(screen.getByLabelText("Contraseña"), "123");
    await userEvent.click(screen.getByRole("button", { name: /ingresar/i }));

    expect(screen.getByText("La contraseña debe tener al menos 6 caracteres")).toBeInTheDocument();
    expect(onLogin).not.toHaveBeenCalled();
  });

  it("avisa a la página con los datos cuando todo es válido", async () => {
    const onLogin = vi.fn();
    render(<FormularioLogin onLogin={onLogin} />);

    await userEvent.type(screen.getByLabelText("Correo Electrónico"), "ana@correo.cl");
    await userEvent.type(screen.getByLabelText("Contraseña"), "123456");
    await userEvent.click(screen.getByRole("button", { name: /ingresar/i }));

    expect(onLogin).toHaveBeenCalledWith({ email: "ana@correo.cl", password: "123456" });
  });
});