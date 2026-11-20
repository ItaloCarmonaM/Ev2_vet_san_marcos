import { Container } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../organisms/Navbar";
import { useTituloPagina } from "../../hooks/useTituloPagina";
import { useAuth } from "../../hooks/useAuth";
import { enlacesDeRol } from "../../data/menus";

export default function PlantillaAdmin(props) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { usuario, cerrarSesion } = useAuth();
  useTituloPagina(props.titulo);

  function salir() {
    cerrarSesion();
    navigate("/login");
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar
        enlaces={enlacesDeRol(usuario?.rol)}
        rutaActual={pathname}
        onNavegar={navigate}
        usuario={usuario?.nombre}
        onCerrarSesion={salir}
      />
      <main className="flex-grow-1 py-4">
        <Container>
          <h1 className="h3 fw-bold mb-4">{props.titulo}</h1>
          {props.children}
        </Container>
      </main>
    </div>
  );
}