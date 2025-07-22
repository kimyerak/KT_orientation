export default function CategoryStats({ favorites }) {
  const categories = Object.keys(favorites);

  return (
    <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6 mb-6">
      <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200">
        📊 통계
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {categories.map((category) => (
          <div key={category} className="text-center">
            <div className="text-2xl font-bold text-purple-500">
              {favorites[category].length}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              {category}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 