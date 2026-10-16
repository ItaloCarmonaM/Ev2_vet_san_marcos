import { useState } from "react";
import { Container, Nav, Navbar as BarraNav } from "react-bootstrap";
import Icono from "../atoms/Icono";
import Boton from "../atoms/Boton";

const ENLACES_POR_DEFECTO = [
  { texto: "Inicio", ruta: "/" },
  { texto: "Servicios", ruta: "/servicios" },
  { texto: "Solicitar cita", ruta: "/solicitar-cita" },
  { texto: "Admin", ruta: "/admin/servicios" },
];

function Navbar(props) {
  const enlaces = props.enlaces || ENLACES_POR_DEFECTO;
  const [abierto, setAbierto] = useState(false);

  function irA(ruta) {
    setAbierto(false);
    props.onNavegar(ruta);
  }

  // preventDefault() cancela la recarga del enlace
  function ir(evento, ruta) {
    evento.preventDefault();
    irA(ruta);
  }

  function estaActivo(ruta) {
    const actual = props.rutaActual || "";
    return ruta === "/" ? actual === "/" : actual.startsWith(ruta);
  }

  return (
    <BarraNav
      expand="lg"
      sticky="top"
      className="navbar-vet"
      expanded={abierto}
      onToggle={setAbierto}
    >
      <Container>
        <BarraNav.Brand
          href="/"
          onClick={(e) => ir(e, "/")}
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
                href={enlace.ruta}
                active={estaActivo(enlace.ruta)}
                onClick={(e) => ir(e, enlace.ruta)}
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
                  onClick={props.onCerrarSesion}
                />
              </>
            ) : (
              <Boton texto="Ingresar" variante="primary" onClick={() => irA("/login")} />
            )}
          </div>
        </BarraNav.Collapse>
      </Container>
    </BarraNav>
  );
}

export default Navbar;