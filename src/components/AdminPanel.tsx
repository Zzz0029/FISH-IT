import React, { useState, useEffect } from 'react';
import { Fish } from '../types/fish';
import { getFishData, saveFishData } from '../data/fishData';
import { formatCurrency } from '../utils/formatter';

interface AdminPanelProps {
  onLogout: () => void;
  onDataChange?: () => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onLogout, onDataChange }) => {
  const [fishList, setFishList] = useState<Fish[]>([]);
  const [editingFish, setEditingFish] = useState<Fish | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [formData, setFormData] = useState<Partial<Fish>>({
    name: '',
    rarity: 'legendary',
    price: 0,
    image: '',
    description: '',
  });

  useEffect(() => {
    loadFish();
  }, []);

  const loadFish = () => {
    setFishList(getFishData());
  };

  const handleSave = () => {
    if (!formData.name || !formData.price || !formData.image) {
      alert('Mohon isi semua field yang wajib!');
      return;
    }

    let updatedFish: Fish[];
    
    if (editingFish) {
      // Update existing fish
      updatedFish = fishList.map((f) =>
        f.id === editingFish.id
          ? {
              ...formData,
              id: editingFish.id,
            } as Fish
          : f
      );
    } else {
      // Add new fish
      const newId = fishList.length > 0 ? Math.max(...fishList.map((f) => f.id)) + 1 : 1;
      updatedFish = [
        ...fishList,
        {
          ...formData,
          id: newId,
        } as Fish,
      ];
    }

    saveFishData(updatedFish);
    setFishList(updatedFish);
    resetForm();
    if (onDataChange) onDataChange();
    alert(editingFish ? 'Ikan berhasil diupdate!' : 'Ikan berhasil ditambahkan!');
  };

  const handleEdit = (fish: Fish) => {
    setEditingFish(fish);
    setFormData({
      name: fish.name,
      rarity: fish.rarity,
      price: fish.price,
      image: fish.image,
      description: fish.description,
    });
    setIsAddModalOpen(true);
  };

  const handleDelete = (id: number) => {
    if (confirm('Yakin ingin menghapus ikan ini?')) {
      const updatedFish = fishList.filter((f) => f.id !== id);
      saveFishData(updatedFish);
      setFishList(updatedFish);
      if (onDataChange) onDataChange();
      alert('Ikan berhasil dihapus!');
    }
  };

  const resetForm = () => {
    setEditingFish(null);
    setIsAddModalOpen(false);
    setFormData({
      name: '',
      rarity: 'legendary',
      price: 0,
      image: '',
      description: '',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                🎣 Admin Panel
              </h1>
              <p className="text-gray-600 mt-1">Kelola Katalog Ikan Fish It</p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all flex items-center gap-2"
              >
                <span>+</span> Tambah Ikan
              </button>
              <button
                onClick={onLogout}
                className="bg-gray-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-700 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>

        {/* Fish List */}
        <div className="bg-white rounded-2xl shadow-xl p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Daftar Ikan ({fishList.length})
          </h2>

          {fishList.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🐟</div>
              <p className="text-gray-500 text-lg mb-4">Belum ada ikan di katalog</p>
              <button
                onClick={() => setIsAddModalOpen(true)}
                className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
              >
                Tambah Ikan Pertama
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-4 px-4 font-semibold text-gray-700">ID</th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-700">Gambar</th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-700">Nama</th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-700">Kelangkaan</th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-700">Harga</th>
                    <th className="text-left py-4 px-4 font-semibold text-gray-700">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {fishList.map((fish) => (
                    <tr
                      key={fish.id}
                      className="border-b border-gray-100 hover:bg-blue-50 transition-colors"
                    >
                      <td className="py-4 px-4 font-semibold">{fish.id}</td>
                      <td className="py-4 px-4">
                        <img
                          src={fish.image}
                          alt={fish.name}
                          className="w-16 h-16 object-cover rounded-lg"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://via.placeholder.com/64x64/cccccc/666666?text=No+Image';
                          }}
                        />
                      </td>
                      <td className="py-4 px-4 font-semibold text-gray-800">{fish.name}</td>
                      <td className="py-4 px-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold ${
                            fish.rarity === 'legendary'
                              ? 'bg-yellow-500 text-white'
                              : fish.rarity === 'mythic'
                              ? 'bg-red-500 text-white'
                              : 'bg-purple-600 text-white'
                          }`}
                        >
                          {fish.rarity.toUpperCase()}
                        </span>
                      </td>
                      <td className="py-4 px-4 font-semibold text-blue-600">
                        {formatCurrency(fish.price)}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEdit(fish)}
                            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors text-sm font-semibold"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handleDelete(fish.id)}
                            className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors text-sm font-semibold"
                          >
                            Hapus
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Add/Edit Modal */}
      {isAddModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={resetForm}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 border-b border-gray-200 flex justify-between items-center sticky top-0 bg-white">
              <h2 className="text-2xl font-bold text-gray-800">
                {editingFish ? 'Edit Ikan' : 'Tambah Ikan Baru'}
              </h2>
              <button
                onClick={resetForm}
                className="text-3xl text-gray-500 hover:text-gray-800 transition-colors"
              >
                ×
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Nama Ikan *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-500"
                  placeholder="Contoh: Megalodon"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Kelangkaan *
                </label>
                <select
                  value={formData.rarity}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      rarity: e.target.value as 'legendary' | 'mythic' | 'secret',
                    })
                  }
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-500"
                >
                  <option value="legendary">Legendary</option>
                  <option value="mythic">Mythic</option>
                  <option value="secret">Secret</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Harga (Rupiah) *
                </label>
                <input
                  type="number"
                  value={formData.price || 0}
                  onChange={(e) =>
                    setFormData({ ...formData, price: parseInt(e.target.value) || 0 })
                  }
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-500"
                  placeholder="Contoh: 2500000"
                />
                {formData.price && formData.price > 0 && (
                  <p className="text-sm text-gray-500 mt-1">
                    {formatCurrency(formData.price)}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  URL Gambar *
                </label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-500"
                  placeholder="https://..."
                />
                {formData.image && (
                  <img
                    src={formData.image}
                    alt="Preview"
                    className="mt-2 w-32 h-32 object-cover rounded-lg border-2 border-gray-200"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = 'none';
                    }}
                  />
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Deskripsi
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:border-blue-500"
                  rows={4}
                  placeholder="Deskripsi ikan..."
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  onClick={handleSave}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
                >
                  {editingFish ? 'Update Ikan' : 'Tambah Ikan'}
                </button>
                <button
                  onClick={resetForm}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-colors"
                >
                  Batal
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPanel;

