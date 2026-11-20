import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Cargando from "../components/atoms/Cargando";

// Uso: <RutaProtegida roles={["administrador"]}><Pagina /></RutaProtegida>
function RutaProtegida(props) {
  const { usuario, cargando } = useAuth();
  const location = useLocation();

  if (cargando) return <Cargando texto="Verificando sesión..." />;

  if (!usuario) {
    return <Navigate to="/login" replace state={{ desde: location.pathname }} />;
  }

  if (props.roles && !props.roles.includes(usuario.rol)) {
    return <Navigate to="/sin-permiso" replace />;
  }

  return props.children;
}

export default RutaProtegida;