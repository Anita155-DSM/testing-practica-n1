// EJERCICIO 7 (TDD): ROJO → VERDE → REFACTORIZAR
// La función obtenerCondicion TODAVÍA NO EXISTE. Primero escribís los tests (van a fallar = ROJO),
// después creás la función en src/services/condicion.ts (VERDE) y al final la mejorás (REFACTOR).
//
// Regla de negocio:
//   promedio >= 8          → 'promocionado'
//   promedio >= 6 y < 8    → 'regular'
//   promedio < 6           → 'libre'
//   fuera de 0..10 o NaN   → RangeError
//
// Paso 1: descomentá el import de abajo y completá los tests.
// import { obtenerCondicion } from '../src/services/condicion.ts';
import { describe, it } from 'vitest';

describe('obtenerCondicion (TDD)', () => {
  it.todo('9 → promocionado');
  it.todo('8 → promocionado (límite)');
  it.todo('7.99 → regular (límite)');
  it.todo('6 → regular (límite)');
  it.todo('5.99 → libre (límite)');
  it.todo('0 → libre (límite)');
  it.todo('11 → RangeError');
  it.todo('NaN → RangeError');
});
