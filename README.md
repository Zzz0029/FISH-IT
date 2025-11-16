# Fish It Marketplace

Website jual beli ikan virtual premium dari game **Fish It Roblox**. Dibangun dengan React + TypeScript + Tailwind CSS.

## Fitur

- 🐟 **Katalog Ikan Premium** - Hanya ikan Legendary, Mythic, dan Secret
- 💰 **Harga Pasaran Indonesia** - Harga dalam Rupiah berdasarkan market value
- 🛒 **Keranjang Belanja** - Sistem keranjang dengan LocalStorage
- ⚡ **Beli Sekarang** - Langsung redirect ke WhatsApp untuk pembelian
- 💬 **Integrasi WhatsApp** - Pesan otomatis dengan detail semua item yang dibeli
- 🔍 **Pencarian & Filter** - Cari ikan berdasarkan nama atau kelangkaan
- 📱 **Responsive Design** - Tampilan optimal di desktop dan mobile

## Kelangkaan Ikan

### Legendary (Rp 2.500.000 - Rp 4.000.000)
- Megalodon
- Skeleton Narwhal
- Ice Dragon
- Thunder Ray

### Mythic (Rp 3.500.000 - Rp 12.000.000)
1. **Manta Ray** - Ocean (~1 : 50.000) - Rp 3.500.000
2. **Loggerhead Turtle** - Kohana Island (~1 : 55.000) - Rp 3.800.000
3. **Hawks Turtle** - Coral Reefs (~1 : 75.000) - Rp 4.500.000
4. **Prismy Seahorse** - Kohana Island (~1 : 88.000) - Rp 5.000.000
5. **Dotted Stingray** - Fisherman Island (~1 : 91.000) - Rp 5.200.000
6. **Blueflame Ray** - Kohana Volcano (~1 : 93.000) - Rp 5.500.000
7. **Abyss Seahorse** - Esoteric Depths (~1 : 95.000) - Rp 5.800.000
8. **Void Serpent** - Esoteric Depths (New) (~1 : 100.000) - Rp 6.000.000
9. **Hammerhead Shark** - Ocean (~1 : 99.999) - Rp 6.500.000
10. **Celestial Manta** - Update Merchant / Ancient (~1 : 125.000) - Rp 7.500.000
11. **Abyssal Leviathan** - Update Merchant (~1 : 175.000) - Rp 9.500.000
12. **Ethereal Kraken** - Esoteric / Deep (New) (~1 : 200.000) - Rp 12.000.000

### Secret (Rp 15.000.000 - Rp 40.000.000)

1. **Panther Eel** - Lost Isle – Sisyphus Statue (~1 : 150.000) - Rp 15.000.000
2. **Blob Shark** - Ocean (~1 : 250.000) - Rp 16.000.000
3. **Eerie Shark** - Coral Reefs (~1 : 250.000) - Rp 16.000.000
4. **Thin Armor Shark** - Esoteric Depths (~1 : 300.000) - Rp 17.000.000
5. **Ghost Shark** - Ocean (~1 : 500.000) - Rp 18.000.000
6. **Frostborn Shark** - Crater Island (~1 : 500.000) - Rp 18.000.000
7. **Bone Whale** - Ancient Jungle – Underground Cellar & Sacred Temple (~1 : 500.000) - Rp 18.000.000
8. **Gladiator Shark** - Ancient Jungle – Enchant Ruin (~1 : 500.000) - Rp 18.000.000
9. **Crystal Crab** - Fisherman Island (~1 : 750.000) - Rp 20.000.000
10. **Queen Crab** - Lost Isle – Treasure Room (~1 : 800.000) - Rp 21.000.000
11. **Mosasaurus Shark** - Ancient Jungle (~1 : 800.000) - Rp 21.000.000
12. **Giant Squid** - Lost Isle – Sisyphus Statue (~1 : 800.000) - Rp 21.000.000
13. **Great Whale** - Tropical Grove (~1 : 950.000) - Rp 22.000.000
14. **King Crab** - Lost Isle – Treasure Room (~1 : 1.200.000) - Rp 24.000.000
15. **King Jelly** - Ancient Jungle (~1 : 1.500.000) - Rp 26.000.000
16. **Orca** - Fisherman Island (~1 : 1.500.000) - Rp 26.000.000
17. **Monster Shark** - Coral Reefs (~1 : 2.500.000) - Rp 30.000.000
18. **Worm Fish** - Ocean (~1 : 3.000.000) - Rp 32.000.000
19. **Lochness Monster** - Kohana (~1 : 3.000.000) - Rp 32.000.000
20. **Scare** - Esoteric Depths (~1 : 3.000.000) - Rp 32.000.000
21. **Lochness Monster (Ancient)** - Ancient Jungle – Enchant Ruin (~1 : 3.000.000) - Rp 32.000.000
22. **Robot Kraken** - Lost Isle – Sisyphus Statue (~1 : 3.500.000) - Rp 35.000.000
23. **Elshark Grand Maja** - Ancient Jungle – Sacred Temple (~1 : 4.000.000) - Rp 40.000.000

## Instalasi

1. Install dependencies:
```bash
npm install
```

2. Jalankan development server:
```bash
npm run dev
```

3. Build untuk production:
```bash
npm run build
```

4. Preview production build:
```bash
npm run preview
```

## Integrasi WhatsApp

Saat pengguna klik "Beli Sekarang" atau "Lanjutkan ke WhatsApp", sistem akan:
1. Membuat pesan otomatis dengan detail semua item
2. Menghitung total harga
3. Redirect ke WhatsApp dengan nomor: **+6285187047492**
4. Pesan sudah siap untuk dikirim

Format pesan WhatsApp:
```
Halo! Saya ingin membeli ikan berikut:

1. [Nama Ikan]
   - Kelangkaan: [RARITY]
   - Jumlah: [X]x
   - Harga: Rp [HARGA]
   - Subtotal: Rp [SUBTOTAL]

💰 TOTAL: Rp [TOTAL]

Mohon konfirmasi ketersediaan dan cara pembayaran. Terima kasih! 🐟
```

## Teknologi

- **React 18** - UI Framework
- **TypeScript** - Type Safety
- **Tailwind CSS** - Styling
- **Vite** - Build Tool
- **LocalStorage** - Penyimpanan keranjang

## Struktur Project

```
src/
├── components/       # React Components
│   ├── Header.tsx
│   ├── FishCard.tsx
│   └── Cart.tsx
├── data/            # Data ikan
│   └── fishData.ts
├── types/           # TypeScript types
│   └── fish.ts
├── utils/           # Utilities
│   ├── formatter.ts
│   └── whatsapp.ts
├── App.tsx          # Main App Component
├── main.tsx         # Entry Point
└── index.css        # Global Styles
```

## Catatan

- Website ini menggunakan placeholder images untuk gambar ikan
- Untuk penggunaan produksi, disarankan untuk mengganti dengan gambar ikan asli dari game Fish It
- Harga ikan dapat berubah sesuai dengan kondisi pasar
- Pastikan WhatsApp sudah terinstall di perangkat pengguna

## Lisensi

© 2024 Fish It Marketplace. All rights reserved.
