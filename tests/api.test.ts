// EJERCICIO 6: pruebas de INTEGRACIÓN con Supertest.
// Acordate: async en el it y await en el request.
import { describe, expect, it } from 'vitest';
import request from 'supertest';
import { app } from '../src/app.ts';

//esto solo es de guia mia, ya que los tests de las peticiones siempre tienen las mismas estructuras:
// it('MÉTODO /ruta → qué esperás', async () => {
//  const respuesta = await request(app)
//    .MÉTODO('/ruta')            // 1️⃣ get, post, put, patch o delete
//    .send({ ...datos });        // 2️⃣ SOLO si mandás un body (post, put, patch)

//  expect(respuesta.status).toBe(CÓDIGO);   // 3️⃣ siempre: el status
//  expect(respuesta.body)...                //    y lo que corresponda del body
//});

describe('API de notas', () => {
  // it.todo('GET /healthy responde 200 y { estado: "ok" }');
  it("get de healthy responde 200 estado ok", async () => {
    const respuesta = await request(app).get("/healthy")
    expect(respuesta.status).toBe(200) 
    expect(respuesta.body).toEqual({ estado: "ok"})
  })

  // it.todo('POST /api/notas/evaluar con [7, 8, 9] responde 200 y { promedio: 8, aprobado: true }');
  it("post en /api/notas/evaluar responde con 200 y devuelve { promedio: 8, aprobado: true }", async () => {
    const respuesta = await request(app).post("/api/notas/evaluar").send([ {notas: [7,8,9]}])
    expect(respuesta.status).toBe(200)
    expect(respuesta.body).toEqual({ promedio: 8, aprobado: true })
  })

  // it.todo('POST /api/notas/evaluar con [2, 4] responde 200 y aprobado: false');
  it("post en api/notas/evaluar con [2, 4] responde 200 y aprobado false", async () => {
    const respuesta = await request(app).post("/api/notas/evaluar").send({notas: [2,4]})
    expect(respuesta.status).toBe(200)
    expect(respuesta.body).toEqual({ aprobado: false })
  })

  // it.todo('POST /api/notas/evaluar con [8, 15] responde 400 y el body tiene la propiedad "error"');
  it("post /api/notas/evaluar cpn [8,15] responde 400 y el body tiene la propiedad error", async () => {
    const respuesta = await request(app).post("/api/notas/evaluar").send({ notas: [8, 15] }) 
    expect(respuesta.status).toBe(400)
    expect(respuesta.body).toHaveProperty("error")
  }) 

  // it.todo('POST /api/notas/evaluar con un arreglo vacío responde 400');
  it("post a /api/notas/evaluar con un arreglo vacio responde 400", async () => {
    const respuesta = await request(app).post("/api/notas/evaluar").send({ notas: []}) //hice lo que suponia
    expect(respuesta.status).toBe(400)
  })

  // it.todo('POST /api/notas/evaluar sin enviar "notas" responde 400');
  it("post en /api/notas/evaluar sin enviar notas responde 400", async () => {
    const respuesta = await request(app).post("/api/notas/evaluar").send({}) //no se si esta bien tampoco hjajajaa
    expect(respuesta.status).toBe(400)
  })

});
