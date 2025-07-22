import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen p-8 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 relative">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-8 text-gray-800 dark:text-white animate-text-glow">
          환영합니다! 👋
        </h1>
        
        <p className="text-xl text-gray-600 dark:text-gray-300 mb-12 leading-relaxed">
          Next.js App Router로 만든 개인 웹사이트입니다.<br />
          다양한 페이지를 둘러보세요!
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 animate-children">
          {/* 소개 카드 */}
          <Link href="/about" className="group">
            <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-8 hover:shadow-xl 
              transition-all duration-300 group-hover:scale-105 hover:-translate-y-2 cursor-pointer glow-on-hover">
              <div className="text-4xl mb-4 group-hover:animate-bounce transition-transform">👋</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white 
                group-hover:text-green-600 dark:group-hover:text-green-400 transition-colors">
                소개
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                개발자로서의 여정과 기술 스택을 소개합니다.
              </p>
            </div>
          </Link>

          {/* 좋아하는 것 카드 */}
          <Link href="/favorites" className="group">
            <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-8 hover:shadow-xl 
              transition-all duration-300 group-hover:scale-105 hover:-translate-y-2 cursor-pointer glow-on-hover">
              <div className="text-4xl mb-4 group-hover:animate-bounce transition-transform">💜</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white 
                group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                좋아하는 것
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                음식, 영화, 취미, 음악 등 제가 좋아하는 것들을 소개합니다.
              </p>
            </div>
          </Link>

          {/* 연락처 카드 */}
          <Link href="/contact" className="group">
            <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-8 hover:shadow-xl 
              transition-all duration-300 group-hover:scale-105 hover:-translate-y-2 cursor-pointer glow-on-hover">
              <div className="text-4xl mb-4 group-hover:animate-bounce transition-transform">📞</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white 
                group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                연락처
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                연락 정보와 메시지를 보내실 수 있습니다.
              </p>
            </div>
          </Link>
        </div>

        <div className="bg-white dark:bg-gray-700 rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">
            🚀 기술 스택
          </h2>
          <div className="flex flex-wrap justify-center gap-4">
            {['Next.js 15', 'React 19', 'Tailwind CSS', 'App Router', 'JavaScript'].map((tech) => (
              <span 
                key={tech} 
                className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
