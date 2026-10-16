import { useState } from "react";
import CampoFormulario from "../molecules/CampoFormulario";
import Boton from "../atoms/Boton";
import { validarEmail, validarClave } from "../../utils/validaciones";

function FormularioLogin(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errores, setErrores] = useState({});

  function handleSubmit(e) {
    e.preventDefault();

    const nuevos = {
      email: validarEmail(email),
      password: validarClave(password),
    };
    setErrores(nuevos);

    const hayErrores = Object.values(nuevos).some((mensaje) => mensaje !== "");
    if (!hayErrores && props.onLogin) {
      props.onLogin({ email, password });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="card p-4 tarjeta-login" noValidate>
      <h3 className="titulo-login mb-3 text-center fw-bold">Iniciar Sesión</h3>

      <CampoFormulario
        id="email"
        name="email"
        etiqueta="Correo Electrónico"
        tipo="email"
        placeholder="ejemplo@ejemplo.com"
        valor={email}
        onChange={(e) => setEmail(e.target.value)}
        error={errores.email}
      />

      <CampoFormulario
        id="password"
        name="password"
        etiqueta="Contraseña"
        tipo="password"
        placeholder="*******"
        valor={password}
        onChange={(e) => setPassword(e.target.value)}
        error={errores.password}
      />

      <Boton tipo="submit" texto="Ingresar" variante="primary" className="w-100 mt-2" />
    </form>
  );
}

export default FormularioLogin;