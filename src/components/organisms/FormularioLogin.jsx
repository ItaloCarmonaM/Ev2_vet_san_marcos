import { useState } from "react";
import CampoFormulario from "../molecules/CampoFormulario";
import Boton from "../atoms/Boton";

function FormularioLogin(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (props.onLogin) {
      props.onLogin({ email, password });
    }
  }

  return (
    <form onSubmit={handleSubmit} className="tarjeta-login">
      <h3 className="titulo-login">Iniciar Sesión</h3>
      <CampoFormulario
        etiqueta="Correo Electrónico"
        tipo="email"
        placeholder="ejemplo@ejemplo.com"
        valor={email}
        onChange={(e) => setEmail(e.target.value)}
        requerido={true}
      />
      <CampoFormulario
        etiqueta="Contraseña"
        tipo="password"
        placeholder="••••••••"
        valor={password}
        onChange={(e) => setPassword(e.target.value)}
        requerido={true}
      />
      <Boton tipo="submit" texto="Ingresar" variante="primary" />
    </form>
  );
}

export default FormularioLogin;