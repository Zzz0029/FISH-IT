import React, { useState, useEffect, useMemo } from 'react';
import Header from './components/Header';
import FishCard from './components/FishCard';
import Cart from './components/Cart';
import AdminPanel from './components/AdminPanel';
import AdminLogin from './components/AdminLogin';
import { getFishData } from './data/fishData';
import { Fish, CartItem } from './types/fish';
import { redirectToWhatsApp, redirectToWhatsAppTrade } from './utils/whatsapp';
import { canAccessAdmin, authorizeDevice } from './utils/deviceAuth';

function App() {
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [fishData, setFishData] = useState<Fish[]>([]);
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('fishItCart');
    return saved ? JSON.parse(saved) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRarity, setFilterRarity] = useState<'all' | 'legendary' | 'mythic' | 'secret'>('all');

  useEffect(() => {
    // Check if admin is logged in
    const adminStatus = localStorage.getItem('fishItAdmin');
    if (adminStatus === 'true') {
      setIsAdminLoggedIn(true);
    }
    
    // Check URL hash for admin access (only if device is authorized)
    if (window.location.hash === '#pemancingasli') {
      if (canAccessAdmin()) {
        setIsAdminMode(true);
        authorizeDevice(); // Ensure device is authorized
      } else {
        // Device not authorized - clear hash and show message
        window.location.hash = '';
        alert('Akses admin hanya tersedia dari perangkat yang diotorisasi.');
      }
    }
    
    // Keyboard shortcut for admin (Ctrl+Shift+A or Ctrl+Alt+A)
    // Only works if device is authorized
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey && e.shiftKey && e.key === 'A') || (e.ctrlKey && e.altKey && e.key === 'a')) {
        e.preventDefault();
        if (canAccessAdmin()) {
          setIsAdminMode(true);
          authorizeDevice(); // Ensure device is authorized
        } else {
          alert('Akses admin hanya tersedia dari perangkat yang diotorisasi.');
        }
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    // Listen for hash changes
    const handleHashChange = () => {
      if (window.location.hash === '#pemancingasli') {
        if (canAccessAdmin()) {
          setIsAdminMode(true);
          authorizeDevice();
        } else {
          window.location.hash = '';
          alert('Akses admin hanya tersedia dari perangkat yang diotorisasi.');
        }
      }
    };
    
    window.addEventListener('hashchange', handleHashChange);
    
    loadFish();
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const loadFish = () => {
    setFishData(getFishData());
  };

  useEffect(() => {
    localStorage.setItem('fishItCart', JSON.stringify(cartItems));
  }, [cartItems]);

  const filteredFish = useMemo(() => {
    return fishData.filter((fish) => {
      const matchesSearch =
        fish.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        fish.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRarity = filterRarity === 'all' || fish.rarity === filterRarity;
      return matchesSearch && matchesRarity;
    });
  }, [searchTerm, filterRarity, fishData]);

  const handleAddToCart = (fish: Fish) => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === fish.id);
      if (existing) {
        return prev.map((item) =>
          item.id === fish.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...fish, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleBuyNow = (fish: Fish) => {
    redirectToWhatsApp([{ ...fish, quantity: 1 }]);
  };

  const handleTrade = (fish: Fish) => {
    redirectToWhatsAppTrade(fish);
  };

  const handleUpdateQuantity = (fishId: number, change: number) => {
    setCartItems((prev) => {
      const item = prev.find((i) => i.id === fishId);
      if (!item) return prev;
      if (item.quantity + change <= 0) {
        return prev.filter((i) => i.id !== fishId);
      }
      return prev.map((i) =>
        i.id === fishId ? { ...i, quantity: i.quantity + change } : i
      );
    });
  };

  const handleRemoveItem = (fishId: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== fishId));
  };

  const handleAdminLogin = () => {
    setIsAdminLoggedIn(true);
    setIsAdminMode(true);
  };

  const handleAdminLogout = () => {
    localStorage.removeItem('fishItAdmin');
    setIsAdminLoggedIn(false);
    setIsAdminMode(false);
  };

  // Admin Login Screen
  if (isAdminMode && !isAdminLoggedIn) {
    return <AdminLogin onLogin={handleAdminLogin} />;
  }

  // Admin Panel
  if (isAdminMode && isAdminLoggedIn) {
    return (
      <AdminPanel
        onLogout={handleAdminLogout}
        onDataChange={loadFish}
      />
    );
  }

  // Main App
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated Background Particles */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-blue-400 rounded-full opacity-30"
            style={{
              left: `${Math.random() * 100}%`,
              animation: `particle-float ${10 + Math.random() * 20}s linear infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
        {/* Grid Pattern */}
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      <Header
        cartItems={cartItems}
        onCartClick={() => setIsCartOpen(true)}
      />

      {/* Hero Section */}
      <section
        id="beranda"
        className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 text-white py-24 md:py-32"
      >
        {/* Animated Gradient Overlay */}
        <div className="absolute inset-0 gradient-animated bg-gradient-to-r from-blue-600/30 via-purple-600/30 to-pink-600/30 opacity-50"></div>
        
        {/* Floating Fish Icons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 text-9xl animate-float opacity-20">🐟</div>
          <div className="absolute top-40 right-20 text-7xl animate-float opacity-20" style={{ animationDelay: '1s' }}>🌊</div>
          <div className="absolute bottom-20 left-1/3 text-6xl animate-float opacity-20" style={{ animationDelay: '2s' }}>🐠</div>
          <div className="absolute top-60 right-1/4 text-8xl animate-float opacity-20" style={{ animationDelay: '1.5s' }}>🐡</div>
          <div className="absolute bottom-40 right-10 text-7xl animate-float opacity-20" style={{ animationDelay: '2.5s' }}>🦈</div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="mb-6 animate-pulse-glow inline-block">
            <div className="text-6xl mb-4 animate-bounce">🎣</div>
          </div>
          <h2 className="text-5xl md:text-7xl font-black mb-6 neon-text text-yellow-300 drop-shadow-2xl">
            FISH IT
            <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent gradient-animated">
              MARKETPLACE
            </span>
          </h2>
          <p className="text-xl md:text-2xl mb-10 opacity-90 max-w-2xl mx-auto font-medium text-blue-100">
            Platform terpercaya untuk jual beli ikan virtual premium dari game Fish It Roblox
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href="#katalog"
              className="group relative inline-block bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 text-white px-10 py-5 rounded-2xl font-bold text-lg hover:scale-110 transition-all shadow-2xl hover:shadow-cyan-500/50 glow-blue overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                🎣 Lihat Katalog
              </span>
              <div className="absolute inset-0 animate-shimmer"></div>
            </a>
            <a
              href="#tentang"
              className="inline-block bg-white/10 backdrop-blur-md text-white border-2 border-white/30 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-white/20 hover:border-white/50 transition-all glow-purple"
            >
              ℹ️ Tentang Kami
            </a>
          </div>
        </div>
      </section>

      {/* Catalog Section */}
      <section id="katalog" className="py-16 relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-6xl font-black mb-4 neon-text text-cyan-300">
              🐠 KATALOG IKAN PREMIUM
            </h2>
            <p className="text-blue-200 text-lg font-medium">
              Pilih ikan premium dari koleksi terbaik kami
            </p>
            <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 mx-auto mt-4 rounded-full"></div>
          </div>

          {/* Search and Filter */}
          <div className="bg-slate-800/50 backdrop-blur-md rounded-2xl shadow-2xl p-6 mb-8 border border-blue-500/30 animate-border-glow">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <input
                  type="text"
                  placeholder="🔍 Cari ikan..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-4 bg-slate-700/50 border-2 border-blue-500/50 rounded-xl focus:outline-none focus:border-cyan-400 focus:ring-4 focus:ring-cyan-400/30 text-white placeholder-blue-200 font-medium transition-all"
                />
              </div>
              <select
                value={filterRarity}
                onChange={(e) =>
                  setFilterRarity(e.target.value as 'all' | 'legendary' | 'mythic' | 'secret')
                }
                className="px-4 py-4 bg-slate-700/50 border-2 border-blue-500/50 rounded-xl focus:outline-none focus:border-cyan-400 text-white font-bold transition-all"
              >
                <option value="all" className="bg-slate-800">⭐ Semua Kelangkaan</option>
                <option value="legendary" className="bg-slate-800">🌟 Legendary</option>
                <option value="mythic" className="bg-slate-800">💫 Mythic</option>
                <option value="secret" className="bg-slate-800">🔮 Secret</option>
              </select>
            </div>
          </div>

          {/* Fish Grid */}
          {filteredFish.length === 0 ? (
            <div className="bg-slate-800/50 backdrop-blur-md rounded-2xl shadow-2xl p-12 text-center border border-blue-500/30">
              <div className="text-8xl mb-6 animate-float">🐟</div>
              <h3 className="text-2xl font-bold text-cyan-300 mb-4 neon-text">
                Katalog Kosong
              </h3>
              <p className="text-blue-200 mb-6">
                Belum ada ikan di katalog.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredFish.map((fish) => (
                <FishCard
                  key={fish.id}
                  fish={fish}
                  onBuyNow={handleBuyNow}
                  onAddToCart={handleAddToCart}
                  onTrade={handleTrade}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* About Section */}
      <section id="tentang" className="py-16 relative z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-black text-center mb-12 neon-text text-cyan-300">
              🌊 TENTANG FISH IT
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-slate-800/50 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-cyan-500/30 hover:border-cyan-400 transition-all hover:glow-blue">
                <div className="text-6xl mb-4 animate-bounce">🎮</div>
                <h3 className="text-2xl font-bold text-cyan-300 mb-4">Game Populer</h3>
                <p className="text-blue-100 leading-relaxed">
                  Fish It adalah game memancing populer di Roblox yang menawarkan berbagai variasi ikan 
                  yang dapat dikoleksi. Game ini memungkinkan pemain menangkap berbagai jenis ikan dari 
                  berbagai lokasi dan menjualnya untuk mendapatkan keuntungan.
                </p>
              </div>
              <div className="bg-slate-800/50 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-purple-500/30 hover:border-purple-400 transition-all hover:glow-purple">
                <div className="text-6xl mb-4 animate-bounce" style={{ animationDelay: '0.5s' }}>💎</div>
                <h3 className="text-2xl font-bold text-purple-300 mb-4">Marketplace Premium</h3>
                <p className="text-blue-100 leading-relaxed">
                  Marketplace ini menyediakan platform yang aman dan terpercaya untuk para pemain Fish
                  It di Indonesia untuk melakukan transaksi jual beli ikan virtual premium (Legendary,
                  Mythic, dan Secret) dengan harga yang kompetitif.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 text-white py-12 border-t border-blue-500/30 relative z-10">
        <div className="container mx-auto px-4 text-center">
          <div className="text-5xl mb-4 animate-float">🐟</div>
          <p className="text-xl font-bold mb-2 text-cyan-300">Fish It Marketplace</p>
          <p className="text-blue-200">&copy; 2024 Fish It Marketplace. All rights reserved.</p>
        </div>
      </footer>

      {/* Cart Modal */}
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
      />
    </div>
  );
}

export default App;
