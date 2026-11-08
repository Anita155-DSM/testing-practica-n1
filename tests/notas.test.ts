// EJERCICIOS 2 y 3: pruebas UNITARIAS del servicio de notas.
// Reemplazá cada it.todo('...') por un it('...', () => { ... }) con su expect.
import { describe, expect, it } from 'vitest';
import { calcularPromedio, estaAprobado } from '../src/services/notas.ts';

describe('calcularPromedio', () => {
  // --- Habituales ---
  // it.todo('promedia [7, 8] y devuelve 7.5');
  it("promedia [7,8] y devuelve 7.5", () => {
    expect(calcularPromedio([7,8])).toBe(7.5)
  })

  // --- Límite ---
  // it.todo('promedia [0, 0, 0] y devuelve 0');
  it("promedia [0,0,0] y devuelve 0", () => {
    expect(calcularPromedio([0,0,0])).toBe(0)
  })

  // it.todo('promedia [10] (una sola nota) y devuelve 10');
  it("promedia [10] una sola nota, y devuelve 10", () => {
    expect(calcularPromedio([10])).toBe(10)
  })

  // --- Inválidos ---
  // it.todo('rechaza una nota mayor a 10, por ejemplo [8, 11]');
  it("rechaza una nota mayor a 10", () => {
    expect( () => calcularPromedio([8, 11])).toThrow(RangeError)
  })

  // it.todo('rechaza una nota negativa, por ejemplo [-1, 7]');
  it("rechaza una nota negativa", () => {
    expect( () => calcularPromedio([-1, 7])).toThrow(RangeError)
  })

  // it.todo('rechaza NaN dentro de las notas');
  it("rechaza NaN dentro de las notas", () => {
    expect( () => calcularPromedio([NaN])).toThrow(RangeError)
  })

  // --- Desafío: el resultado tiene infinitos decimales ---
  // [7, 8, 8] da 7.6666666... ¿Por qué toBe(7.67) falla?
  // Investigá el matcher toBeCloseTo(valor, decimales).

  // it.todo('promedia [7, 8, 8] y devuelve aproximadamente 7.67');
  it("promedia [7,8,8] y devuelve aproximadamente 7.67", () => {
    expect(calcularPromedio([7,8,8])).toBeCloseTo(7.67)
  })
  
});

describe('estaAprobado', () => {
  // --- Habituales ---
  // it.todo('un promedio de 8 aprueba (true)');
  it("un promedio de 8 aprueba", () => {
    expect(estaAprobado(8)).toBe(true)
  })

  // it.todo('un promedio de 4 no aprueba (false)');
  it("un promedio de 4 no aprueba", () => {
    expect(estaAprobado(4)).toBe(false)
  })

  // --- Límite (¡ojo acá!) ---
  // it.todo('un promedio de exactamente 6 aprueba (true)');
  it("un promedio de exactamente 6 aprueba", () => {
    expect(estaAprobado(6)).toBe(true)
  })

  // it.todo('un promedio de 5.99 no aprueba (false)');
  it("un promedio de 5.99 no aprueba", () => {
    expect(estaAprobado(5.99)).toBe(false)
  })

  // --- Inválidos ---
  // it.todo('rechaza un promedio de 11');
  it("rechaza un promedio de 11", () => {
    expect( () => estaAprobado(11)).toThrow(RangeError)
  })

  // it.todo('rechaza un promedio negativo');
  it("rechaza un promedio negativo", () => {
    expect( () => estaAprobado(-10)).toThrow(RangeError)
  })

});
