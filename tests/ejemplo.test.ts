// EJEMPLO RESUELTO: usalo como modelo para los demás ejercicios.
import { describe, expect, it } from 'vitest';
import { calcularPromedio } from '../src/services/notas.ts';

describe('Ejemplo resuelto: calcularPromedio', () => {
  // Caso HABITUAL
  it('promedia tres notas normales', () => {
    // Preparar
    const notas = [6, 8, 10];
    // Ejecutar
    const resultado = calcularPromedio(notas);
    // Comprobar (aserción)
    expect(resultado).toBe(8);
  });

  // Caso INVÁLIDO: fijate la flecha () => dentro del expect
  it('rechaza un arreglo vacío', () => {
    expect(() => calcularPromedio([])).toThrow(RangeError);
  });
});
