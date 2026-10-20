import { describe, it, expect } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from './Login';
import { renderEnRuta } from '../testUtils/renderEnRuta'

describe('Página Login', () => {
  it('muestra errores si se envía vacío y no navega', async () => {
    renderEnRuta(<Login />, { ruta: '/login', path: '/login' });
    await userEvent.click(screen.getByRole('button', { name: 'Ingresar' }));
    expect(screen.getByText('El correo es obligatorio')).toBeInTheDocument();
    expect(screen.getByText('La contraseña es obligatoria')).toBeInTheDocument();
    expect(screen.queryByTestId('ruta')).not.toBeInTheDocument();
  });

  it('valida formato de correo y largo de contraseña', async () => {
    renderEnRuta(<Login />, { ruta: '/login', path: '/login' });
    await userEvent.type(screen.getByLabelText(/correo/i), 'no-es-correo');
    await userEvent.type(screen.getByLabelText(/contraseña/i), '123');
    await userEvent.click(screen.getByRole('button', { name: 'Ingresar' }));
    expect(screen.getByText('Ingresa un correo válido')).toBeInTheDocument();
    expect(screen.getByText(/al menos 6 caracteres/i)).toBeInTheDocument();
  });

  it('con datos válidos navega al inicio', async () => {
    renderEnRuta(<Login />, { ruta: '/login', path: '/login' });
    await userEvent.type(screen.getByLabelText(/correo/i), 'camilo@correo.cl');
    await userEvent.type(screen.getByLabelText(/contraseña/i), 'secreto123');
    await userEvent.click(screen.getByRole('button', { name: 'Ingresar' }));
    expect(screen.getByTestId('ruta').textContent).toBe('/');
  });

  it('el enlace de registro navega a /registro', async () => {
    renderEnRuta(<Login />, { ruta: '/login', path: '/login' });
    await userEvent.click(screen.getByRole('button', { name: /regístrate/i }));
    expect(screen.getByTestId('ruta')).toHaveTextContent('/registro');
  });
});