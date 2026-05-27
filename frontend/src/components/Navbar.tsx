import React from 'react';
import { ShoppingBag, Search } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onCartClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ cartCount, onCartClick }) => {
  return (
    <nav className="bg-white border-b border-gray-100 sticky top-0 z-40">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <div className="flex flex-col leading-tight">
            <span className="text-2xl font-black tracking-[0.2em] text-lumen-black">LUMEN</span>
            <span className="text-[10px] tracking-[0.5em] text-gray-400 font-light text-center">PARFUMS</span>
          </div>
          
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600 uppercase tracking-widest">
            <a href="#" className="hover:text-lumen-gold transition-colors">Colecciones</a>
            <a href="#" className="hover:text-lumen-gold transition-colors">Novedades</a>
            <a href="#" className="hover:text-lumen-gold transition-colors">Marcas</a>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 text-gray-600 hover:text-lumen-gold transition-colors">
            <Search size={20} />
          </button>
          
          <button 
            onClick={onCartClick}
            className="relative p-2 text-gray-600 hover:text-lumen-gold transition-colors"
          >
            <ShoppingBag size={20} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-lumen-gold text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};
