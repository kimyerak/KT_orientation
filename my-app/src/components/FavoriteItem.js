export default function FavoriteItem({ 
  id,
  name, 
  emoji, 
  reason,
  className = ""
}) {
  return (
    <div
      className={`bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6 hover:shadow-xl 
        transition-all duration-300 hover:scale-105 hover:-translate-y-2
        animate-fade-in-up group cursor-pointer glow-on-hover ${className}`}
    >
      <div className="flex items-center mb-4">
        <span className="text-4xl mr-4 group-hover:animate-bounce transition-transform">
          {emoji}
        </span>
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
          {name}
        </h3>
      </div>
      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
        {reason}
      </p>
    </div>
  );
} 