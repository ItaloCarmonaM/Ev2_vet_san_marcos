import Navbar from "../organisms/Navbar";
import Footer from "../organisms/Footer";

function PlantillaPublica(props) {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar usuario={props.usuario} onCerrarSesion={props.onCerrarSesion} />
      <main className="flex-grow-1">{props.children}</main>
      <Footer />
    </div>
  );
}

export default PlantillaPublica;