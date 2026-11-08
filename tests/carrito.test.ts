// EJERCICIO 4: pruebas UNITARIAS del carrito. Practicás toBe vs toEqual.
import { describe, expect, it } from 'vitest';
import { calcularTotal, resumirCarrito, type Item } from '../src/services/carrito.ts';

// Datos de prueba que podés reutilizar
const yerba: Item = { nombre: 'Yerba', precio: 3000, cantidad: 2 };
const azucar: Item = { nombre: 'Azúcar', precio: 1500, cantidad: 1 };

describe('calcularTotal', () => {
  it.todo('calcula el total de yerba + azúcar (3000*2 + 1500*1 = 7500)');
  it.todo('un carrito vacío tiene total 0');
  it.todo('acepta un producto con precio 0 (regalo) y no suma nada');
  it.todo('rechaza un precio negativo');
  it.todo('rechaza una cantidad de 0 unidades');
  it.todo('rechaza una cantidad con decimales, por ejemplo 1.5');
});

describe('resumirCarrito', () => {
  // Pista: el resultado es un OBJETO. ¿toBe o toEqual?
  it.todo('devuelve { cantidadItems: 3, total: 7500 } para yerba + azúcar');
  it.todo('devuelve { cantidadItems: 0, total: 0 } para un carrito vacío');
});
