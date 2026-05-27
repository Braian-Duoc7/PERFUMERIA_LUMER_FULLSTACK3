import React from 'react';
import { Producto } from '../types';
import { ShoppingCart } from 'lucide-react';

interface ProductoCardProps {
  producto: Producto;
  onAgregar: (producto: Producto) => void;
}

export const ProductoCard: React.FC<ProductoCardProps> = ({ producto, onAgregar }) => {
  return (
    <div className="bg-white border border-gray-100 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        <img 
          src={producto.imagen} 
          alt={producto.nombre}
          className="w-full h-full object-contain p-4 hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-2 right-2">
          <span className="bg-white/80 backdrop-blur-sm px-2 py-1 text-xs font-semibold text-lumen-gold uppercase tracking-wider rounded">
            {producto.marca}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-900 truncate">{producto.nombre}</h3>
        <p className="text-sm text-gray-500 mt-1 h-10 line-clamp-2">{producto.descripcion}</p>
        
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-bold text-lumen-gold">
            ${producto.precio.toLocaleString('es-CL')}
          </span>
          <button 
            onClick={() => onAgregar(producto)}
            className="flex items-center gap-2 bg-lumen-black text-white px-4 py-2 rounded-full hover:bg-lumen-gold transition-colors duration-300 text-sm font-medium"
          >
            <ShoppingCart size={16} />
            Añadir
          </button>
        </div>
      </div>
    </div>
  );
};
