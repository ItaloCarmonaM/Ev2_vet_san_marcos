import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter, Routes, Route, useLocation } from 'react-router-dom';
import SolicitarCita from '../SolicitarCita';

function Destino() {
  const { pathname, state } = useLocation();
  return (
    <div>
      <div data-testid="ruta">{pathname}</div>
      <div data-testid="estado">{state?.cita?.estado}</div>
      <div data-testid="mascota">{state?.cita?.mascota}</div>
    </div>
  );
}

function abrir(ruta = '/solicitar-cita') {
  return render(
    <MemoryRouter initialEntries={[ruta]}>
      <Routes>
        <Route path="/solicitar-cita" element={<SolicitarCita />} />
        <Route path="/solicitar-cita/:codigo" element={<SolicitarCita />} />
        <Route path="/cita-confirmada" element={<Destino />} />
      </Routes>
    </MemoryRouter>
  );
}

describe('Página SolicitarCita', () => {
  it('muestra errores si se envía vacío', async () => {
    abrir();
    await userEvent.click(screen.getByRole('button', { name: 'Solicitar cita' }));
    expect(screen.getByText('El nombre de la mascota es obligatorio')).toBeInTheDocument();
    expect(screen.getByText('La especie es obligatorio')).toBeInTheDocument();
    expect(screen.getByText('El servicio es obligatorio')).toBeInTheDocument();
    expect(screen.getByText('Selecciona una fecha')).toBeInTheDocument();
  });

  it('preselecciona el servicio cuando viene el código en la URL', () => {
    abrir('/solicitar-cita/VA001');
    expect(screen.getByLabelText('Servicio')).toHaveValue('VA001');
  });

  it('ignora un código de servicio que no existe', () => {
    abrir('/solicitar-cita/NOEXISTE');
    expect(screen.getByLabelText('Servicio')).toHaveValue('');
  });

  it('rechaza domingos', () => {
    abrir();
    fireEvent.change(screen.getByLabelText('Fecha'), { target: { name: 'fecha', value: '2030-03-10' } });
    expect(screen.getByText('No atendemos los domingos.')).toBeInTheDocument();
  });

  it('rechaza fechas pasadas', () => {
    abrir();
    fireEvent.change(screen.getByLabelText('Fecha'), { target: { name: 'fecha', value: '2020-01-06' } });
    expect(screen.getByText('La fecha no puede ser anterior a hoy.')).toBeInTheDocument();
  });

  it('flujo completo: envía la cita como Pendiente y navega a /cita-confirmada', async () => {
    abrir('/solicitar-cita/SV001');
    await userEvent.type(screen.getByLabelText('Nombre de la mascota'), 'Rocky');
    await userEvent.selectOptions(screen.getByLabelText('Especie'), 'Perro');
    fireEvent.change(screen.getByLabelText('Fecha'), { target: { name: 'fecha', value: '2030-03-05' } });
    await userEvent.selectOptions(screen.getByLabelText('Hora'), '10:00');
    await userEvent.click(screen.getByRole('button', { name: 'Solicitar cita' }));

    expect(screen.getByTestId('ruta')).toHaveTextContent('/cita-confirmada');
    expect(screen.getByTestId('estado')).toHaveTextContent('Pendiente');
    expect(screen.getByTestId('mascota')).toHaveTextContent('Rocky');
  });
});