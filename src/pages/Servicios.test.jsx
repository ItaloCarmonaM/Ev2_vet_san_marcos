import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Servicios from './Servicios';
import servicios from "../data/servicios"
import { renderEnRuta } from "../testUtils/renderEnRuta"

describe('Página Servicios', () => {
  it('lista todo el catálogo al inicio', () => {
    renderEnRuta(<Servicios />);
    expect(screen.getAllByRole('button', { name: /solicitar cita/i })).toHaveLength(servicios.length);
  });

  it('filtra por texto ignorando mayúsculas y tildes', async () => {
    renderEnRuta(<Servicios />);
    await userEvent.type(screen.getByRole('searchbox'), 'RADIOGRAFIA');
    expect(screen.getByText('Radiografía (1 proyección)')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: /solicitar cita/i })).toHaveLength(1);
  });

  it('también busca dentro de las observaciones', async () => {
    renderEnRuta(<Servicios />);
    await userEvent.type(screen.getByRole('searchbox'), 'obligatoria por ley');
    expect(screen.getByText('Vacuna antirrábica canina')).toBeInTheDocument();
  });

  it('filtra por categoría', async () => {
    renderEnRuta(<Servicios />);
    await userEvent.selectOptions(screen.getByRole('combobox'), 'Cirugía');
    const esperados = servicios.filter((s) => s.categoria === 'Cirugía').length;
    expect(screen.getAllByRole('button', { name: /solicitar cita/i })).toHaveLength(esperados);
  });

  it('muestra mensaje cuando no hay resultados', async () => {
    renderEnRuta(<Servicios />);
    await userEvent.type(screen.getByRole('searchbox'), 'zzzzzz');
    expect(screen.getByText(/no encontramos servicios/i)).toBeInTheDocument();
  });

  it('al solicitar cita desde un servicio navega a /solicitar-cita/:codigo', async () => {
    renderEnRuta(<Servicios />);
    await userEvent.click(screen.getAllByRole('button', { name: /solicitar cita/i })[0]);
    expect(screen.getByTestId('ruta')).toHaveTextContent('/solicitar-cita/SV001');
  });
});