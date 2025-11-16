export type FishRarity = 'legendary' | 'mythic' | 'secret';

export interface Fish {
  id: number;
  name: string;
  rarity: FishRarity;
  price: number;
  image: string;
  description: string;
}

export interface CartItem extends Fish {
  quantity: number;
}

