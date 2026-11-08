/**
 * Servicio de notas de un instituto.
 *
 * REGLAS DE NEGOCIO (esto es lo que el sistema DEBE cumplir):
 * - Cada nota es un número entre 0 y 10, inclusive.
 * - Para calcular un promedio tiene que haber al menos una nota.
 * - Si alguna nota es inválida, o no hay notas, se lanza RangeError.
 * - Un alumno APRUEBA si su promedio es 6 o más.
 * - El promedio recibido por estaAprobado también debe estar entre 0 y 10.
 */

export function calcularPromedio(notas: number[]): number {
  if (notas.length === 0) {
    throw new RangeError('Debe haber al menos una nota');
  }

  for (const nota of notas) {
    if (!Number.isFinite(nota) || nota < 0 || nota > 10) {
      throw new RangeError('Cada nota debe estar entre 0 y 10');
    }
  }

  const suma = notas.reduce((acumulado, nota) => acumulado + nota, 0);
  return suma / notas.length;
}

export function estaAprobado(promedio: number): boolean {
  if (!Number.isFinite(promedio) || promedio < 0 || promedio > 10) {
    throw new RangeError('El promedio debe estar entre 0 y 10');
  }

  return promedio >= 6;
}
