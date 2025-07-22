import Link from "next/link";
import BackToHomeButton from "@/components/BackToHomeButton";

export default function About() {
  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-green-50 to-emerald-100 dark:from-gray-900 dark:to-gray-800 relative">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800 dark:text-white">
          소개
        </h1>
        
        <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-8 mb-6">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-4xl font-bold">
              👋
            </div>
            
            <div className="flex-1">
              <h2 className="text-2xl font-semibold mb-4 text-gray-700 dark:text-gray-200">
                안녕하세요!
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                저는 Next.js를 배우고 있는 개발자입니다. 
                이 웹사이트는 Next.js App Router를 사용하여 만들었습니다.
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                React, JavaScript, 그리고 웹 개발에 관심이 많습니다.
                새로운 기술을 배우고 프로젝트를 만드는 것을 좋아합니다.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6 mb-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200">
            🛠️ 기술 스택
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['React', 'Next.js', 'JavaScript', 'Tailwind CSS', 'Node.js', 'Git', 'HTML', 'CSS'].map((tech) => (
              <div key={tech} className="bg-blue-50 dark:bg-gray-600 rounded-lg p-3 text-center">
                <span className="text-blue-600 dark:text-blue-400 font-medium">{tech}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-6 mb-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-700 dark:text-gray-200">
            📚 현재 공부 중
          </h3>
          <ul className="space-y-2">
            <li className="flex items-center text-gray-600 dark:text-gray-300">
              <span className="text-green-500 mr-2">✓</span>
              Next.js App Router
            </li>
            <li className="flex items-center text-gray-600 dark:text-gray-300">
              <span className="text-green-500 mr-2">✓</span>
              React Hooks (useState, useEffect)
            </li>
            <li className="flex items-center text-gray-600 dark:text-gray-300">
              <span className="text-yellow-500 mr-2">⏳</span>
              TypeScript
            </li>
            <li className="flex items-center text-gray-600 dark:text-gray-300">
              <span className="text-yellow-500 mr-2">⏳</span>
              데이터베이스 연동
            </li>
          </ul>
        </div>

        <BackToHomeButton variant="green" />
      </div>
    </div>
  );
} 