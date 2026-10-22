import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ServiciosProvider } from "./context/ServiciosContext";
import { CitasProvider } from "./context/CitasContext";
import { PacientesProvider } from "./context/PacientesContext";
import Inicio from "./pages/Inicio";
import Servicios from "./pages/Servicios";
import Categorias from "./pages/Categorias";
import DetalleServicio from "./pages/DetalleServicio";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import SolicitarCita from "./pages/SolicitarCita";
import CitaConfirmada from "./pages/CitaConfirmada";
import MisCitas from "./pages/MisCitas";
import MisVacunas from "./pages/MisVacunas";
import PanelVeterinario from "./pages/PanelVeterinario";
import FichaPaciente from "./pages/FichaPaciente";
import AdminServicios from "./pages/AdminServicios";
import AdminCitas from "./pages/AdminCitas";

function App() {
  return (
    <ServiciosProvider>
      <CitasProvider>
        <PacientesProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Inicio />} />
              <Route path="/servicios" element={<Servicios />} />
              <Route path="/categorias" element={<Categorias />} />
              <Route path="/servicio/:codigo" element={<DetalleServicio />} />
              <Route path="/solicitar-cita" element={<SolicitarCita />} />
              <Route path="/solicitar-cita/:codigo" element={<SolicitarCita />} />
              <Route path="/cita-confirmada" element={<CitaConfirmada />} />
              <Route path="/mis-citas" element={<MisCitas />} />
              <Route path="/mis-vacunas" element={<MisVacunas />} />
              <Route path="/login" element={<Login />} />
              <Route path="/registro" element={<Registro />} />
              <Route path="/veterinario" element={<PanelVeterinario />} />
              <Route path="/veterinario/paciente/:id" element={<FichaPaciente />} />
              <Route path="/admin/servicios" element={<AdminServicios />} />
              <Route path="/admin/citas" element={<AdminCitas />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </PacientesProvider>
      </CitasProvider>
    </ServiciosProvider>
  );
}

export default App;