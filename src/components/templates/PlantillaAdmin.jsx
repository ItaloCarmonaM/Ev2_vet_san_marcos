import { NavLink } from "react-router-dom";

export default function PlantillaAdmin({ titulo, children }) {
  return (
    <div className="plantilla-admin">
      <nav aria-label="Administración">
        <NavLink to="/admin/servicios">Servicios</NavLink>
        <NavLink to="/admin/citas">Citas</NavLink>
      </nav>
      <main>
        <h1>{titulo}</h1>
        {children}
      </main>
    </div>
  );
}