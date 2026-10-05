import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Container, Nav, Navbar as BarraNav } from "react-bootstrap";
import Icono from "../atoms/Icono";
import Boton from "../atoms/Boton";

// Solo estructura, cambiar cuando vayamos a trabajar con el react
const ENLACES_POR_DEFECTO = [
  { texto: "Inicio", ruta: "/" },
  { texto: "Servicios", ruta: "/servicios" },
  { texto: "Solicitar cita", ruta: "/solicitar-cita" },
  { texto: "Mis citas", ruta: "/mis-citas" },
];

// Props opcionales:
// enlaces: [{ texto, ruta }]
// usuario: nombre de quien inició sesión (si no hay, muestra "Ingresar")
// onCerrarSesion: función que se llama al cerrar sesión
function Navbar(props) {
  const enlaces = props.enlaces || ENLACES_POR_DEFECTO;
  const [abierto, setAbierto] = useState(false);
  const navigate = useNavigate();

  function cerrarMenu() {
    setAbierto(false);
  }

  function irALogin() {
    cerrarMenu();
    navigate("/login");
  }

  function cerrarSesion() {
    cerrarMenu();
    if (props.onCerrarSesion) {
      props.onCerrarSesion();
    }
  }

  return (
    <BarraNav
      expand="lg"
      bg="white"
      sticky="top"
      className="border-bottom navbar-vet"
      expanded={abierto}
      onToggle={setAbierto}
    >
      <Container>
        <BarraNav.Brand
          as={Link}
          to="/"
          onClick={cerrarMenu}
          className="d-flex align-items-center gap-2 fw-bold"
        >
          <Icono nombre="huella" tamano={28} />
          Veterinaria San Marcos
        </BarraNav.Brand>

        <BarraNav.Toggle aria-controls="menuPrincipal" />

        <BarraNav.Collapse id="menuPrincipal">
          <Nav className="me-auto">
            {enlaces.map((enlace) => (
              <Nav.Link
                key={enlace.ruta}
                as={NavLink}
                to={enlace.ruta}
                end={enlace.ruta === "/"}
                onClick={cerrarMenu}
              >
                {enlace.texto}
              </Nav.Link>
            ))}
          </Nav>

          <div className="d-flex align-items-center gap-3">
            {props.usuario ? (
              <>
                <span className="d-flex align-items-center gap-1 fw-semibold">
                  <Icono nombre="usuario" tamano={18} />
                  {props.usuario}
                </span>
                <Boton
                  texto="Cerrar sesión"
                  variante="outline-primary"
                  onClick={cerrarSesion}
                />
              </>
            ) : (
              <Boton
                texto="Ingresar"
                variante="primary"
                onClick={irALogin}
              />
            )}
          </div>
        </BarraNav.Collapse>
      </Container>
    </BarraNav>
  );
}

export default Navbar;