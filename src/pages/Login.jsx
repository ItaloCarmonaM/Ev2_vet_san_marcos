import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import FormularioLogin from "../components/organisms/FormularioLogin";
import Boton from "../components/atoms/Boton";
import { useAuth } from "../hooks/useAuth";
import { useTituloPagina } from "../hooks/useTituloPagina";
import { loginRequestDto } from "../dto/AuthDto";
import { obtenerMensajeError } from "../services/errores";
import { rutaInicialDeRol } from "../data/menus";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { iniciarSesion, sesionVencida } = useAuth();
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);
  useTituloPagina("Iniciar sesión");

  let aviso = "";
  if (location.state?.registrado) aviso = "Cuenta creada. Ahora puedes iniciar sesión.";
  else if (sesionVencida) aviso = "Tu sesión venció. Inicia sesión nuevamente.";

  async function alIniciarSesion(formulario) {
    setCargando(true);
    setError("");
    try {
      const perfil = await iniciarSesion(loginRequestDto(formulario));
      navigate(location.state?.desde || rutaInicialDeRol(perfil.rol), { replace: true });
    } catch (e) {
      setError(obtenerMensajeError(e));
    } finally {
      setCargando(false);
    }
  }

  return (
    <div className="login-pagina">
      <Container className="d-flex align-items-center justify-content-center min-vh-100">
        <Row className="w-100 justify-content-center">
          <Col xs={12} sm={9} md={6} lg={4}>
            <FormularioLogin
              onLogin={alIniciarSesion}
              cargando={cargando}
              error={error}
              aviso={aviso}
            />
            <Boton
              texto="¿No tienes cuenta? Regístrate"
              variante="link"
              className="w-100 mt-2"
              onClick={() => navigate("/registro")}
            />
            <Boton
              texto="Volver al inicio"
              variante="link"
              className="w-100"
              onClick={() => navigate("/")}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login;