// EJERCICIO 6: pruebas de INTEGRACIÓN con Supertest.
// Acordate: async en el it y await en el request.
import { describe, expect, it } from 'vitest';
import request from 'supertest';
import { app } from '../src/app.ts';

describe('API de notas', () => {
  it.todo('GET /healthy responde 200 y { estado: "ok" }');

  it.todo('POST /api/notas/evaluar con [7, 8, 9] responde 200 y { promedio: 8, aprobado: true }');

  it.todo('POST /api/notas/evaluar con [2, 4] responde 200 y aprobado: false');

  it.todo('POST /api/notas/evaluar con [8, 15] responde 400 y el body tiene la propiedad "error"');

  it.todo('POST /api/notas/evaluar con un arreglo vacío responde 400');

  it.todo('POST /api/notas/evaluar sin enviar "notas" responde 400');
});
