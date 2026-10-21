import { render } from '@testing-library/react';
import { MemoryRouter, Routes, Route, useLocation } from 'react-router-dom';
import { ServiciosProvider } from "../context/ServiciosContext";
import { CitasProvider } from "../context/CitasContext";

export function RutaActual() {
  const { pathname } = useLocation();
  return <div data-testid="ruta">{pathname}</div>;
}

export function renderEnRuta(elemento, { ruta = '/', path = '/', state, servicios, citas } = {}) {
  return render(
    <ServiciosProvider iniciales={servicios}>
      <CitasProvider iniciales={citas}>
        <MemoryRouter initialEntries={[{ pathname: ruta, state }]}>
          <Routes>
            <Route path={path} element={elemento} />
            <Route path="*" element={<RutaActual />} />
          </Routes>
        </MemoryRouter>
      </CitasProvider>
    </ServiciosProvider>
  );
}