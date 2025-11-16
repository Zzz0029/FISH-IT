import { Fish } from '../types/fish';

// Data ikan akan diambil dari localStorage, jika tidak ada maka array kosong
export const getFishData = (): Fish[] => {
  const saved = localStorage.getItem('fishItData');
  return saved ? JSON.parse(saved) : [];
};

export const saveFishData = (fishData: Fish[]) => {
  localStorage.setItem('fishItData', JSON.stringify(fishData));
};
