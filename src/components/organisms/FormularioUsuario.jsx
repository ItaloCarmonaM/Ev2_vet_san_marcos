import { useState } from "react";
import CampoFormulario from "../molecules/CampoFormulario";
import Boton from "../atoms/Boton";
import { campoObligatorio, validarEmail, validarClave } from "../../utils/validaciones";
import { ROLES_OPCIONES } from "../../data/roles";

const VACIO = { nombre: "", email: "", password: "", rol: "" };

function FormularioUsuario(props) {
  const [datos, setDatos] = useState(VACIO);
  const [errores, setErrores] = useState({});

  function manejarCambio(e) {
    const { name, value } = e.target;
    setDatos((anterior) => ({ ...anterior, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();

    const nuevos = {
      nombre: campoObligatorio(datos.nombre, "El nombre"),
      email: validarEmail(datos.email),
      password: validarClave(datos.password),
      rol: campoObligatorio(datos.rol, "El rol"),
    };
    setErrores(nuevos);

    const hayErrores = Object.values(nuevos).some((mensaje) => mensaje !== "");
    if (hayErrores || !props.onGuardar) return;

    // El formulario se limpia solo si la página confirma que se guardó
    const guardado = await props.onGuardar(datos);
    if (guardado) setDatos(VACIO);
  }

  return (
    <form onSubmit={handleSubmit} className="card p-4" noValidate>
      <div className="row">
        <div className="col-md-6">
          <CampoFormulario id="nombre" name="nombre" etiqueta="Nombre completo"
            placeholder="Ej: Valentina Muñoz" valor={datos.nombre}
            onChange={manejarCambio} error={errores.nombre} />
        </div>
        <div className="col-md-6">
          <CampoFormulario id="email" name="email" etiqueta="Correo electrónico" tipo="email"
            placeholder="ejemplo@ejemplo.com" valor={datos.email}
            onChange={manejarCambio} error={errores.email} />
        </div>
        <div className="col-md-6">
          <CampoFormulario id="password" name="password" etiqueta="Contraseña" tipo="password"
            placeholder="Mínimo 6 caracteres" valor={datos.password}
            onChange={manejarCambio} error={errores.password} />
        </div>
        <div className="col-md-6">
          <CampoFormulario id="rol" name="rol" etiqueta="Rol" opciones={ROLES_OPCIONES}
            placeholder="Selecciona un rol" valor={datos.rol}
            onChange={manejarCambio} error={errores.rol} />
        </div>
      </div>

      <div>
        <Boton
          tipo="submit"
          texto={props.guardando ? "Guardando..." : "Crear usuario"}
          variante="primary"
          deshabilitado={props.guardando}
        />
      </div>
    </form>
  );
}

export default FormularioUsuario;