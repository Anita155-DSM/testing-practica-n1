# 🧪 Práctica de Testing · Nivel 1

**TLP IV · Preparación para el parcial del 10/11**

Este proyecto simula lo que te pueden dar en la práctica: **un backend ya hecho** (Express + TypeScript) al que le tenés que **escribir los tests**. Usa el mismo stack que el laboratorio de clase: Node.js con TypeScript nativo, Vitest y Supertest.

> ⚠️ El código de `src/` tiene **2 bugs escondidos a propósito**. No los busques leyendo el código: dejá que **tus tests los encuentren**. Así se trabaja de verdad.

---

## 0. Preparación

```bash
node --version   # tiene que ser 22.18 o más
npm install
npm test
```

Estructura:

```text
├── src/
│   ├── app.ts                 ← rutas HTTP (Express)
│   ├── server.ts              ← levanta el servidor en el puerto 3000
│   └── services/
│       ├── notas.ts           ← reglas de notas (¡tiene un bug!)
│       └── carrito.ts         ← reglas del carrito (¡tiene un bug!)
├── tests/
│   ├── ejemplo.test.ts        ← RESUELTO, usalo de modelo
│   ├── notas.test.ts          ← Ejercicios 2 y 3
│   ├── carrito.test.ts        ← Ejercicio 4
│   ├── trampas.test.ts        ← Ejercicio 5
│   ├── api.test.ts            ← Ejercicio 6
│   └── condicion.test.ts      ← Ejercicio 7 (TDD)
├── SOLUCIONES.md              ← ¡abrilo solo cuando termines!
└── package.json
```

**Comandos:**

| Comando | Qué hace |
|---|---|
| `npm test` | Corre todos los tests una vez |
| `npm run test:watch` | Corre los tests cada vez que guardás (recomendado mientras practicás) |
| `npm run typecheck` | Revisa los tipos sin ejecutar nada |
| `npm run dev` | Levanta la API en `http://localhost:3000` |

---

## 📌 Chuleta rápida

```ts
import { describe, expect, it } from 'vitest';

describe('grupo', () => {                 // agrupa tests
  it('comportamiento', () => {            // un caso
    expect(2 + 2).toBe(4);                // igualdad estricta (números, strings, booleanos)
    expect({ a: 1 }).toEqual({ a: 1 });   // compara la estructura (objetos y arreglos)
    expect(0.1 + 0.2).toBeCloseTo(0.3);   // números con decimales "infinitos"
    expect({ error: 'x' }).toHaveProperty('error');
    expect(() => funcion(-1)).toThrow(RangeError);  // ¡con la flecha () =>!
  });
});

// Integración HTTP con Supertest
it('ruta', async () => {                  // async
  const res = await request(app)          // await
    .post('/ruta')
    .send({ dato: 1 });
  expect(res.status).toBe(200);
  expect(res.body).toEqual({ ... });
});
```

**Recordá los 3 tipos de casos:** ✅ habitual · 📏 límite · ❌ inválido.

---

## Ejercicio 1 · Leer antes de escribir ⭐

1. Corré `npm test`. Anotá **cuántos tests pasan, cuántos fallan y cuántos están en "todo"**.
2. Abrí `tests/ejemplo.test.ts` e identificá las partes **Preparar → Ejecutar → Comprobar**.
3. Abrí `src/services/notas.ts` y `src/services/carrito.ts`, pero **leé solo el comentario de REGLAS DE NEGOCIO**, no el código. Los resultados esperados de tus tests tienen que salir de ahí.
4. Respondé: ¿qué archivo tiene la **lógica de negocio** y qué archivo tiene las **rutas HTTP**? ¿Qué tipo de prueba corresponde a cada uno?

---

## Ejercicio 2 · Unitarias de `calcularPromedio` ⭐

En `tests/notas.test.ts` cambiá cada `it.todo('...')` por un test real:

```ts
// ANTES
it.todo('promedia [7, 8] y devuelve 7.5');

// DESPUÉS
it('promedia [7, 8] y devuelve 7.5', () => {
  expect(calcularPromedio([7, 8])).toBe(7.5);
});
```

**Desafío:** el caso `[7, 8, 8]` da `7.666666...`. Probá con `toBe(7.67)` y mirá cómo falla. Después resolvelo con `toBeCloseTo(7.67, 2)`. ¿Por qué hace falta?

---

## Ejercicio 3 · Unitarias de `estaAprobado` y el primer bug 🐞 ⭐⭐

Completá los tests de `estaAprobado`. **Uno de ellos va a fallar.**

1. ¿Cuál falla? ¿Qué valor **esperaba** el test y cuál **recibió**?
2. Antes de tocar nada, preguntate: **¿el problema está en el código, en el test o en el requisito?** Volvé a leer la regla de negocio.
3. Encontrá el bug en `src/services/notas.ts` y corregilo.
4. Volvé a correr **todos** los tests. ¿Por qué todos y no solo el que fallaba? (pista: **regresión**)
5. ¿Qué **tipo de caso** encontró el bug: habitual, límite o inválido?

---

## Ejercicio 4 · Carrito: `toBe` vs `toEqual` y el segundo bug 🐞 ⭐⭐

Completá `tests/carrito.test.ts`.

1. Para `resumirCarrito`, que devuelve un **objeto**, ¿usaste `toBe` o `toEqual`? Probá con el otro y fijate qué pasa.
2. Uno de los tests de `calcularTotal` va a fallar: hay otro bug. Encontralo y corregilo **guiándote por la regla de negocio**.
3. ¿Qué tienen en común los dos bugs que encontraste? ¿Qué lección te deja sobre los casos límite?

---

## Ejercicio 5 · Cazá las trampas 🪤 ⭐⭐

En `tests/trampas.test.ts` hay **3 tests mal escritos**: el código de `src/` funciona bien, pero los tests fallan igual.

1. Arreglá **solo los tests**.
2. Para cada trampa, completá la tabla con tus palabras:

| Trampa | ¿Por qué fallaba? | ¿Cómo lo arreglaste? |
|---|---|---|
| 1 | | |
| 2 | | |
| 3 | | |

3. **Bonus:** antes de arreglar la trampa 3, corré `npm run typecheck`. ¿Qué dice? ¿Qué te enseña sobre la diferencia entre `typecheck` y `npm test`?

---

## Ejercicio 6 · Integración con Supertest ⭐⭐

Completá `tests/api.test.ts`. La ruta es:

```
POST /api/notas/evaluar
Body:      { "notas": [7, 8, 9] }
Respuesta: 200 → { "promedio": 8, "aprobado": true }
           400 → { "error": "..." }   (notas inválidas, arreglo vacío o sin "notas")
```

Después respondé:
1. ¿Por qué estos tests son de **integración** y no unitarios? Nombrá **qué partes** participan.
2. ¿Hizo falta correr `npm run dev` para que pasen? ¿Por qué no?
3. Si el bug del ejercicio 3 siguiera sin corregir, ¿cuál de estos tests lo habría detectado? ¿Con qué notas habría que probar para encontrarlo desde la API? (pista: notas cuyo promedio dé **exactamente 6**)

---

## Ejercicio 7 · TDD: rojo → verde → refactorizar 🚦 ⭐⭐⭐

La función `obtenerCondicion` **todavía no existe**. Abrí `tests/condicion.test.ts` y seguí los pasos:

1. 🔴 **ROJO:** descomentá el `import` y escribí los 8 tests. Corré `npm test`: tiene que **fallar**, porque el archivo no existe. ¡Está bien que falle!
2. 🟢 **VERDE:** creá `src/services/condicion.ts` con `export function obtenerCondicion(promedio: number)` e implementá **lo mínimo** para que pasen todos.
3. 🔧 **REFACTORIZAR:** mejorá el código sin romper los tests. Ideas: definí un tipo `type Condicion = 'promocionado' | 'regular' | 'libre'` para el retorno, ordená los `if`, y fijate si podés **reutilizar** alguna validación que ya existe en `notas.ts`.
4. Después de cada cambio del refactor, corré los tests. Si algo se pone rojo, volvé atrás.

---

## Ejercicio 8 · Preguntas a desarrollar ✍️

Respondelas por escrito con tus palabras, sin mirar apuntes:

1. ¿Por qué una API que devuelve **HTTP 200** puede tener igual un error de negocio?
2. ¿Por qué `toThrow` necesita recibir `() => funcion()` y no `funcion()` directamente?
3. ¿Por qué `toBe({ total: 900 })` falla aunque la API devuelva exactamente `{ total: 900 }`?
4. Un compañero dice: *"tengo 100 % de cobertura y el typecheck pasa, así que mi código no tiene errores"*. Refutalo con **dos** argumentos.
5. Tenés un `EmpleadoService` que llama a `repositorio.guardar(empleado)`. Querés comprobar que, si el salario es negativo, **`guardar` nunca se llame**. ¿Qué doble de prueba usarías y por qué? (lo vamos a practicar en el nivel 2)
6. ¿Qué te mostraron los 2 bugs de esta práctica sobre la diferencia entre casos **habituales** y casos **límite**?

---

## ✅ Registro final

| Comprobación | Resultado |
|---|---|
| Tests al empezar (pasan / fallan / todo) | |
| Bug 1 encontrado (archivo y línea) | |
| Bug 2 encontrado (archivo y línea) | |
| Trampas resueltas | /3 |
| Tests al terminar (todos en verde) | |
| `npm run typecheck` sin errores | |

**Meta:** `npm test` con **40 tests en verde** y `npm run typecheck` sin errores.

---

## 🔜 Lo que viene en los próximos niveles

- **Nivel 2:** backend con **POO en TypeScript** (clases, interfaces, capas controller → service → repository) y **dobles de prueba** con `vi.fn()`, `mockReturnValue`, `toHaveBeenCalledWith` y `vi.spyOn`.
- **Nivel 3:** **Docker** (Dockerfile, imagen, contenedor, docker compose) y correr los tests dentro de un contenedor.
- **Simulacro final:** backend nuevo + consigna estilo parcial, con tiempo.
