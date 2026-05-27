import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { CatalogoPerfumes } from './components/CatalogoPerfumes';
import { CarritoCompra } from './components/CarritoCompra';
import { useCarrito } from './hooks/useCarrito';

const API_URL = 'http://localhost:3001/api';

const App: React.FC = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { items, agregarProducto, removerProducto, calcularTotal, procesarCompra } = useCarrito();

  const handleCheckout = async () => {
    const orden = await procesarCompra(API_URL);
    if (orden) {
      alert(`¡Compra realizada con éxito! Orden ID: ${orden.id || 'N/A'}`);
      setIsCartOpen(false);
    } else {
      alert('Hubo un problema al procesar tu compra. Por favor, intenta nuevamente.');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar 
        cartCount={items.reduce((acc, item) => acc + item.cantidad, 0)} 
        onCartClick={() => setIsCartOpen(true)} 
      />

      <main className="container mx-auto px-4 py-12">
        <header className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-black text-lumen-black mb-4 uppercase tracking-tighter">
            Fragancias de Autor
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto font-light leading-relaxed">
            Explora nuestra curaduría exclusiva de las casas de perfumes más prestigiosas del mundo. 
            Esencias que cuentan historias, capturan momentos y definen identidades.
          </p>
          <div className="w-24 h-1 bg-lumen-gold mx-auto mt-8"></div>
        </header>

        <CatalogoPerfumes 
          apiUrl={API_URL} 
          onAgregarAlCarrito={(p) => agregarProducto(p, 1)} 
        />
      </main>

      <footer className="bg-lumen-black text-white py-12 mt-20">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <div className="flex flex-col leading-tight mb-6">
              <span className="text-2xl font-black tracking-[0.2em]">LUMEN</span>
              <span className="text-[10px] tracking-[0.5em] text-gray-400 font-light">PARFUMS</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Dedicados al arte de la alta perfumería desde 1995. 
              Seleccionamos cada fragancia por su calidad, originalidad y carácter.
            </p>
          </div>
          
          <div>
            <h4 className="text-lumen-gold font-bold mb-6 uppercase tracking-widest text-sm">Servicio al Cliente</h4>
            <ul className="space-y-4 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Envíos y Devoluciones</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Preguntas Frecuentes</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contacto</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lumen-gold font-bold mb-6 uppercase tracking-widest text-sm">Newsletter</h4>
            <p className="text-gray-400 text-sm mb-4">Suscríbete para recibir lanzamientos exclusivos y eventos privados.</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Tu email" 
                className="bg-white/10 border border-white/20 px-4 py-2 rounded-l-md focus:outline-none focus:border-lumen-gold flex-1 text-sm"
              />
              <button className="bg-lumen-gold text-white px-6 py-2 rounded-r-md text-sm font-bold hover:bg-white hover:text-lumen-black transition-all">
                UNIRSE
              </button>
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-12 pt-12 border-t border-white/10 text-center text-xs text-gray-500 uppercase tracking-widest">
          &copy; 2026 LUMEN PARFUMS. Todos los derechos reservados.
        </div>
      </footer>

      <CarritoCompra 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={items}
        onRemove={removerProducto}
        onCheckout={handleCheckout}
        total={calcularTotal()}
      />
    </div>
  );
};

export default App;
