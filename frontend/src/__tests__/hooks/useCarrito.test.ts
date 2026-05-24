import { describe, it, expect, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useCarrito } from '../../hooks/useCarrito';
import { Producto } from '../../types';

describe('useCarrito', () => {
  const mockProducto: Producto = {
    id: '1',
    nombre: 'Perfume Premium',
    precio: 89.99,
    descripcion: 'Aroma único',
    marca: 'Marca Premium',
    imagen: 'img.jpg'
  };

  it('debe inicializar carrito vacío', () => {
    const { result } = renderHook(() => useCarrito());
    expect(result.current.items).toEqual([]);
    expect(result.current.calcularTotal()).toBe(0);
  });

  it('debe agregar producto al carrito', () => {
    const { result } = renderHook(() => useCarrito());

    act(() => {
      result.current.agregarProducto(mockProducto, 2);
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].producto).toEqual(mockProducto);
    expect(result.current.items[0].cantidad).toBe(2);
  });

  it('debe incrementar cantidad si producto ya existe', () => {
    const { result } = renderHook(() => useCarrito());

    act(() => {
      result.current.agregarProducto(mockProducto, 1);
      result.current.agregarProducto(mockProducto, 2);
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].cantidad).toBe(3);
  });

  it('debe calcular total correctamente', () => {
    const { result } = renderHook(() => useCarrito());

    act(() => {
      result.current.agregarProducto(mockProducto, 2);
    });

    const total = result.current.calcularTotal();
    expect(total).toBe(mockProducto.precio * 2);
  });

  it('debe remover producto del carrito', () => {
    const { result } = renderHook(() => useCarrito());

    act(() => {
      result.current.agregarProducto(mockProducto, 1);
      result.current.removerProducto(mockProducto.id);
    });

    expect(result.current.items).toHaveLength(0);
  });

  it('debe vaciar carrito', () => {
    const { result } = renderHook(() => useCarrito());

    act(() => {
      result.current.agregarProducto(mockProducto, 2);
      result.current.vaciarCarrito();
    });

    expect(result.current.items).toHaveLength(0);
    expect(result.current.calcularTotal()).toBe(0);
  });

  it('debe procesar compra y vaciar carrito', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ id: '1', items: [], total: 0, estado: 'CONFIRMADA' })
      } as Response)
    );

    const { result } = renderHook(() => useCarrito());

    act(() => {
      result.current.agregarProducto(mockProducto, 1);
    });

    let orden = null;
    await act(async () => {
      orden = await result.current.procesarCompra('http://localhost:3001/api');
    });

    expect(orden).toBeTruthy();
    expect(result.current.items).toHaveLength(0);
  });
});
