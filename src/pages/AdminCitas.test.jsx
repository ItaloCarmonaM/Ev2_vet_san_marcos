import { describe, it, expect } from 'vitest';
import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AdminCitas from './AdminCitas';
import { renderEnRuta } from "../testUtils/renderEnRuta";

const INICIALES = [
  { id: 1, mascota: 'Rocky', especie: 'Perro', servicio: 'Vacunación', fecha: '2026-10-20', hora: '10:00', estado: 'Pendiente' },
  { id: 2, mascota: 'Misu', especie: 'Gato', servicio: 'Consulta general', fecha: '2026-10-21', hora: '15:30', estado: 'Confirmada' },
];

const abrir = () =>
  renderEnRuta(<AdminCitas />, { ruta: '/admin/citas', path: '/admin/citas', citas: INICIALES });

const filaDe = (mascota) => screen.getByRole('cell', { name: new RegExp(mascota) }).closest('tr');

describe('Página AdminCitas', () => {
  it('lista las citas iniciales con fecha dd-mm-aaaa', () => {
    abrir();
    expect(screen.getByRole('heading', { name: 'Administrar citas' })).toBeInTheDocument();
    expect(screen.getByText('20-10-2026')).toBeInTheDocument();
    expect(screen.getByText('Vacunación')).toBeInTheDocument();
  });

  it('una cita Pendiente se puede Confirmar y luego Completar', async () => {
    abrir();
    await userEvent.click(within(filaDe('Rocky')).getByRole('button', { name: 'Confirmar' }));
    expect(within(filaDe('Rocky')).getByText('Confirmada')).toBeInTheDocument();
    await userEvent.click(within(filaDe('Rocky')).getByRole('button', { name: 'Completar' }));
    expect(within(filaDe('Rocky')).getByText('Completada')).toBeInTheDocument();
    expect(within(filaDe('Rocky')).queryByRole('button')).not.toBeInTheDocument();
  });

  it('cancelar una cita deja de ofrecer acciones', async () => {
    abrir();
    await userEvent.click(within(filaDe('Misu')).getByRole('button', { name: 'Cancelar' }));
    expect(within(filaDe('Misu')).getByText('Cancelada')).toBeInTheDocument();
    expect(within(filaDe('Misu')).queryByRole('button')).not.toBeInTheDocument();
  });
});