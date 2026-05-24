import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useProductos } from '../../hooks/useProductos';

describe('useProductos', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('debe cargar productos exitosamente', async () => {
    const mockProductos = [
      { id: '1', nombre: 'Perfume A', precio: 50, descripcion: 'Desc A', marca: 'Marca A', imagen: 'img.jpg' },
      { id: '2', nombre: 'Perfume B', precio: 75, descripcion: 'Desc B', marca: 'Marca B', imagen: 'img2.jpg' }
    ];

    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockProductos)
      } as Response)
    );

    const { result } = renderHook(() => useProductos('http://localhost:3001/api'));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.productos).toEqual(mockProductos);
    expect(result.current.error).toBeNull();
  });

  it('debe manejar errores de carga', async () => {
    global.fetch = vi.fn(() =>
      Promise.reject(new Error('Network error'))
    );

    const { result } = renderHook(() => useProductos('http://localhost:3001/api'));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toBeTruthy();
    expect(result.current.productos).toEqual([]);
  });

  it('debe usar el apiUrl proporcionado', async () => {
    const apiUrl = 'http://custom-api.com';
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve([])
      } as Response)
    );

    renderHook(() => useProductos(apiUrl));

    expect(global.fetch).toHaveBeenCalledWith(`${apiUrl}/productos`);
  });
});
