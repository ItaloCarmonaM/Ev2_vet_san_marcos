import { Container } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../organisms/Navbar";
import { useTituloPagina } from "../../hooks/useTituloPagina";

const ENLACES_ADMIN = [
  { texto: "Servicios", ruta: "/admin/servicios" },
  { texto: "Citas", ruta: "/admin/citas" },
  { texto: "Ver sitio", ruta: "/" },
];

export default function PlantillaAdmin({ titulo, children }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  useTituloPagina(titulo);

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar
        enlaces={ENLACES_ADMIN}
        rutaActual={pathname}
        onNavegar={navigate}
        usuario="Administrador"
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