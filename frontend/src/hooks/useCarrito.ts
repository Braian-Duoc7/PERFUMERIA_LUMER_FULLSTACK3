import { useState, useCallback } from 'react';
import { ItemCarrito, Producto, Orden } from '../types';

export function useCarrito() {
  const [items, setItems] = useState<ItemCarrito[]>([]);

  const agregarProducto = useCallback((producto: Producto, cantidad: number = 1) => {
    setItems(prev => {
      const existe = prev.find(item => item.producto.id === producto.id);
      if (existe) {
        return prev.map(item =>
          item.producto.id === producto.id
            ? { ...item, cantidad: item.cantidad + cantidad }
            : item
        );
      }
      return [...prev, { producto, cantidad }];
    });
  }, []);

  const removerProducto = useCallback((productoId: string) => {
    setItems(prev => prev.filter(item => item.producto.id !== productoId));
  }, []);

  const vaciarCarrito = useCallback(() => {
    setItems([]);
  }, []);

  const calcularTotal = useCallback(() => {
    return items.reduce((total, item) => total + (item.producto.precio * item.cantidad), 0);
  }, [items]);

  const procesarCompra = useCallback(async (apiUrl: string): Promise<Orden | null> => {
    try {
      const response = await fetch(`${apiUrl}/ordenes`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items, total: calcularTotal() })
      });
      if (!response.ok) throw new Error('Error procesando compra');
      const orden = await response.json();
      vaciarCarrito();
      return orden;
    } catch (error) {
      console.error(error);
      return null;
    }
  }, [items, calcularTotal, vaciarCarrito]);

  return {
    items,
    agregarProducto,
    removerProducto,
    vaciarCarrito,
    calcularTotal,
    procesarCompra
  };
}
