import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import FormularioLogin from "../components/organisms/FormularioLogin";
import Boton from "../components/atoms/Boton";
import { useTituloPagina } from "../hooks/useTituloPagina";

function Login() {
  const navigate = useNavigate();
  useTituloPagina("Iniciar sesión");

  function alIniciarSesion() {
    navigate("/");
  }

  return (
    <div className="login-pagina">
      <Container className="d-flex align-items-center justify-content-center min-vh-100">
        <Row className="w-100 justify-content-center">
          <Col xs={12} sm={9} md={6} lg={4}>
            <FormularioLogin onLogin={alIniciarSesion} />
            <Boton
              texto="Volver al inicio"
              variante="link"
              className="w-100 mt-2"
              onClick={() => navigate("/")}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login;