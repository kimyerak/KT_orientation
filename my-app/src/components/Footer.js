import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-800 dark:bg-gray-900 text-white mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 사이트 정보 */}
          <div>
            <h3 className="text-xl font-semibold mb-4">나의 Next.js 웹사이트</h3>
            <p className="text-gray-300 mb-4">
              Next.js App Router를 사용하여 만든 개인 웹사이트입니다.
              React와 Tailwind CSS로 구현되었습니다.
            </p>
            <p className="text-sm text-gray-400">
              © {currentYear} 모든 권리 보유
            </p>
          </div>
          
          {/* 빠른 링크 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">빠른 링크</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                  홈
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                  소개
                </Link>
              </li>
              <li>
                <Link href="/favorites" className="text-gray-300 hover:text-white transition-colors">
                  좋아하는 것
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
                  연락처
                </Link>
              </li>
            </ul>
          </div>
          
          {/* 소셜 미디어 & 기술 스택 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">소셜 & 기술</h3>
            <div className="space-y-3">
              <div>
                <h4 className="text-sm font-medium text-gray-400 mb-2">소셜 미디어</h4>
                <div className="flex space-x-4">
                  <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">
                    <span className="text-xl">💼</span>
                  </a>
                  <a href="#" className="text-gray-300 hover:text-gray-100 transition-colors">
                    <span className="text-xl">🐙</span>
                  </a>
                  <a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">
                    <span className="text-xl">🐦</span>
                  </a>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-400 mb-2">기술 스택</h4>
                <div className="flex flex-wrap gap-2">
                  {['Next.js', 'React', 'Tailwind CSS'].map((tech) => (
                    <span 
                      key={tech} 
                      className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* 하단 구분선 및 추가 정보 */}
        <div className="border-t border-gray-700 mt-8 pt-6 text-center">
          <p className="text-sm text-gray-400">
            Made with ❤️ using Next.js App Router
          </p>
        </div>
      </div>
    </footer>
  );
} 