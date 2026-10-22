import { Container } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../organisms/Navbar";
import { useTituloPagina } from "../../hooks/useTituloPagina";
import { PERFILES } from "../../data/perfiles";

export default function PlantillaAdmin({ titulo, perfil = "admin", children }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { enlaces, usuario } = PERFILES[perfil];
  useTituloPagina(titulo);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar
        enlaces={enlaces}
        rutaActual={pathname}
        onNavegar={navigate}
        usuario={usuario}
        onCerrarSesion={() => navigate("/login")}
      />
      <main className="flex-grow-1 py-4">
        <Container>
          <h1 className="h3 fw-bold mb-4">{titulo}</h1>
          {children}
        </Container>
      </main>
    </div>
  );
}