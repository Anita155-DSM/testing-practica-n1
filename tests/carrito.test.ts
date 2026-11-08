// EJERCICIO 4: pruebas UNITARIAS del carrito. Practicás toBe vs toEqual.
import { describe, expect, it } from 'vitest';
import { calcularTotal, resumirCarrito, type Item } from '../src/services/carrito.ts';
import { resourceUsage } from 'process';

// Datos de prueba que podés reutilizar
const yerba: Item = { nombre: 'Yerba', precio: 3000, cantidad: 2 };
const azucar: Item = { nombre: 'Azúcar', precio: 1500, cantidad: 1 };
const sal: Item = { nombre: "Sal", precio: 0, cantidad: 1}
const leche: Item = { nombre: "Leche", precio: -1, cantidad: 1 }
const coca: Item = { nombre: "Coca Cola", precio: 1, cantidad: 0 }
const sprite: Item = { nombre: "Sprite", precio: 1, cantidad: 1.5 }

describe('calcularTotal', () => {
  // it.todo('calcula el total de yerba + azúcar (3000*2 + 1500*1 = 7500)');
  it("calcula el total de yerba + azucar", () => {
    expect(calcularTotal([yerba, azucar])).toBe(7500)
  })

  // it.todo('un carrito vacío tiene total 0');
  it("un carrito vacio tiene total 0", () => {
    expect(calcularTotal([])).toBe(0)
  })

  // it.todo('acepta un producto con precio 0 (regalo) y no suma nada');

  it("acepta un producto con precio 0 y no suma nada", () => {
    expect(calcularTotal([sal, azucar])).toBe(1500)
  })

  // it.todo('rechaza un precio negativo');
  it("rechaza un precio negativo", () => {
    expect( () => calcularTotal([leche])).toThrow(RangeError)
  })

  // it.todo('rechaza una cantidad de 0 unidades');
  it("rechaza una cantidad de 0 unidades", () => {
    expect( () => calcularTotal([coca])).toThrow(RangeError)
  })

  // it.todo('rechaza una cantidad con decimales, por ejemplo 1.5');
  it("rechaza una cantidad con decimales", () => {
    expect( () => calcularTotal([sprite])).toThrow(RangeError)  //este no estoy muy segura
  })

});

describe('resumirCarrito', () => {
  // Pista: el resultado es un OBJETO. ¿toBe o toEqual?
  // it.todo('devuelve { cantidadItems: 3, total: 7500 } para yerba + azúcar');
  it("devuelve {cantidaditems: 3, total:7500} para yerba + azucar", () => {
    expect(resumirCarrito([yerba, azucar])).toEqual({ cantidadItems: 3, total:7500 }) //no se hacer esto, o sea toEqual y con objetos
  })

  // it.todo('devuelve { cantidadItems: 0, total: 0 } para un carrito vacío');
  it("devuelve { cantidadItems: 0, total: 0 } para un carrito vacío", () => {
    expect(resumirCarrito([])).toEqual({cantidadItems: 0, total: 0})
  })
})