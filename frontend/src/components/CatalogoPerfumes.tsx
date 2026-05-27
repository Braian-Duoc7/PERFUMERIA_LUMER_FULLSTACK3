import React from 'react';
import { useProductos } from '../hooks/useProductos';
import { ProductoCard } from './ProductoCard';
import { Producto } from '../types';

interface CatalogoPerfumesProps {
  apiUrl: string;
  onAgregarAlCarrito: (producto: Producto) => void;
}

export const CatalogoPerfumes: React.FC<CatalogoPerfumesProps> = ({ apiUrl, onAgregarAlCarrito }) => {
  const { productos, loading, error } = useProductos(apiUrl);

  if (loading) return (
    <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
      <div className="w-12 h-12 border-4 border-lumen-gold/20 border-t-lumen-gold rounded-full animate-spin"></div>
      <p className="text-gray-400 font-medium animate-pulse uppercase tracking-widest text-xs">Cargando colección...</p>
    </div>
  );

  if (error) return (
    <div className="bg-red-50 text-red-500 p-8 rounded-xl text-center border border-red-100 max-w-md mx-auto my-12">
      <p className="font-bold">Error al cargar productos</p>
      <p className="text-sm mt-1 opacity-80">{error}</p>
    </div>
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {productos.map((producto) => (
        <ProductoCard 
          key={producto.id} 
          producto={producto} 
          onAgregar={onAgregarAlCarrito} 
        />
      ))}
    </div>
  );
};
