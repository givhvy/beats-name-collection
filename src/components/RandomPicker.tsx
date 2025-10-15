import { useState } from 'react';
import type { BeatName, Category } from '../types';

interface RandomPickerProps {
  names: BeatName[];
  categories: Category[];
  onMarkAsUsed: (id: string) => void;
}

export function RandomPicker({ names, categories, onMarkAsUsed }: RandomPickerProps) {
  const [selectedName, setSelectedName] = useState<BeatName | null>(null);
  const [displayName, setDisplayName] = useState<BeatName | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [filterCategory, setFilterCategory] = useState<string>('all');

  // Filter out used names
  const availableNames = names.filter(n => !n.used);

  const filteredNames = filterCategory === 'all'
    ? availableNames
    : availableNames.filter(n => n.category === filterCategory);

  const handleRandomPick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); // Prevent any default behavior

    if (filteredNames.length === 0) return;

    setIsSpinning(true);
    setSelectedName(null);
    setDisplayName(null);

    // Animate through random names
    let count = 0;
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * filteredNames.length);
      const tempName = filteredNames[randomIndex];
      setSelectedName(tempName);
      setDisplayName(tempName);
      count++;

      if (count >= 20) {
        clearInterval(interval);
        setTimeout(() => {
          const finalIndex = Math.floor(Math.random() * filteredNames.length);
          const finalName = filteredNames[finalIndex];
          setSelectedName(finalName);
          setDisplayName(finalName);
          setIsSpinning(false);

          // Mark the selected name as used immediately
          onMarkAsUsed(finalName.id);
        }, 100);
      }
    }, 50);
  };

  const getCategoryById = (id: string) => {
    return categories.find(c => c.id === id);
  };

  return (
    <div className="bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-2xl p-8 mb-6 text-white">
      <h2 className="text-3xl font-bold mb-6 text-center">Random Beat Name Picker</h2>

      <div className="mb-6">
        <label className="block text-white text-sm font-semibold mb-2">
          Filter by Category
        </label>
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          className="w-full px-4 py-3 bg-white bg-opacity-20 backdrop-blur-sm border-2 border-white border-opacity-30 rounded-xl text-white focus:outline-none focus:border-opacity-50 transition-colors"
        >
          <option value="all" className="text-gray-800">All Categories</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id} className="text-gray-800">
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-8 mb-6 min-h-[180px] flex items-center justify-center">
        {displayName ? (
          <div className="text-center">
            <div
              className={`text-4xl md:text-5xl font-bold mb-3 ${isSpinning ? 'animate-pulse' : 'animate-bounce'}`}
            >
              {displayName.name}
            </div>
            <div className="flex items-center justify-center">
              <div
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: getCategoryById(displayName.category)?.color }}
              />
              <span className="text-lg opacity-90">
                {getCategoryById(displayName.category)?.name}
              </span>
            </div>
          </div>
        ) : (
          <div className="text-center text-xl opacity-75">
            {filteredNames.length === 0
              ? 'No names available in this category'
              : 'Click the button to pick a random name'}
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={handleRandomPick}
        disabled={filteredNames.length === 0 || isSpinning}
        className={`w-full bg-white text-purple-600 font-bold py-4 px-6 rounded-xl transition-all transform ${
          filteredNames.length === 0 || isSpinning
            ? 'opacity-50 cursor-not-allowed'
            : 'hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl'
        }`}
      >
        {isSpinning ? (
          <span className="flex items-center justify-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-purple-600" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Picking...
          </span>
        ) : (
          `Pick Random Name (${filteredNames.length} available)`
        )}
      </button>
    </div>
  );
}
