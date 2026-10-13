import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Inicio from "./pages/Inicio";
import Servicios from "./pages/Servicios";
import Login from "./pages/Login";
import SolicitarCita from "./pages/SolicitarCita";
import CitaConfirmada from "./pages/CitaConfirmada";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/solicitar-cita" element={<SolicitarCita />} />
        <Route path="/solicitar-cita/:codigo" element={<SolicitarCita />} />
        <Route path="/cita-confirmada" element={<CitaConfirmada />} />
        <Route path="/" element={<Inicio />} />
        <Route path="/servicios" element={<Servicios />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;