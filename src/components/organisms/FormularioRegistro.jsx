import { useState } from "react";
import CampoFormulario from "../molecules/CampoFormulario";
import Boton from "../atoms/Boton";
import {
  campoObligatorio,
  validarEmail,
  validarTelefono,
  validarClave,
  validarConfirmacion,
} from "../../utils/validaciones";

const VALORES_INICIALES = { nombre: "", email: "", telefono: "", clave: "", confirmacion: "" };

// Un solo useState para los valores: el name de cada campo es la clave.
function FormularioRegistro(props) {
  const [datos, setDatos] = useState(VALORES_INICIALES);
  const [errores, setErrores] = useState({});

  function manejarCambio(e) {
    const { name, value } = e.target;
    setDatos((anterior) => ({ ...anterior, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const nuevos = {
      nombre: campoObligatorio(datos.nombre, "El nombre"),
      email: validarEmail(datos.email),
      telefono: validarTelefono(datos.telefono),
      clave: validarClave(datos.clave),
      confirmacion: validarConfirmacion(datos.clave, datos.confirmacion),
    };
    setErrores(nuevos);

    const hayErrores = Object.values(nuevos).some((mensaje) => mensaje !== "");
    if (!hayErrores && props.onRegistrar) {
      props.onRegistrar({
        nombre: datos.nombre.trim(),
        email: datos.email.trim(),
        telefono: datos.telefono,
      });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card p-4 tarjeta-login" noValidate>
      <h3 className="titulo-login mb-3 text-center fw-bold">Crear cuenta</h3>

      <CampoFormulario id="nombre" name="nombre" etiqueta="Nombre completo"
        placeholder="Ej: María Pérez" valor={datos.nombre}
        onChange={manejarCambio} error={errores.nombre} />
      <CampoFormulario id="email" name="email" etiqueta="Correo Electrónico" tipo="email"
        placeholder="ejemplo@ejemplo.com" valor={datos.email}
        onChange={manejarCambio} error={errores.email} />
      <CampoFormulario id="telefono" name="telefono" etiqueta="Teléfono" tipo="tel"
        placeholder="+56 9 1234 5678" valor={datos.telefono}
        onChange={manejarCambio} error={errores.telefono} />
      <CampoFormulario id="clave" name="clave" etiqueta="Contraseña" tipo="password"
        placeholder="Mínimo 6 caracteres" valor={datos.clave}
        onChange={manejarCambio} error={errores.clave} />
      <CampoFormulario id="confirmacion" name="confirmacion" etiqueta="Confirmar contraseña"
        tipo="password" placeholder="Repite tu contraseña" valor={datos.confirmacion}
        onChange={manejarCambio} error={errores.confirmacion} />

      <Boton tipo="submit" texto="Registrarme" variante="primary" className="w-100 mt-2" />
    </form>
  );
}

export default FormularioRegistro;