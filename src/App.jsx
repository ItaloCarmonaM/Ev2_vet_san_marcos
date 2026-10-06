import './App.css'
import { Routes, Route, Navigate } from "react-router-dom";
import Inicio from "./pages/Inicio";
import Login from "./pages/Login";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Inicio />} />
      <Route path="/login" element={<Login />} />

      {/* Cuando exista la página Servicios, se agrega aquí:
          <Route path="/servicios" element={<Servicios />} /> */}

      {/* Cualquier ruta que no exista vuelve al inicio */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;