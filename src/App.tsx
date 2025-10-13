import { useState, useEffect } from 'react';
import type { BeatName, Category } from './types';
import { firebaseStorage } from './utils/firebaseStorage';
import { AddNameForm } from './components/AddNameForm';
import { NamesList } from './components/NamesList';
import { RandomPicker } from './components/RandomPicker';
import { UsedNamesList } from './components/UsedNamesList';

function App() {
  const [names, setNames] = useState<BeatName[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeTab, setActiveTab] = useState<'browse' | 'random' | 'used'>('browse');
  const [loading, setLoading] = useState(true);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [namesData, categoriesData] = await Promise.all([
        firebaseStorage.getNames(),
        firebaseStorage.getCategories()
      ]);
      setNames(namesData);
      setCategories(categoriesData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddNames = async (namesToAdd: Omit<BeatName, 'id'>[]) => {
    setAdding(true);
    try {
      // Add all names in parallel
      await Promise.all(
        namesToAdd.map(name => firebaseStorage.addName(name))
      );
      // Only reload data once after all names are added
      await loadData();
    } catch (error) {
      console.error('Error adding names:', error);
      alert('Failed to add names. Please try again.');
    } finally {
      setAdding(false);
    }
  };

  const handleDeleteName = async (id: string) => {
    if (confirm('Are you sure you want to delete this name?')) {
      try {
        await firebaseStorage.deleteName(id);
        await loadData();
      } catch (error) {
        console.error('Error deleting name:', error);
        alert('Failed to delete name. Please try again.');
      }
    }
  };

  const handleMarkAsUsed = async (id: string) => {
    try {
      await firebaseStorage.markAsUsed(id);
      await loadData();
    } catch (error) {
      console.error('Error marking as used:', error);
      alert('Failed to mark name as used. Please try again.');
    }
  };

  const handleRestoreName = async (id: string) => {
    try {
      await firebaseStorage.restoreName(id);
      await loadData();
    } catch (error) {
      console.error('Error restoring name:', error);
      alert('Failed to restore name. Please try again.');
    }
  };

  const availableCount = names.filter(n => !n.used).length;
  const usedCount = names.filter(n => n.used).length;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading your beat names...</p>
        </div>
      </div>
    );
  }

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
          <div className="mt-4 flex justify-center gap-6 text-sm text-gray-500">
            <div>
              Total: <span className="font-semibold text-purple-600">{names.length}</span> names
            </div>
            <div className="border-l border-gray-300 pl-6">
              Available: <span className="font-semibold text-green-600">{availableCount}</span>
            </div>
            <div className="border-l border-gray-300 pl-6">
              Used: <span className="font-semibold text-orange-600">{usedCount}</span>
            </div>
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
            <button
              onClick={() => setActiveTab('used')}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                activeTab === 'used'
                  ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Used Names {usedCount > 0 && <span className="ml-1 text-xs">({usedCount})</span>}
            </button>
          </div>
        </div>

        {/* Content */}
        {activeTab === 'browse' ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <AddNameForm categories={categories} onAdd={handleAddNames} adding={adding} />
            </div>
            <div className="lg:col-span-2">
              <NamesList
                names={names}
                categories={categories}
                onDelete={handleDeleteName}
              />
            </div>
          </div>
        ) : activeTab === 'random' ? (
          <div className="max-w-3xl mx-auto">
            <RandomPicker
              names={names}
              categories={categories}
              onMarkAsUsed={handleMarkAsUsed}
            />
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
                <li className="flex items-start">
                  <span className="text-purple-500 mr-2">4.</span>
                  <span>The selected name will be marked as used and won't appear again</span>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="max-w-7xl mx-auto">
            <UsedNamesList
              names={names}
              categories={categories}
              onRestore={handleRestoreName}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
