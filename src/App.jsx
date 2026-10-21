import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Inicio from "./pages/Inicio";
import Servicios from "./pages/Servicios";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import SolicitarCita from "./pages/SolicitarCita";
import CitaConfirmada from "./pages/CitaConfirmada";
import AdminServicios from "./pages/AdminServicios";
import AdminCitas from "./pages/AdminCitas";
import Categorias from './pages/Categorias';
import DetalleServicio from './pages/DetalleServicio';
import MisCitas from "./pages/MisCitas";
import { ServiciosProvider } from "./context/ServiciosContext";
import { CitasProvider } from "./context/CitasContext";

function App() {
  return (
    <ServiciosProvider>
      <CitasProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/solicitar-cita" element={<SolicitarCita />} />
            <Route path="/solicitar-cita/:codigo" element={<SolicitarCita />} />
            <Route path="/cita-confirmada" element={<CitaConfirmada />} />
            <Route path="/" element={<Inicio />} />
            <Route path="/servicios" element={<Servicios />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/admin/servicios" element={<AdminServicios />} />
            <Route path="/admin/citas" element={<AdminCitas />} />
            <Route path="/mis-citas" element={<MisCitas />} />
            <Route path="*" element={<Navigate to="/" replace />} />
            <Route path="/categorias" element={<Categorias />} />
            <Route path="/servicio/:codigo" element={<DetalleServicio />} />
          </Routes>
        </BrowserRouter>
      </CitasProvider>
    </ServiciosProvider>
  );
}

export default App;