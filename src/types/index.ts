export interface BeatName {
  id: string;
  name: string;
  category: string;
  addedAt: number;
  used?: boolean;
  usedAt?: number;
}

export interface Category {
  id: string;
  name: string;
  color: string;
}
