import { useState, useEffect } from 'react';
import { Producto } from '../types';

export function useProductos(apiUrl: string) {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProductos = async () => {
      try {
        const response = await fetch(`${apiUrl}/productos`);
        if (!response.ok) throw new Error('Error fetching productos');
        const data = await response.json();
        setProductos(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido');
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, [apiUrl]);

  return { productos, loading, error };
}
