import type { BeatName, Category } from '../types';

const STORAGE_KEY = 'beat-names-data';
const CATEGORIES_KEY = 'beat-names-categories';

export const storage = {
  // Beat Names
  getNames(): BeatName[] {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  saveNames(names: BeatName[]): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(names));
  },

  addName(name: BeatName): void {
    const names = this.getNames();
    names.push(name);
    this.saveNames(names);
  },

  deleteName(id: string): void {
    const names = this.getNames().filter(n => n.id !== id);
    this.saveNames(names);
  },

  // Categories
  getCategories(): Category[] {
    const data = localStorage.getItem(CATEGORIES_KEY);
    if (data) {
      return JSON.parse(data);
    }
    // Default categories inspired by Renaissance
    const defaultCategories: Category[] = [
      { id: '1', name: 'Love & Emotion', color: '#FF6B9D' },
      { id: '2', name: 'Healing & Remedies', color: '#4ECDC4' },
      { id: '3', name: 'Dreams & Mystery', color: '#9D84B7' },
      { id: '4', name: 'Time & Memory', color: '#FFB347' },
      { id: '5', name: 'Beauty & Grace', color: '#FFD700' },
      { id: '6', name: 'Nature & Elements', color: '#90EE90' },
      { id: '7', name: 'Feelings & States', color: '#87CEEB' },
      { id: '8', name: 'Journey & Discovery', color: '#DDA0DD' },
      { id: '9', name: 'Light & Hope', color: '#F0E68C' },
      { id: '10', name: 'Simple & Powerful', color: '#CD5C5C' },
    ];
    this.saveCategories(defaultCategories);
    return defaultCategories;
  },

  saveCategories(categories: Category[]): void {
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
  },

  addCategory(category: Category): void {
    const categories = this.getCategories();
    categories.push(category);
    this.saveCategories(categories);
  },

  deleteCategory(id: string): void {
    const categories = this.getCategories().filter(c => c.id !== id);
    this.saveCategories(categories);
  }
};
