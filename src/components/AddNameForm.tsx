import { useState, useEffect } from 'react';
import type { BeatName, Category } from '../types';

interface AddNameFormProps {
  categories: Category[];
  onAdd: (names: Omit<BeatName, 'id'>[]) => Promise<void>;
  adding?: boolean;
}

export function AddNameForm({ categories, onAdd, adding = false }: AddNameFormProps) {
  const [input, setInput] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Update selected category when categories are loaded
  useEffect(() => {
    if (categories.length > 0 && !selectedCategory) {
      setSelectedCategory(categories[0].id);
      console.log('📂 Default category set:', categories[0].id);
    }
  }, [categories, selectedCategory]);

  const removeNumbers = (text: string): string => {
    // Remove numbers and dots at the beginning (e.g., "1. Name" -> "Name")
    return text.replace(/^\d+\.\s*/, '').trim();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedCategory) {
      alert('Please select a category');
      return;
    }

    // Parse multiple names separated by newlines
    const nameLines = input.split('\n').filter(n => n.trim());

    if (nameLines.length === 0) {
      alert('Please enter at least one name');
      return;
    }

    console.log('📝 Submitting names:', nameLines.length, 'names');
    console.log('📂 Selected category:', selectedCategory);

    // Prepare all names at once
    const namesToAdd: Omit<BeatName, 'id'>[] = nameLines
      .map(name => {
        const cleanedName = removeNumbers(name.trim());
        if (cleanedName) {
          return {
            name: cleanedName,
            category: selectedCategory,
            addedAt: Date.now(),
            used: false,
          } as Omit<BeatName, 'id'>;
        }
        return null;
      })
      .filter((name): name is Omit<BeatName, 'id'> => name !== null);

    console.log('✅ Prepared names to add:', namesToAdd);

    // Add all names at once
    if (namesToAdd.length > 0) {
      try {
        await onAdd(namesToAdd);
        setInput('');
        console.log('✅ Names added successfully!');
      } catch (error) {
        console.error('❌ Error in handleSubmit:', error);
        alert('Failed to add names. Check console for details.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-6 mb-6">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-semibold mb-2">
          Paste Names (one per line)
        </label>
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 transition-colors min-h-[120px] resize-y"
          placeholder="Amore&#10;Passion&#10;Desire&#10;..."
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-semibold mb-2">
          Category
        </label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-purple-500 transition-colors"
        >
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <button
        type="submit"
        disabled={adding}
        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-3 px-6 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
      >
        {adding ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Adding...
          </span>
        ) : (
          'Add Names'
        )}
      </button>
    </form>
  );
}
