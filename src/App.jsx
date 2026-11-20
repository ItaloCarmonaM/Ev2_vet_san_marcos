import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ServiciosProvider } from "./context/ServiciosContext";
import { CitasProvider } from "./context/CitasContext";
import { PacientesProvider } from "./context/PacientesContext";
import RutaProtegida from "./routes/RutaProtegida";
import Inicio from "./pages/Inicio";
import Servicios from "./pages/Servicios";
import Categorias from "./pages/Categorias";
import DetalleServicio from "./pages/DetalleServicio";
import Login from "./pages/Login";
import Registro from "./pages/Registro";
import SinPermiso from "./pages/SinPermiso";
import SolicitarCita from "./pages/SolicitarCita";
import CitaConfirmada from "./pages/CitaConfirmada";
import MisCitas from "./pages/MisCitas";
import MisVacunas from "./pages/MisVacunas";
import PanelVeterinario from "./pages/PanelVeterinario";
import FichaPaciente from "./pages/FichaPaciente";
import AdminServicios from "./pages/AdminServicios";
import AdminCitas from "./pages/AdminCitas";
import AdminUsuarios from "./pages/AdminUsuarios";

const DUENIO = ["dueno_mascota"];
const PERSONAL = ["administrador", "recepcionista"];
const ADMIN = ["administrador"];

function protegida(roles, pagina) {
  return <RutaProtegida roles={roles}>{pagina}</RutaProtegida>;
}

function App() {
  return (
    <AuthProvider>
      <ServiciosProvider>
        <CitasProvider>
          <PacientesProvider>
            <BrowserRouter>
              <Routes>
                {/* Públicas */}
                <Route path="/" element={<Inicio />} />
                <Route path="/servicios" element={<Servicios />} />
                <Route path="/categorias" element={<Categorias />} />
                <Route path="/servicio/:codigo" element={<DetalleServicio />} />
                <Route path="/login" element={<Login />} />
                <Route path="/registro" element={<Registro />} />
                <Route path="/sin-permiso" element={<SinPermiso />} />

                {/* Dueño de mascota */}
                <Route path="/solicitar-cita" element={protegida(DUENIO, <SolicitarCita />)} />
                <Route path="/solicitar-cita/:codigo" element={protegida(DUENIO, <SolicitarCita />)} />
                <Route path="/cita-confirmada" element={protegida(DUENIO, <CitaConfirmada />)} />
                <Route path="/mis-citas" element={protegida(DUENIO, <MisCitas />)} />
                <Route path="/mis-vacunas" element={protegida(DUENIO, <MisVacunas />)} />

                {/* Recepcionista y administrador */}
                <Route path="/admin/citas" element={protegida(PERSONAL, <AdminCitas />)} />
                <Route path="/veterinario" element={protegida(PERSONAL, <PanelVeterinario />)} />
                <Route path="/veterinario/paciente/:id" element={protegida(PERSONAL, <FichaPaciente />)} />

                {/* Solo administrador */}
                <Route path="/admin/servicios" element={protegida(ADMIN, <AdminServicios />)} />
                <Route path="/admin/usuarios" element={protegida(ADMIN, <AdminUsuarios />)} />

                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </BrowserRouter>
          </PacientesProvider>
        </CitasProvider>
      </ServiciosProvider>
    </AuthProvider>
  );
}

export default App;