import React from 'react';
import { CartItem } from '../types/fish';
import { formatCurrency } from '../utils/formatter';
import { redirectToWhatsApp } from '../utils/whatsapp';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (fishId: number, change: number) => void;
  onRemoveItem: (fishId: number) => void;
}

const Cart: React.FC<CartProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
}) => {
  if (!isOpen) return null;

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    redirectToWhatsApp(cartItems);
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-md z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-slate-800/95 backdrop-blur-xl rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-cyan-500/30 glow-blue"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 text-white p-6 flex justify-between items-center rounded-t-2xl border-b border-white/20">
          <div>
            <h2 className="text-2xl font-black neon-text">🛒 Keranjang Belanja</h2>
            <p className="text-sm opacity-90 font-bold">{cartItems.length} item</p>
          </div>
          <button
            onClick={onClose}
            className="text-3xl text-white hover:opacity-80 transition-opacity w-10 h-10 flex items-center justify-center bg-white/20 rounded-full hover:bg-white/30 glow-blue"
          >
            ×
          </button>
        </div>
        <div className="p-6">
          {cartItems.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-7xl mb-4 animate-float">🛒</div>
              <p className="text-cyan-300 text-xl mb-6 font-black neon-text">Keranjang Anda kosong</p>
              <button
                onClick={onClose}
                className="bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 text-white px-8 py-3 rounded-xl font-black hover:shadow-lg transform hover:scale-110 transition-all glow-blue"
              >
                🐟 Lihat Katalog
              </button>
            </div>
          ) : (
            <>
              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 p-5 bg-slate-700/50 backdrop-blur-sm rounded-xl border-2 border-blue-500/30 hover:border-cyan-400 transition-all items-center hover:glow-blue"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-24 h-24 object-cover rounded-xl shadow-lg"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://via.placeholder.com/96x96/cccccc/666666?text=No+Image';
                      }}
                    />
                    <div className="flex-1">
                      <h3 className="font-black text-cyan-300 text-lg mb-1 neon-text">{item.name}</h3>
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-black mb-2 ${
                          item.rarity === 'legendary'
                            ? 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white'
                            : item.rarity === 'mythic'
                            ? 'bg-gradient-to-r from-red-500 to-pink-600 text-white'
                            : 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white'
                        }`}
                      >
                        {item.rarity.toUpperCase()}
                      </span>
                      <p className="text-cyan-400 font-black text-lg mb-2">
                        {formatCurrency(item.price)}
                      </p>
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="w-9 h-9 bg-slate-600 border-2 border-cyan-500/50 hover:border-cyan-400 hover:bg-cyan-500/20 rounded-lg font-black transition-all shadow-lg text-cyan-300"
                        >
                          −
                        </button>
                        <span className="font-black w-8 text-center text-lg text-white">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="w-9 h-9 bg-slate-600 border-2 border-cyan-500/50 hover:border-cyan-400 hover:bg-cyan-500/20 rounded-lg font-black transition-all shadow-lg text-cyan-300"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-black text-cyan-300 mb-2 text-lg neon-text">
                        {formatCurrency(item.price * item.quantity)}
                      </p>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 rounded-lg text-sm font-black transition-all transform hover:scale-110 shadow-lg glow-red"
                      >
                        🗑️ Hapus
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-slate-700/50 backdrop-blur-sm border-2 border-green-500/50 rounded-xl p-6 glow-green">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-xl font-black text-cyan-300 neon-text">💰 Total Pembayaran:</span>
                  <span className="text-3xl font-black bg-gradient-to-r from-cyan-400 via-green-400 to-emerald-400 bg-clip-text text-transparent">
                    {formatCurrency(total)}
                  </span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full relative bg-gradient-to-r from-green-500 via-emerald-500 to-teal-500 hover:from-green-400 hover:via-emerald-400 hover:to-teal-400 text-white py-4 rounded-xl font-black text-lg transition-all transform hover:scale-110 shadow-xl hover:shadow-green-500/50 glow-blue overflow-hidden group"
                >
                  <span className="relative z-10 flex items-center justify-center gap-3">
                    <span className="text-2xl">💬</span>
                    <span>Lanjutkan ke WhatsApp</span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;

