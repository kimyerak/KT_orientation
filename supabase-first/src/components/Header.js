'use client'

import { useState } from 'react'
import Link from 'next/link'

// 퀸의 이메일 주소
const QUEEN_EMAIL = 'yerak213@naver.com'

export default function Header({ user, onSignOut }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  
  // 퀸인지 확인
  const isQueen = user?.email === QUEEN_EMAIL

  return (
    <header className="bg-purple-600 shadow-md">
      <nav className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-14">
          {/* 로고 */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl">👑</span>
            <span className="text-xl font-bold text-white">퀸과 약속잡기</span>
          </Link>

          {/* 메인 네비게이션 */}
          {user ? (
            <div className="flex items-center space-x-4">
              {/* 약속 관리 링크 */}
              <Link
                href="/appointments"
                className="px-3 py-2 text-white hover:bg-purple-700 rounded-md transition-colors"
              >
                📅 약속관리
              </Link>
              
              {/* 사용자 정보 */}
              <div className="flex items-center space-x-3">
                <span className="text-white text-sm">
                  {isQueen ? '👑 여왕' : user.email.split('@')[0]}
                </span>
                <button
                  onClick={onSignOut}
                  className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-sm rounded transition-colors"
                >
                  로그아웃
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <Link
                href="/signin"
                className="px-4 py-2 text-white hover:bg-purple-700 rounded transition-colors"
              >
                로그인
              </Link>
              <Link
                href="/signup"
                className="px-4 py-2 bg-white text-purple-600 hover:bg-gray-100 rounded transition-colors"
              >
                회원가입
              </Link>
            </div>
          )}

          {/* 모바일 메뉴 버튼 */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-white hover:bg-purple-700 rounded"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* 모바일 메뉴 */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-purple-500 py-2">
            {user ? (
              <div className="space-y-2">
                <Link
                  href="/appointments"
                  className="block px-3 py-2 text-white hover:bg-purple-700 rounded"
                  onClick={() => setIsMenuOpen(false)}
                >
                  📅 약속관리
                </Link>
                <div className="px-3 py-2 border-t border-purple-500">
                  <p className="text-purple-200 text-sm">
                    {isQueen ? '👑 여왕' : user.email.split('@')[0]}
                  </p>
                  <button
                    onClick={() => {
                      onSignOut()
                      setIsMenuOpen(false)
                    }}
                    className="mt-1 px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-sm rounded"
                  >
                    로그아웃
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-2">
                <Link
                  href="/signin"
                  className="block px-3 py-2 text-white hover:bg-purple-700 rounded"
                  onClick={() => setIsMenuOpen(false)}
                >
                  로그인
                </Link>
                <Link
                  href="/signup"
                  className="block px-3 py-2 text-white hover:bg-purple-700 rounded"
                  onClick={() => setIsMenuOpen(false)}
                >
                  회원가입
                </Link>
              </div>
            )}
          </div>
        )}
      </nav>
    </header>
  )
} 