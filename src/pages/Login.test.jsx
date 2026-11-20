import { describe, it, expect, vi, beforeEach } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from './Login';
import { renderEnRuta } from '../testUtils/renderEnRuta';
import * as authService from '../services/authService';

vi.mock('../services/authService', () => ({
  login: vi.fn(),
  registrar: vi.fn(),
  obtenerPerfil: vi.fn(),
}));

const abrir = () => renderEnRuta(<Login />, { ruta: '/login', path: '/login' });

describe('Página Login', () => {
  beforeEach(() => {
    sessionStorage.clear();
    vi.resetAllMocks();
  });

  it('muestra errores si se envía vacío y no llama a la API', async () => {
    abrir();
    await userEvent.click(screen.getByRole('button', { name: 'Ingresar' }));
    expect(screen.getByText('El correo es obligatorio')).toBeInTheDocument();
    expect(screen.getByText('La contraseña es obligatoria')).toBeInTheDocument();
    expect(authService.login).not.toHaveBeenCalled();
  });

  it('valida formato de correo y largo de contraseña', async () => {
    abrir();
    await userEvent.type(screen.getByLabelText(/correo/i), 'no-es-correo');
    await userEvent.type(screen.getByLabelText(/contraseña/i), '123');
    await userEvent.click(screen.getByRole('button', { name: 'Ingresar' }));
    expect(screen.getByText('Ingresa un correo válido')).toBeInTheDocument();
    expect(screen.getByText(/al menos 6 caracteres/i)).toBeInTheDocument();
  });

  it('con datos válidos inicia sesión y navega', async () => {
    authService.login.mockResolvedValue({ accessToken: 'token-falso' });
    authService.obtenerPerfil.mockResolvedValue({
      id: 1, nombre: 'Camilo', email: 'camilo@correo.cl', rol: 'dueno_mascota',
    });
    abrir();
    await userEvent.type(screen.getByLabelText(/correo/i), 'camilo@correo.cl');
    await userEvent.type(screen.getByLabelText(/contraseña/i), 'secreto123');
    await userEvent.click(screen.getByRole('button', { name: 'Ingresar' }));

    await waitFor(() => expect(screen.getByTestId('ruta').textContent).toBe('/'));
    expect(authService.login).toHaveBeenCalledWith({ email: 'camilo@correo.cl', password: 'secreto123' });
  });

  it('con credenciales incorrectas muestra el mensaje de la API y no navega', async () => {
    authService.login.mockRejectedValue({
      response: { status: 401, data: { mensaje: 'Credenciales incorrectas.', detalles: [] } },
    });
    abrir();
    await userEvent.type(screen.getByLabelText(/correo/i), 'camilo@correo.cl');
    await userEvent.type(screen.getByLabelText(/contraseña/i), 'secreto123');
    await userEvent.click(screen.getByRole('button', { name: 'Ingresar' }));

    expect(await screen.findByText('Credenciales incorrectas.')).toBeInTheDocument();
    expect(screen.queryByTestId('ruta')).not.toBeInTheDocument();
  });

  it('el enlace de registro navega a /registro', async () => {
    abrir();
    await userEvent.click(screen.getByRole('button', { name: /regístrate/i }));
    expect(screen.getByTestId('ruta')).toHaveTextContent('/registro');
  });
});