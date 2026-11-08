/**
 * Servicio de carrito de compras.
 *
 * REGLAS DE NEGOCIO:
 * - El precio de un producto debe ser un número finito mayor o igual a 0.
 * - La cantidad debe ser un número ENTERO de 1 o más (no se puede comprar 0 unidades).
 * - Si un item es inválido se lanza RangeError.
 * - Un carrito vacío tiene total 0.
 */

export type Item = {
  nombre: string;
  precio: number;
  cantidad: number;
};

export type Resumen = {
  cantidadItems: number;
  total: number;
};

function validarItem(item: Item): void {
  if (!Number.isFinite(item.precio) || item.precio < 0) {
    throw new RangeError(`Precio inválido en "${item.nombre}"`);
  }

  if (!Number.isInteger(item.cantidad) || item.cantidad < 0) {
    throw new RangeError(`Cantidad inválida en "${item.nombre}"`);
  }
}

export function calcularTotal(items: Item[]): number {
  let total = 0;
  for (const item of items) {
    validarItem(item);
    total += item.precio * item.cantidad;
  }
  return total;
}

export function resumirCarrito(items: Item[]): Resumen {
  const total = calcularTotal(items);
  const cantidadItems = items.reduce((acumulado, item) => acumulado + item.cantidad, 0);
  return { cantidadItems, total };
}
