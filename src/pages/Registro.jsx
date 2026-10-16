import { Container, Row, Col } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import FormularioRegistro from "../components/organisms/FormularioRegistro";
import { useTituloPagina } from "../hooks/useTituloPagina";

export default function Registro() {
  const navigate = useNavigate();
  useTituloPagina("Crear cuenta");

  const handleRegistroExitoso = (datos) => {
    // Aquí iría la llamada a tu API con `datos`.
    navigate("/login");
  };

  return (
    <div className="login-pagina">
      <Container className="d-flex align-items-center justify-content-center min-vh-100 py-4">
        <Row className="w-100 justify-content-center">
          <Col xs={12} sm={9} md={6} lg={4}>
            <div className="card tarjeta-login">
              <div className="card-body p-4">
                <h1 className="titulo-login fw-bold text-center mb-4">Crear Cuenta</h1>
                <FormularioRegistro onRegistroExitoso={handleRegistroExitoso} />
              </div>
            </div>
            <p className="text-center mt-3 mb-0">
              ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
            </p>
          </Col>
        </Row>
      </Container>
    </div>
  );
}