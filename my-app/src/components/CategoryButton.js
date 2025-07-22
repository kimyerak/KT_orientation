export default function CategoryButton({ 
  category, 
  isActive, 
  onClick,
  className = ""
}) {
  return (
    <button
      onClick={() => onClick(category)}
      className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 
        transform hover:scale-110 active:scale-95
        ${
        isActive
          ? 'bg-purple-500 text-white shadow-lg scale-105 animate-pulse-gentle'
          : 'bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-purple-100 dark:hover:bg-gray-600 hover:shadow-md'
      } ${className}`}
    >
      <span className="inline-block transition-transform duration-200 hover:rotate-3">
        {category}
      </span>
    </button>
  );
} 