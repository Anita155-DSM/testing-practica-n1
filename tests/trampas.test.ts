// EJERCICIO 5: CAZÁ LAS TRAMPAS
// Estos 3 tests están MAL ESCRITOS: el código de src/ funciona bien en estos casos,
// pero los tests fallan igual. Arreglá SOLO los tests (no toques src/).
// Para cada uno, anotá en el README POR QUÉ fallaba.
import { describe, expect, it } from 'vitest';
import request from 'supertest';
import { app } from '../src/app.ts';
import { calcularPromedio } from '../src/services/notas.ts';
import { resumirCarrito } from '../src/services/carrito.ts';

describe('Trampas', () => {
  it('trampa 1: rechaza una nota de 15', () => {
    expect(() => calcularPromedio([15])).toThrow(RangeError);
  });

  it('trampa 2: resume un carrito con un solo producto', () => {
    const resumen = resumirCarrito([{ nombre: 'Pan', precio: 2000, cantidad: 1 }]);
    expect(resumen).toEqual({ cantidadItems: 1, total: 2000 });
  });

  it('trampa 3: el chequeo de salud responde 200', async () => {
    const respuesta = await request(app).get('/healthy');
    expect(respuesta.status).toBe(200);
  });
});
