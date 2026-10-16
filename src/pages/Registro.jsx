import { Container, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import FormularioRegistro from "../components/organisms/FormularioRegistro";
import Boton from "../components/atoms/Boton";
import { useTituloPagina } from "../hooks/useTituloPagina";

function Registro() {
  const navigate = useNavigate();
  useTituloPagina("Crear cuenta");

  function alRegistrar() {
    navigate("/login");
  }

  return (
    <div className="login-pagina">
      <Container className="d-flex align-items-center justify-content-center min-vh-100 py-4">
        <Row className="w-100 justify-content-center">
          <Col xs={12} sm={10} md={7} lg={5}>
            <FormularioRegistro onRegistrar={alRegistrar} />
            <Boton
              texto="¿Ya tienes cuenta? Inicia sesión"
              variante="link"
              className="w-100 mt-2"
              onClick={() => navigate("/login")}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Registro;