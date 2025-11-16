import React from 'react';
import { Fish } from '../types/fish';
import { formatCurrency } from '../utils/formatter';

interface FishCardProps {
  fish: Fish;
  onBuyNow: (fish: Fish) => void;
  onAddToCart: (fish: Fish) => void;
  onTrade: (fish: Fish) => void;
}

const FishCard: React.FC<FishCardProps> = ({ fish, onBuyNow, onAddToCart, onTrade }) => {
  const rarityConfig = {
    legendary: {
      bg: 'bg-gradient-to-r from-yellow-400 to-orange-500',
      border: 'border-yellow-400',
      glow: 'shadow-yellow-400/50',
      icon: '🌟',
    },
    mythic: {
      bg: 'bg-gradient-to-r from-red-500 to-pink-600',
      border: 'border-red-500',
      glow: 'shadow-red-500/50',
      icon: '💫',
    },
    secret: {
      bg: 'bg-gradient-to-r from-purple-600 to-indigo-600',
      border: 'border-purple-600',
      glow: 'shadow-purple-600/50',
      icon: '🔮',
    },
  };

  const config = rarityConfig[fish.rarity];

  const borderClass = fish.rarity === 'legendary' ? 'border-yellow-400/50 hover:border-yellow-400' 
    : fish.rarity === 'mythic' ? 'border-red-500/50 hover:border-red-500' 
    : 'border-purple-600/50 hover:border-purple-600';

  return (
    <div className={`group relative bg-slate-800/80 backdrop-blur-md rounded-2xl overflow-hidden transition-all duration-300 transform hover:-translate-y-2 border-2 ${borderClass} animate-border-glow`}>
      {/* Glow Effect */}
      <div className={`absolute -inset-1 ${config.bg} opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300`}></div>
      
      <div className="relative overflow-hidden">
        <img
          src={fish.image}
          alt={fish.name}
          className="w-full h-56 object-cover group-hover:scale-110 transition-transform duration-500"
          onError={(e) => {
            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/400x300/cccccc/666666?text=No+Image';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
        <div className={`absolute top-4 right-4 ${config.bg} text-white px-4 py-2 rounded-full text-xs font-black shadow-2xl flex items-center gap-1 border-2 border-white/20 backdrop-blur-sm`}>
          <span className="text-lg">{config.icon}</span>
          <span>{fish.rarity.toUpperCase()}</span>
        </div>
        {/* Shine Effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
      </div>
      <div className="p-6 relative z-10">
        <h3 className="text-2xl font-black text-cyan-300 mb-3 group-hover:text-yellow-300 transition-colors neon-text">
          {fish.name}
        </h3>
        <p className="text-blue-100 text-sm mb-4 line-clamp-2 min-h-[40px]">
          {fish.description}
        </p>
        <div className="mb-6 bg-slate-900/50 rounded-xl p-3 border border-blue-500/30">
          <div className="text-3xl font-black bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            {formatCurrency(fish.price)}
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex gap-3">
            <button
              onClick={() => onBuyNow(fish)}
              className="flex-1 relative bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 hover:from-green-400 hover:via-emerald-400 hover:to-teal-400 text-white py-3 px-4 rounded-xl font-black transition-all transform hover:scale-110 shadow-lg hover:shadow-green-500/50 glow-blue overflow-hidden group"
            >
              <span className="relative z-10">💬 Beli</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </button>
            <button
              onClick={() => onTrade(fish)}
              className="flex-1 relative bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 hover:from-orange-400 hover:via-amber-400 hover:to-yellow-400 text-white py-3 px-4 rounded-xl font-black transition-all transform hover:scale-110 shadow-lg hover:shadow-orange-500/50 glow-red overflow-hidden group"
            >
              <span className="relative z-10">🔄 Trade</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </button>
          </div>
          <button
            onClick={() => onAddToCart(fish)}
            className="w-full relative bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 hover:from-blue-400 hover:via-indigo-400 hover:to-purple-400 text-white py-3 px-4 rounded-xl font-black transition-all transform hover:scale-105 shadow-lg hover:shadow-purple-500/50 glow-purple overflow-hidden group"
          >
            <span className="relative z-10">🛒 + Keranjang</span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FishCard;

