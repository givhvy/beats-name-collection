import type { BeatName, Category } from '../types';

interface NamesListProps {
  names: BeatName[];
  categories: Category[];
  onDelete: (id: string) => void;
}

export function NamesList({ names, categories, onDelete }: NamesListProps) {
  const groupedNames = categories.map(cat => ({
    category: cat,
    names: names.filter(n => n.category === cat.id)
  })).filter(group => group.names.length > 0);

  if (names.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-lg p-12 text-center">
        <div className="text-gray-400 text-lg">
          <svg className="w-16 h-16 mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p>No names yet. Start by adding some beautiful beat names!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
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
                className="group relative bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4 hover:from-gray-100 hover:to-gray-200 transition-all border border-gray-200"
                style={{
                  borderLeftWidth: '4px',
                  borderLeftColor: category.color
                }}
              >
                <div className="flex items-start justify-between">
                  <span className="text-gray-800 font-medium flex-1 pr-2">{name.name}</span>
                  <button
                    onClick={() => onDelete(name.id)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-700 flex-shrink-0"
                    title="Delete"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
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
