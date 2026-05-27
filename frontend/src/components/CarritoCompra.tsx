import React from 'react';
import { X, Trash2, ShoppingCart, ShoppingBag } from 'lucide-react';
import { ItemCarrito } from '../types';

interface CarritoCompraProps {
  isOpen: boolean;
  onClose: () => void;
  items: ItemCarrito[];
  onRemove: (id: string) => void;
  onCheckout: () => void;
  total: number;
}

export const CarritoCompra: React.FC<CarritoCompraProps> = ({ 
  isOpen, 
  onClose, 
  items, 
  onRemove, 
  onCheckout,
  total 
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />
      
      <div className="absolute inset-y-0 right-0 max-w-md w-full bg-white shadow-2xl flex flex-col">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
            <ShoppingCart size={24} className="text-lumen-gold" />
            Bolsa de Compras
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center">
                <ShoppingBag size={32} className="text-gray-300" />
              </div>
              <div>
                <p className="text-gray-500 font-medium">Tu bolsa está vacía</p>
                <p className="text-sm text-gray-400 mt-1">¡Descubre nuestras fragancias exclusivas!</p>
              </div>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.producto.id} className="flex gap-4">
                <div className="w-20 h-20 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0">
                  <img src={item.producto.imagen} alt={item.producto.nombre} className="w-full h-full object-contain p-2" />
                </div>
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h4 className="font-bold text-gray-900">{item.producto.nombre}</h4>
                    <button 
                      onClick={() => onRemove(item.producto.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider">{item.producto.marca}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-sm font-medium">Cant: {item.cantidad}</span>
                    <span className="font-bold text-lumen-gold">
                      ${(item.producto.precio * item.cantidad).toLocaleString('es-CL')}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="p-6 border-t border-gray-100 bg-gray-50 space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-500">Subtotal estimación</span>
              <span className="text-2xl font-bold text-lumen-black">${total.toLocaleString('es-CL')}</span>
            </div>
            <button 
              onClick={onCheckout}
              className="w-full bg-lumen-black text-white py-4 rounded-lg font-bold hover:bg-lumen-gold transition-colors duration-300 shadow-lg shadow-black/10"
            >
              FINALIZAR COMPRA
            </button>
            <p className="text-[10px] text-center text-gray-400 uppercase tracking-[0.1em]">
              Envío gratuito en todas las compras sobre $50.000
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

