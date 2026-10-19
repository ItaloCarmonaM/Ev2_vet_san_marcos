import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import EtiquetaEspecie from './EtiquetaEspecie';

describe('EtiquetaEspecie (Átomo)', () => {
  it('muestra correctamente el texto de la especie pasada por prop', () => {
    render(<EtiquetaEspecie especie="Gato" />);
    
    const etiqueta = screen.getByText('Gato');
    expect(etiqueta).toBeInTheDocument();
    expect(etiqueta).toHaveClass('badge');
  });

  it('utiliza la especie por defecto (General) si no se reciben props', () => {
    render(<EtiquetaEspecie />);
    
    expect(screen.getByText('General')).toBeInTheDocument();
  });
});