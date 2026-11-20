import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../organisms/Navbar";
import Footer from "../organisms/Footer";
import { useAuth } from "../../hooks/useAuth";
import { enlacesDeRol } from "../../data/menus";

function PlantillaPublica(props) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { usuario, cerrarSesion } = useAuth();

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
      <main className="flex-grow-1">{props.children}</main>
      <Footer />
    </div>
  );
}

export default PlantillaPublica;