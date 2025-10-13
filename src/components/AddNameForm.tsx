import { useState } from 'react';
import type { BeatName, Category } from '../types';

interface AddNameFormProps {
  categories: Category[];
  onAdd: (name: BeatName) => void;
}

export function AddNameForm({ categories, onAdd }: AddNameFormProps) {
  const [input, setInput] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(categories[0]?.id || '');

  const removeNumbers = (text: string): string => {
    // Remove numbers and dots at the beginning (e.g., "1. Name" -> "Name")
    return text.replace(/^\d+\.\s*/, '').trim();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Parse multiple names separated by newlines
    const names = input.split('\n').filter(n => n.trim());

    names.forEach(name => {
      const cleanedName = removeNumbers(name.trim());
      if (cleanedName) {
        const newName: BeatName = {
          id: Date.now().toString() + Math.random(),
          name: cleanedName,
          category: selectedCategory,
          addedAt: Date.now(),
          used: false,
        };
        onAdd(newName);
      }
    });

    setInput('');
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
        className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold py-3 px-6 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-md"
      >
        Add Names
      </button>
    </form>
  );
}
