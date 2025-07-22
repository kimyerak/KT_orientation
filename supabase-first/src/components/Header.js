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
    <header className="bg-gradient-to-r from-purple-600 via-pink-600 to-purple-700 shadow-lg sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* 로고 영역 */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center shadow-md">
                <span className="text-white font-bold text-lg">👑</span>
              </div>
              <div className="hidden sm:block">
                <span className="text-2xl font-bold text-white">
                  퀸과 약속잡기
                </span>
                <p className="text-xs text-purple-200 -mt-1">
                  Royal Appointment System
                </p>
              </div>
              <div className="sm:hidden">
                <span className="text-xl font-bold text-white">👑 퀸</span>
              </div>
            </Link>
          </div>

          {/* 중간 네비게이션 */}
          {user && (
            <div className="hidden md:flex items-center space-x-6">
              <Link
                href="/"
                className="px-3 py-2 text-sm font-medium text-purple-100 hover:text-white hover:bg-white hover:bg-opacity-20 rounded-lg transition-all duration-200"
              >
                🏰 궁전
              </Link>
              <Link
                href="/appointments"
                className="px-3 py-2 text-sm font-medium text-purple-100 hover:text-white hover:bg-white hover:bg-opacity-20 rounded-lg transition-all duration-200"
              >
                📅 약속 관리
              </Link>
              <Link
                href="/profile"
                className="px-3 py-2 text-sm font-medium text-purple-100 hover:text-white hover:bg-white hover:bg-opacity-20 rounded-lg transition-all duration-200"
              >
                👤 프로필
              </Link>
            </div>
          )}

          {/* 사용자 정보 및 네비게이션 */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                {/* 환영 메시지 */}
                <div className="hidden md:flex items-center space-x-3">
                  <div className="flex items-center space-x-3 bg-white bg-opacity-20 rounded-lg px-3 py-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      isQueen 
                        ? 'bg-gradient-to-br from-yellow-400 to-yellow-600' 
                        : 'bg-gradient-to-br from-blue-400 to-blue-600'
                    }`}>
                      <span className="text-white font-bold text-sm">
                        {isQueen ? '👑' : user.email.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="text-sm">
                      <p className="text-purple-100 text-xs">
                        {isQueen ? '여왕 폐하' : '신하'}
                      </p>
                      <p className="font-medium text-white truncate max-w-[150px]">
                        {isQueen ? 'Queen' : user.email.split('@')[0]}
                      </p>
                    </div>
                    {isQueen && (
                      <span className="px-2 py-1 bg-yellow-400 text-yellow-900 rounded-full text-xs font-bold">
                        QUEEN
                      </span>
                    )}
                  </div>
                </div>

                {/* 모바일용 사용자 아이콘 */}
                <div className="md:hidden">
                  <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      isQueen 
                        ? 'bg-gradient-to-br from-yellow-400 to-yellow-600' 
                        : 'bg-white bg-opacity-20'
                    }`}
                  >
                    <span className="text-white font-bold text-sm">
                      {isQueen ? '👑' : user.email.charAt(0).toUpperCase()}
                    </span>
                  </button>
                </div>

                {/* 로그아웃 버튼 */}
                <button
                  onClick={onSignOut}
                  className="px-4 py-2 text-sm font-medium text-purple-600 bg-white hover:bg-gray-100 rounded-lg transition-colors duration-200 shadow-md"
                >
                  {isQueen ? '👑 퇴궁' : '🚪 로그아웃'}
                </button>
              </>
            ) : (
              <>
                {/* 로그인되지 않은 상태 */}
                <div className="hidden sm:flex items-center space-x-2">
                  <Link
                    href="/signin"
                    className="px-4 py-2 text-sm font-medium text-purple-100 hover:text-white hover:bg-white hover:bg-opacity-20 rounded-lg transition-all duration-200"
                  >
                    🗝️ 입궁
                  </Link>
                  <Link
                    href="/signup"
                    className="px-4 py-2 text-sm font-medium text-purple-600 bg-white hover:bg-gray-100 rounded-lg transition-colors duration-200 shadow-md"
                  >
                    👑 신분증 발급
                  </Link>
                </div>

                {/* 모바일 메뉴 버튼 */}
                <div className="sm:hidden">
                  <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="p-2 rounded-lg text-purple-100 hover:text-white hover:bg-white hover:bg-opacity-20"
                  >
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* 모바일 메뉴 */}
        {isMenuOpen && (
          <div className="sm:hidden border-t border-purple-400 border-opacity-30 py-3 mt-2">
            {user ? (
              <div className="space-y-3">
                {/* 모바일 네비게이션 */}
                <div className="space-y-1">
                  <Link
                    href="/"
                    className="block px-3 py-2 text-sm font-medium text-purple-100 hover:text-white hover:bg-white hover:bg-opacity-20 rounded-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    🏰 궁전
                  </Link>
                  <Link
                    href="/appointments"
                    className="block px-3 py-2 text-sm font-medium text-purple-100 hover:text-white hover:bg-white hover:bg-opacity-20 rounded-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    📅 약속 관리
                  </Link>
                  <Link
                    href="/profile"
                    className="block px-3 py-2 text-sm font-medium text-purple-100 hover:text-white hover:bg-white hover:bg-opacity-20 rounded-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    👤 프로필
                  </Link>
                </div>
                
                <div className="px-3 py-2 border-t border-purple-400 border-opacity-30">
                  <p className="text-sm text-purple-100">
                    {isQueen ? '👑 여왕 폐하' : '🙇‍♂️ 신하'}
                  </p>
                  <p className="font-medium text-white">
                    {isQueen ? 'Queen' : user.email}
                  </p>
                </div>
                <button
                  onClick={onSignOut}
                  className="w-full text-left px-3 py-2 text-sm font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg"
                >
                  {isQueen ? '👑 퇴궁' : '🚪 로그아웃'}
                </button>
              </div>
            ) : (
              <div className="space-y-2">
                <Link
                  href="/signin"
                  className="block px-3 py-2 text-sm font-medium text-purple-100 hover:text-white hover:bg-white hover:bg-opacity-20 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  🗝️ 입궁
                </Link>
                <Link
                  href="/signup"
                  className="block px-3 py-2 text-sm font-medium text-purple-600 bg-white hover:bg-gray-100 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  👑 신분증 발급
                </Link>
              </div>
            )}
          </div>
        )}
      </nav>
    </header>
  )
} 