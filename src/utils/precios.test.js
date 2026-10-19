import { describe, it, expect } from 'vitest';
import { tieneRecargoFueraDeHorario, calcularPrecioServicio } from './precios';

describe('precios.js - Lógica de recargos', () => {
  it('detecta correctamente si un servicio tiene recargo fuera de horario', () => {
    const servicioConRecargo = { codigo: 'SV002', precio: 25000 };
    const servicioSinRecargo = { codigo: 'SV001', precio: 15000 };

    expect(tieneRecargoFueraDeHorario(servicioConRecargo)).toBe(true);
    expect(tieneRecargoFueraDeHorario(servicioSinRecargo)).toBe(false);
  });

  it('calcula el precio base en horario normal', () => {
    const servicio = { codigo: 'SV002', precio: 25000 };
    // Una fecha de lunes a las 10:00 AM (horario normal de atención)
    const fechaNormal = new Date('2026-10-19T10:00:00');
    
    const precioFinal = calcularPrecioServicio(servicio, fechaNormal);
    expect(precioFinal).toBe(25000);
  });
});