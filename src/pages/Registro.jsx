import { Link, useNavigate } from "react-router-dom";
import FormularioRegistro from "../components/organisms/FormularioRegistro";

export default function Registro() {
  const navigate = useNavigate();

  const handleRegistroExitoso = (datos) => {
    // Aquí iría la llamada a tu API con `datos`.
    navigate("/login");
  };

  return (
    <main>
      <h1>Crear cuenta</h1>
      <FormularioRegistro onRegistroExitoso={handleRegistroExitoso} />
      <p>
        ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
      </p>
    </main>
  );
}