import Link from "next/link";

export default function BackToHomeButton({ 
  variant = "blue", 
  className = "",
  children = "← 홈으로 돌아가기"
}) {
  const variants = {
    blue: "bg-blue-500 hover:bg-blue-600",
    green: "bg-green-500 hover:bg-green-600",
    purple: "bg-purple-500 hover:bg-purple-600",
    gray: "bg-gray-500 hover:bg-gray-600"
  };

  return (
    <div className="text-center animate-fade-in-up">
      <Link 
        href="/" 
        className={`inline-block px-6 py-3 text-white rounded-lg transition-all duration-300 
          transform hover:scale-110 hover:-translate-y-1 hover:shadow-lg
          active:scale-95 group ${variants[variant]} ${className}`}
      >
        <span className="inline-block transition-transform duration-200 group-hover:-translate-x-1">
          ←
        </span>
        <span className="ml-2">
          홈으로 돌아가기
        </span>
      </Link>
    </div>
  );
} 