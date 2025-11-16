import React from 'react';
import { CartItem } from '../types/fish';

interface HeaderProps {
  cartItems: CartItem[];
  onCartClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ cartItems, onCartClick }) => {
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-slate-900/80 backdrop-blur-md text-white shadow-2xl sticky top-0 z-50 border-b border-cyan-500/30">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <span className="text-4xl animate-bounce glow-blue">🐟</span>
            <div>
              <h1 className="text-2xl font-black bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Fish It Marketplace</h1>
              <p className="text-xs text-cyan-300 font-medium">Premium Fish Trading Platform</p>
            </div>
          </div>
          <nav className="flex items-center gap-4">
            <a href="#beranda" className="hover:text-cyan-400 transition-colors font-bold px-4 py-2 rounded-lg hover:bg-cyan-500/10 border border-transparent hover:border-cyan-500/30">
              Beranda
            </a>
            <a href="#katalog" className="hover:text-cyan-400 transition-colors font-bold px-4 py-2 rounded-lg hover:bg-cyan-500/10 border border-transparent hover:border-cyan-500/30">
              Katalog
            </a>
            <button
              onClick={onCartClick}
              className="relative bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-5 py-2 rounded-full font-bold hover:scale-110 transition-all flex items-center gap-2 shadow-lg hover:shadow-cyan-500/50 glow-blue"
            >
              <span className="text-xl">🛒</span>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-7 h-7 flex items-center justify-center text-xs font-black animate-pulse border-2 border-white shadow-lg">
                  {totalItems}
                </span>
              )}
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;

