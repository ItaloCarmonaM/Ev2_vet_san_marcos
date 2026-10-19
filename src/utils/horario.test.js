import { describe, it, expect } from 'vitest';
import { esFueraDeHorario } from './horario';

describe('horario.js - Validación de turnos', () => {
  it('detecta correctamente cuando es horario laboral normal', () => {
    // Un lunes a las 11:00 AM (dentro de horario hábil)
    const fechaHabil = new Date('2026-10-19T11:00:00');
    
    const resultado = esFueraDeHorario(fechaHabil);
    expect(resultado).toBe(false);
  });

  it('detecta correctamente cuando está fuera de horario (ej: de madrugada)', () => {
    // Un lunes a las 03:00 AM (fuera de horario hábil)
    const fechaMadrugada = new Date('2026-10-19T03:00:00');
    
    const resultado = esFueraDeHorario(fechaMadrugada);
    expect(resultado).toBe(true);
  });
});