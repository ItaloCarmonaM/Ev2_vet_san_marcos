import { render } from '@testing-library/react';
import { MemoryRouter, Routes, Route, useLocation } from 'react-router-dom';

// Muestra la ruta actual para poder comprobar navegaciones
export function RutaActual() {
  const { pathname } = useLocation();
  return <div data-testid="ruta">{pathname}</div>;
}

// Renderiza una página en una ruta concreta, con una ruta "comodín" que muestra el pathname
export function renderEnRuta(elemento, { ruta = '/', path = '/', state } = {}) {
  return render(
    <MemoryRouter initialEntries={[{ pathname: ruta, state }]}>
      <Routes>
        <Route path={path} element={elemento} />
        <Route path="*" element={<RutaActual />} />
      </Routes>
    </MemoryRouter>
  );
}