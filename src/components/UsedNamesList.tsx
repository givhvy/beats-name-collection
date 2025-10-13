import type { BeatName, Category } from '../types';

interface UsedNamesListProps {
  names: BeatName[];
  categories: Category[];
  onRestore: (id: string) => void;
}

export function UsedNamesList({ names, categories, onRestore }: UsedNamesListProps) {
  const usedNames = names.filter(n => n.used);

  const groupedNames = categories.map(cat => ({
    category: cat,
    names: usedNames.filter(n => n.category === cat.id)
  })).filter(group => group.names.length > 0);

  if (usedNames.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
        <div className="text-gray-400 text-lg">
          <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p>No names have been used yet.</p>
          <p className="text-sm mt-2">Use the Random Picker to select a name!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-4 mb-4">
        <p className="text-gray-700 text-center">
          <span className="font-bold text-purple-600">{usedNames.length}</span> name{usedNames.length === 1 ? '' : 's'} used
        </p>
      </div>

      {groupedNames.map(({ category, names: groupNames }) => (
        <div key={category.id} className="bg-white rounded-2xl shadow-lg p-6">
          <div className="flex items-center mb-4">
            <div
              className="w-4 h-4 rounded-full mr-3"
              style={{ backgroundColor: category.color }}
            />
            <h3 className="text-xl font-bold text-gray-800">{category.name}</h3>
            <span className="ml-auto text-sm text-gray-500 font-medium">
              {groupNames.length} {groupNames.length === 1 ? 'name' : 'names'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {groupNames.map(name => (
              <div
                key={name.id}
                className="group relative bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl p-4 opacity-75 border border-gray-300"
                style={{
                  borderLeftWidth: '4px',
                  borderLeftColor: category.color
                }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 pr-2">
                    <span className="text-gray-700 font-medium line-through">{name.name}</span>
                    {name.usedAt && (
                      <p className="text-xs text-gray-500 mt-1">
                        Used: {new Date(name.usedAt).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => onRestore(name.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-green-600 hover:text-green-700 flex-shrink-0"
                    title="Restore to available"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
