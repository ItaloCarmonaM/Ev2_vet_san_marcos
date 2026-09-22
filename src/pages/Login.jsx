import { Container, Row, Col } from "react-bootstrap";
import FormularioLogin from "../components/organisms/FormularioLogin";

function Login() {
  function alIniciarSesion(datos) {
    alert("Iniciando sesión con: " + datos.email);
  }

  return (
    <div className="login-pagina">
      <Container className="d-flex align-items-center justify-content-center min-vh-100">
        <Row className="w-100 justify-content-center">
          <Col xs={12} sm={9} md={6} lg={4}>
            <FormularioLogin onLogin={alIniciarSesion} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Login;