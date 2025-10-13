import { useState, useEffect } from 'react';
import type { BeatName, Category } from './types';
import { storage } from './utils/storage';
import { AddNameForm } from './components/AddNameForm';
import { NamesList } from './components/NamesList';
import { RandomPicker } from './components/RandomPicker';

function App() {
  const [names, setNames] = useState<BeatName[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeTab, setActiveTab] = useState<'browse' | 'random'>('browse');

  useEffect(() => {
    setNames(storage.getNames());
    setCategories(storage.getCategories());
  }, []);

  const handleAddName = (name: BeatName) => {
    storage.addName(name);
    setNames(storage.getNames());
  };

  const handleDeleteName = (id: string) => {
    if (confirm('Are you sure you want to delete this name?')) {
      storage.deleteName(id);
      setNames(storage.getNames());
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-5xl md:text-6xl font-bold mb-3 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            Beat Names Collection
          </h1>
          <p className="text-gray-600 text-lg">
            Your beautiful Renaissance-inspired beat names library
          </p>
          <div className="mt-4 text-sm text-gray-500">
            Total: <span className="font-semibold text-purple-600">{names.length}</span> names
          </div>
        </header>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-6">
          <div className="bg-white rounded-xl shadow-md p-1 inline-flex">
            <button
              onClick={() => setActiveTab('browse')}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                activeTab === 'browse'
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Browse & Add
            </button>
            <button
              onClick={() => setActiveTab('random')}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                activeTab === 'random'
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Random Picker
            </button>
          </div>
        </div>

        {/* Content */}
        {activeTab === 'browse' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <AddNameForm categories={categories} onAdd={handleAddName} />
            </div>
            <div className="lg:col-span-2">
              <NamesList
                names={names}
                categories={categories}
                onDelete={handleDeleteName}
              />
            </div>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto">
            <RandomPicker names={names} categories={categories} />
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">How to use:</h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">1.</span>
                  <span>Choose a category filter or select "All Categories"</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">2.</span>
                  <span>Click the "Pick Random Name" button</span>
                </li>
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">3.</span>
                  <span>Watch the animation and get your perfect beat name!</span>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
