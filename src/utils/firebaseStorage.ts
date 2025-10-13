import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
  query,
  orderBy,
  setDoc
} from 'firebase/firestore';
import { db } from '../firebase';
import type { BeatName, Category } from '../types';

const NAMES_COLLECTION = 'beatNames';
const CATEGORIES_COLLECTION = 'categories';

export const firebaseStorage = {
  // Beat Names
  async getNames(): Promise<BeatName[]> {
    try {
      const q = query(collection(db, NAMES_COLLECTION), orderBy('addedAt', 'desc'));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      } as BeatName));
    } catch (error) {
      console.error('Error getting names:', error);
      return [];
    }
  },

  async addName(name: Omit<BeatName, 'id'>): Promise<void> {
    try {
      await addDoc(collection(db, NAMES_COLLECTION), name);
    } catch (error) {
      console.error('Error adding name:', error);
      throw error;
    }
  },

  async deleteName(id: string): Promise<void> {
    try {
      await deleteDoc(doc(db, NAMES_COLLECTION, id));
    } catch (error) {
      console.error('Error deleting name:', error);
      throw error;
    }
  },

  async markAsUsed(id: string): Promise<void> {
    try {
      await updateDoc(doc(db, NAMES_COLLECTION, id), {
        used: true,
        usedAt: Date.now()
      });
    } catch (error) {
      console.error('Error marking as used:', error);
      throw error;
    }
  },

  async restoreName(id: string): Promise<void> {
    try {
      await updateDoc(doc(db, NAMES_COLLECTION, id), {
        used: false,
        usedAt: null
      });
    } catch (error) {
      console.error('Error restoring name:', error);
      throw error;
    }
  },

  // Categories
  async getCategories(): Promise<Category[]> {
    try {
      const querySnapshot = await getDocs(collection(db, CATEGORIES_COLLECTION));

      if (querySnapshot.empty) {
        // Initialize default categories
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

        // Save default categories
        for (const category of defaultCategories) {
          await setDoc(doc(db, CATEGORIES_COLLECTION, category.id), category);
        }

        return defaultCategories;
      }

      return querySnapshot.docs.map(doc => ({
        ...doc.data(),
        id: doc.id
      } as Category));
    } catch (error) {
      console.error('Error getting categories:', error);
      return [];
    }
  },

  async addCategory(category: Category): Promise<void> {
    try {
      await setDoc(doc(db, CATEGORIES_COLLECTION, category.id), category);
    } catch (error) {
      console.error('Error adding category:', error);
      throw error;
    }
  },

  async deleteCategory(id: string): Promise<void> {
    try {
      await deleteDoc(doc(db, CATEGORIES_COLLECTION, id));
    } catch (error) {
      console.error('Error deleting category:', error);
      throw error;
    }
  }
};
