# ✅ Soluciones · Nivel 1

> 🛑 **Abrilo solo después de intentar todo.** Si te trabás, mirá solo el ejercicio puntual.

---

## Ejercicio 1
- Al empezar: **2 pasan** (el ejemplo), **3 fallan** (las trampas) y **35 están en "todo"**.
- `services/*.ts` tiene la **lógica de negocio** → **pruebas unitarias**. `app.ts` tiene las **rutas HTTP** → **pruebas de integración** (ruta + servicio).

---

## Bug 1 · `src/services/notas.ts` (ejercicio 3)

```ts
// ❌ ANTES
return promedio > 6;
// ✅ DESPUÉS
return promedio >= 6;
```
La regla dice *"aprueba si su promedio es **6 o más**"*. Con `> 6`, un 6 justo daba `false`.
- Lo encontró un **caso límite** (promedio exactamente 6). Un caso habitual como 8 o 4 **nunca** lo habría detectado.
- Se vuelven a correr **todas** las pruebas para comprobar que la corrección no rompió otra cosa (**regresión**).
- El problema estaba en el **código**, no en el test: el test respetaba el requisito.

## Bug 2 · `src/services/carrito.ts` (ejercicio 4)

```ts
// ❌ ANTES
if (!Number.isInteger(item.cantidad) || item.cantidad < 0)
// ✅ DESPUÉS
if (!Number.isInteger(item.cantidad) || item.cantidad < 1)
```
La regla dice que la cantidad es *"un entero de **1 o más**"*. Con `< 0`, comprar **0 unidades** se aceptaba.

**¿Qué tienen en común?** Los dos son errores **en el borde** (`>` en vez de `>=`, `0` en vez de `1`). Esta clase de error se llama *off-by-one* y solo aparece con **casos límite**. Es el mismo detalle que tenía tu repo con `precio < 0` y el mensaje *"mayor a 0"*.

---

## Trampas (ejercicio 5)

| Trampa | ¿Por qué fallaba? | Arreglo |
|---|---|---|
| 1 | Sin `() =>`, `calcularPromedio([15])` se ejecuta **antes** de llegar al `expect`. El error explota afuera y `toThrow` nunca llega a verlo | `expect(() => calcularPromedio([15])).toThrow(RangeError)` |
| 2 | `toBe` compara con `Object.is`, o sea **por referencia**. Dos objetos distintos con el mismo contenido **no son el mismo objeto** | Usar `toEqual`, que compara la **estructura** |
| 3 | Faltaba `async`/`await`. `request(app).get(...)` devuelve una petición **pendiente** (una promesa), no la respuesta, así que `.status` era `undefined` | `it('...', async () => { const respuesta = await request(app).get('/healthy'); ... })` |

**Bonus:** `npm run typecheck` marca la trampa 3: *"Property 'status' does not exist on type 'Test'"*. TypeScript detecta que estás leyendo `.status` de algo que **todavía no es una respuesta**, y lo hace **sin ejecutar nada**. Pero no detecta las trampas 1 y 2, porque ahí los tipos están bien y el problema es de **comportamiento**. Por eso se usan **los dos**: *typecheck lee, test ejecuta*.

---

## Respuestas del ejercicio 6
1. Es **integración** porque participan **la ruta HTTP de Express** (`app.ts`), que recibe el JSON y arma la respuesta y el status, y **los servicios** (`calcularPromedio` y `estaAprobado`). Se prueba cómo **colaboran**.
2. No hizo falta `npm run dev`: **Supertest** envía las peticiones directamente a `app`, **sin abrir el puerto 3000**.
3. Ninguno de los tests propuestos lo detectaba, porque `[7,8,9]` da 8 y `[2,4]` da 3. Desde la API habría que mandar notas con promedio **exactamente 6**, por ejemplo `[6]` o `[5, 7]`, y esperar `aprobado: true`.

---

## Respuestas del ejercicio 8
1. **200** solo significa que la petición **se procesó**. No significa que el resultado cumpla la regla de negocio. Ejemplo: con un descuento del 150 % la respuesta era 200 con total −500.
2. `toThrow` necesita **ejecutar** la función él mismo para atrapar el error. Si le pasás `funcion()`, se ejecuta antes y el error se lanza fuera del `expect`.
3. `toBe` compara **referencias** (si es *el mismo* objeto). `res.body` y `{ total: 900 }` son dos objetos distintos con el mismo contenido. Para comparar contenido se usa `toEqual`.
4. (a) La **cobertura** solo dice qué código se **ejecutó**, no qué se **verificó bien**: puede faltar un caso límite, como en los bugs de esta práctica. (b) El **typecheck** solo revisa **tipos**, no **comportamiento**: `promedio > 6` tiene los tipos correctos y aun así está mal.
5. Un **mock** (o un **spy**) del repositorio, porque necesitás **verificar una interacción**: que `guardar` **no** fue llamado. En Vitest sería `expect(repo.guardar).not.toHaveBeenCalled()`. Un **stub** no alcanza, porque solo da respuestas predeterminadas y no permite verificar llamadas.
6. Los casos **habituales** confirman que lo normal funciona, pero los dos bugs estaban **en el borde** del rango. Solo los casos **límite** los hicieron aparecer.

---

## Código completo de las soluciones

### `src/services/condicion.ts` (ejercicio 7, TDD)
```ts
export type Condicion = 'promocionado' | 'regular' | 'libre';

export function obtenerCondicion(promedio: number): Condicion {
  if (!Number.isFinite(promedio) || promedio < 0 || promedio > 10) {
    throw new RangeError('El promedio debe estar entre 0 y 10');
  }
  if (promedio >= 8) return 'promocionado';
  if (promedio >= 6) return 'regular';
  return 'libre';
}
```

### `tests/notas.test.ts`
```ts
import { describe, expect, it } from 'vitest';
import { calcularPromedio, estaAprobado } from '../src/services/notas.ts';

describe('calcularPromedio', () => {
  it('promedia [7, 8] y devuelve 7.5', () => {
    expect(calcularPromedio([7, 8])).toBe(7.5);
  });

  it('promedia [0, 0, 0] y devuelve 0', () => {
    expect(calcularPromedio([0, 0, 0])).toBe(0);
  });

  it('promedia [10] (una sola nota) y devuelve 10', () => {
    expect(calcularPromedio([10])).toBe(10);
  });

  it('rechaza una nota mayor a 10, por ejemplo [8, 11]', () => {
    expect(() => calcularPromedio([8, 11])).toThrow(RangeError);
  });

  it('rechaza una nota negativa, por ejemplo [-1, 7]', () => {
    expect(() => calcularPromedio([-1, 7])).toThrow(RangeError);
  });

  it('rechaza NaN dentro de las notas', () => {
    expect(() => calcularPromedio([7, NaN])).toThrow(RangeError);
  });

  it('promedia [7, 8, 8] y devuelve aproximadamente 7.67', () => {
    expect(calcularPromedio([7, 8, 8])).toBeCloseTo(7.67, 2);
  });
});

describe('estaAprobado', () => {
  it('un promedio de 8 aprueba (true)', () => {
    expect(estaAprobado(8)).toBe(true);
  });

  it('un promedio de 4 no aprueba (false)', () => {
    expect(estaAprobado(4)).toBe(false);
  });

  it('un promedio de exactamente 6 aprueba (true)', () => {
    expect(estaAprobado(6)).toBe(true);
  });

  it('un promedio de 5.99 no aprueba (false)', () => {
    expect(estaAprobado(5.99)).toBe(false);
  });

  it('rechaza un promedio de 11', () => {
    expect(() => estaAprobado(11)).toThrow(RangeError);
  });

  it('rechaza un promedio negativo', () => {
    expect(() => estaAprobado(-1)).toThrow(RangeError);
  });
});
```

### `tests/carrito.test.ts`
```ts
import { describe, expect, it } from 'vitest';
import { calcularTotal, resumirCarrito, type Item } from '../src/services/carrito.ts';

const yerba: Item = { nombre: 'Yerba', precio: 3000, cantidad: 2 };
const azucar: Item = { nombre: 'Azúcar', precio: 1500, cantidad: 1 };

describe('calcularTotal', () => {
  it('calcula el total de yerba + azúcar (3000*2 + 1500*1 = 7500)', () => {
    expect(calcularTotal([yerba, azucar])).toBe(7500);
  });

  it('un carrito vacío tiene total 0', () => {
    expect(calcularTotal([])).toBe(0);
  });

  it('acepta un producto con precio 0 (regalo) y no suma nada', () => {
    const regalo: Item = { nombre: 'Llavero', precio: 0, cantidad: 1 };
    expect(calcularTotal([yerba, regalo])).toBe(6000);
  });

  it('rechaza un precio negativo', () => {
    expect(() => calcularTotal([{ nombre: 'X', precio: -10, cantidad: 1 }])).toThrow(RangeError);
  });

  it('rechaza una cantidad de 0 unidades', () => {
    expect(() => calcularTotal([{ nombre: 'X', precio: 100, cantidad: 0 }])).toThrow(RangeError);
  });

  it('rechaza una cantidad con decimales, por ejemplo 1.5', () => {
    expect(() => calcularTotal([{ nombre: 'X', precio: 100, cantidad: 1.5 }])).toThrow(RangeError);
  });
});

describe('resumirCarrito', () => {
  it('devuelve { cantidadItems: 3, total: 7500 } para yerba + azúcar', () => {
    expect(resumirCarrito([yerba, azucar])).toEqual({ cantidadItems: 3, total: 7500 });
  });

  it('devuelve { cantidadItems: 0, total: 0 } para un carrito vacío', () => {
    expect(resumirCarrito([])).toEqual({ cantidadItems: 0, total: 0 });
  });
});
```

### `tests/trampas.test.ts`
```ts
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
```

### `tests/api.test.ts`
```ts
import { describe, expect, it } from 'vitest';
import request from 'supertest';
import { app } from '../src/app.ts';

describe('API de notas', () => {
  it('GET /healthy responde 200 y { estado: "ok" }', async () => {
    const respuesta = await request(app).get('/healthy');
    expect(respuesta.status).toBe(200);
    expect(respuesta.body).toEqual({ estado: 'ok' });
  });

  it('POST /api/notas/evaluar con [7, 8, 9] responde 200 y { promedio: 8, aprobado: true }', async () => {
    const respuesta = await request(app)
      .post('/api/notas/evaluar')
      .send({ notas: [7, 8, 9] });
    expect(respuesta.status).toBe(200);
    expect(respuesta.body).toEqual({ promedio: 8, aprobado: true });
  });

  it('POST /api/notas/evaluar con [2, 4] responde 200 y aprobado: false', async () => {
    const respuesta = await request(app)
      .post('/api/notas/evaluar')
      .send({ notas: [2, 4] });
    expect(respuesta.status).toBe(200);
    expect(respuesta.body.aprobado).toBe(false);
  });

  it('POST /api/notas/evaluar con [8, 15] responde 400 y el body tiene la propiedad "error"', async () => {
    const respuesta = await request(app)
      .post('/api/notas/evaluar')
      .send({ notas: [8, 15] });
    expect(respuesta.status).toBe(400);
    expect(respuesta.body).toHaveProperty('error');
  });

  it('POST /api/notas/evaluar con un arreglo vacío responde 400', async () => {
    const respuesta = await request(app)
      .post('/api/notas/evaluar')
      .send({ notas: [] });
    expect(respuesta.status).toBe(400);
  });

  it('POST /api/notas/evaluar sin enviar "notas" responde 400', async () => {
    const respuesta = await request(app)
      .post('/api/notas/evaluar')
      .send({});
    expect(respuesta.status).toBe(400);
  });
});
```

### `tests/condicion.test.ts`
```ts
import { describe, expect, it } from 'vitest';
import { obtenerCondicion } from '../src/services/condicion.ts';

describe('obtenerCondicion (TDD)', () => {
  it('9 → promocionado', () => {
    expect(obtenerCondicion(9)).toBe('promocionado');
  });
  it('8 → promocionado (límite)', () => {
    expect(obtenerCondicion(8)).toBe('promocionado');
  });
  it('7.99 → regular (límite)', () => {
    expect(obtenerCondicion(7.99)).toBe('regular');
  });
  it('6 → regular (límite)', () => {
    expect(obtenerCondicion(6)).toBe('regular');
  });
  it('5.99 → libre (límite)', () => {
    expect(obtenerCondicion(5.99)).toBe('libre');
  });
  it('0 → libre (límite)', () => {
    expect(obtenerCondicion(0)).toBe('libre');
  });
  it('11 → RangeError', () => {
    expect(() => obtenerCondicion(11)).toThrow(RangeError);
  });
  it('NaN → RangeError', () => {
    expect(() => obtenerCondicion(NaN)).toThrow(RangeError);
  });
});
```
