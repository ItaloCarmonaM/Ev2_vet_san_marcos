import { describe, it, expect, vi, afterEach } from 'vitest';
import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AdminServicios from '../AdminServicios';
import { renderEnRuta } from './utilsPrueba';

const abrir = () => renderEnRuta(<AdminServicios />, { ruta: '/admin/servicios', path: '/admin/servicios' });

afterEach(() => vi.restoreAllMocks());

describe('Página AdminServicios', () => {
  it('muestra los servicios iniciales y el formulario de alta', () => {
    abrir();
    expect(screen.getByRole('heading', { name: 'Administrar servicios' })).toBeInTheDocument();
    expect(screen.getByText('Nuevo servicio')).toBeInTheDocument();
    expect(screen.getByRole('cell', { name: 'Consulta general' })).toBeInTheDocument();
    expect(screen.getByText('$12.000')).toBeInTheDocument();
  });

  it('valida campos obligatorios al agregar', async () => {
    abrir();
    await userEvent.click(screen.getByRole('button', { name: /agregar servicio/i }));
    expect(screen.getByText('El nombre es obligatorio')).toBeInTheDocument();
    expect(screen.getByText('El precio es obligatorio')).toBeInTheDocument();
  });

  it('rechaza precio 0 o negativo', async () => {
    abrir();
    await userEvent.type(screen.getByLabelText('Precio (CLP)'), '-5');
    await userEvent.click(screen.getByRole('button', { name: /agregar servicio/i }));
    expect(screen.getByText('Ingresa un precio mayor a 0')).toBeInTheDocument();
  });

  it('agrega un servicio nuevo a la tabla', async () => {
    abrir();
    await userEvent.type(screen.getByLabelText('Nombre del servicio'), 'Baño medicado');
    await userEvent.selectOptions(screen.getByLabelText('Categoría'), 'Otros');
    await userEvent.type(screen.getByLabelText('Especie'), 'Perro');
    await userEvent.type(screen.getByLabelText('Duración'), '30 min');
    await userEvent.type(screen.getByLabelText('Precio (CLP)'), '20000');
    await userEvent.click(screen.getByRole('button', { name: /agregar servicio/i }));
    expect(screen.getByRole('cell', { name: 'Baño medicado' })).toBeInTheDocument();
    expect(screen.getByText('$20.000')).toBeInTheDocument();
  });

  it('edita un servicio existente', async () => {
    abrir();
    const fila = screen.getByRole('cell', { name: 'Vacunación' }).closest('tr');
    await userEvent.click(within(fila).getByRole('button', { name: 'Editar' }));
    expect(screen.getByText('Editar servicio')).toBeInTheDocument();
    const nombre = screen.getByLabelText('Nombre del servicio');
    expect(nombre).toHaveValue('Vacunación');
    await userEvent.clear(nombre);
    await userEvent.type(nombre, 'Vacunación anual');
    await userEvent.click(screen.getByRole('button', { name: /guardar cambios/i }));
    expect(screen.getByRole('cell', { name: 'Vacunación anual' })).toBeInTheDocument();
    expect(screen.getByText('Nuevo servicio')).toBeInTheDocument();
  });

  it('elimina un servicio solo si se confirma', async () => {
    const confirmar = vi.spyOn(window, 'confirm');
    abrir();
    const fila = () => screen.getByRole('cell', { name: 'Consulta general' }).closest('tr');

    confirmar.mockReturnValueOnce(false);
    await userEvent.click(within(fila()).getByRole('button', { name: 'Eliminar' }));
    expect(screen.getByRole('cell', { name: 'Consulta general' })).toBeInTheDocument();

    confirmar.mockReturnValueOnce(true);
    await userEvent.click(within(fila()).getByRole('button', { name: 'Eliminar' }));
    expect(screen.queryByRole('cell', { name: 'Consulta general' })).not.toBeInTheDocument();
  });

  it('muestra mensaje cuando se eliminan todos', async () => {
    vi.spyOn(window, 'confirm').mockReturnValue(true);
    abrir();
    for (const nombre of ['Consulta general', 'Vacunación']) {
      const fila = screen.getByRole('cell', { name: nombre }).closest('tr');
      await userEvent.click(within(fila).getByRole('button', { name: 'Eliminar' }));
    }
    expect(screen.getByText(/no hay servicios/i)).toBeInTheDocument();
  });
});