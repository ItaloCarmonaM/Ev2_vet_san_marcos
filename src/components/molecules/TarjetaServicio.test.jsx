import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TarjetaServicio from './TarjetaServicio';

describe('TarjetaServicio', () => {
  const servicioMock = {
    codigo: 'SV001',
    nombre: 'Consulta General',
    duracion: '30 min',
    precio: 15000,
    especie: 'Perro / Gato'
  };

  it('muestra la información del servicio correctamente', () => {
    render(<TarjetaServicio {...servicioMock} />);
    
    expect(screen.getByText('Consulta General')).toBeInTheDocument();
    expect(screen.getByText('30 min')).toBeInTheDocument();
    expect(screen.getByText('Perro')).toBeInTheDocument();
    expect(screen.getByText('Gato')).toBeInTheDocument();
  });

  it('llama a onSolicitar al hacer clic en el botón', async () => {
    const onSolicitarMock = vi.fn();
    render(<TarjetaServicio {...servicioMock} onSolicitar={onSolicitarMock} />);
    
    const boton = screen.getByRole('button', { name: /solicitar cita/i });
    await userEvent.click(boton);
    
    expect(onSolicitarMock).toHaveBeenCalledTimes(1);
    expect(onSolicitarMock).toHaveBeenCalledWith('SV001');
  });
});