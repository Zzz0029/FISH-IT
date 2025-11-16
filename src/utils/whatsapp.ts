import { CartItem, Fish } from '../types/fish';

const WHATSAPP_NUMBER = '6285187047492';

export function formatWhatsAppMessage(cartItems: CartItem[]): string {
  if (cartItems.length === 0) {
    return '';
  }

  let message = 'Halo! Saya ingin membeli ikan berikut:\n\n';
  
  cartItems.forEach((item, index) => {
    message += `${index + 1}. ${item.name}\n`;
    message += `   - Kelangkaan: ${item.rarity.toUpperCase()}\n`;
    message += `   - Jumlah: ${item.quantity}x\n`;
    message += `   - Harga: Rp ${item.price.toLocaleString('id-ID')}\n`;
    message += `   - Subtotal: Rp ${(item.price * item.quantity).toLocaleString('id-ID')}\n\n`;
  });

  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  message += `💰 TOTAL: Rp ${total.toLocaleString('id-ID')}\n\n`;
  message += 'Mohon konfirmasi ketersediaan dan cara pembayaran. Terima kasih! 🐟';

  return message;
}

export function redirectToWhatsApp(cartItems: CartItem[]): void {
  const message = formatWhatsAppMessage(cartItems);
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
  window.open(whatsappUrl, '_blank');
}

export function formatTradeMessage(fish: Fish): string {
  let message = 'Halo! Saya tertarik untuk melakukan trade/bertukar ikan:\n\n';
  message += `🐟 Ikan yang Saya Inginkan:\n`;
  message += `   - Nama: ${fish.name}\n`;
  message += `   - Kelangkaan: ${fish.rarity.toUpperCase()}\n`;
  message += `   - Harga Pasar: Rp ${fish.price.toLocaleString('id-ID')}\n\n`;
  message += `Saya ingin menawar/menukar ikan ini.\n`;
  message += `Silakan beritahu ikan apa yang Anda inginkan atau tawaran Anda.\n\n`;
  message += 'Terima kasih! 🐟';

  return message;
}

export function redirectToWhatsAppTrade(fish: Fish): void {
  const message = formatTradeMessage(fish);
  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
  window.open(whatsappUrl, '_blank');
}

