import { useState } from "react";

// Teléfono chileno: 9 dígitos que empiezan con 9, con +56 opcional.
const TELEFONO_REGEX = /^(\+?56)?9\d{8}$/;

function validar({ nombre, email, telefono, password, confirmar }) {
  const errores = {};

  if (!nombre.trim()) errores.nombre = "Ingresa tu nombre.";

  if (!/^\S+@\S+\.\S+$/.test(email)) errores.email = "Ingresa un correo válido.";

  if (!TELEFONO_REGEX.test(telefono.replace(/\s/g, ""))) {
    errores.telefono = "Teléfono inválido. Ejemplo: +56 9 1234 5678.";
  }

  if (password.length < 6) {
    errores.password = "La contraseña debe tener al menos 6 caracteres.";
  }

  if (password !== confirmar) {
    errores.confirmar = "Las contraseñas no coinciden.";
  }

  return errores;
}

export default function FormularioRegistro({ onRegistroExitoso }) {
  const [valores, setValores] = useState({
    nombre: "",
    email: "",
    telefono: "",
    password: "",
    confirmar: "",
  });
  const [errores, setErrores] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValores((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevosErrores = validar(valores);
    setErrores(nuevosErrores);

    if (Object.keys(nuevosErrores).length === 0) {
      onRegistroExitoso?.(valores);
    }
  };

  const campo = (name, label, type = "text") => (
    <div className="campo">
      <label htmlFor={name}>{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        value={valores[name]}
        onChange={handleChange}
        aria-invalid={Boolean(errores[name])}
        aria-describedby={errores[name] ? `${name}-error` : undefined}
      />
      {errores[name] && (
        <span id={`${name}-error`} role="alert" className="error">
          {errores[name]}
        </span>
      )}
    </div>
  );

  return (
    <form onSubmit={handleSubmit} noValidate>
      {campo("nombre", "Nombre")}
      {campo("email", "Correo", "email")}
      {campo("telefono", "Teléfono", "tel")}
      {campo("password", "Contraseña", "password")}
      {campo("confirmar", "Confirmar contraseña", "password")}
      <button type="submit">Crear cuenta</button>
    </form>
  );
}