'use client'

import { useState, useEffect } from 'react'
import Link from "next/link"
import Header from '@/components/Header'
import { getUser, signOut, onAuthStateChange } from '@/lib/auth'

// 퀸의 이메일 주소
const QUEEN_EMAIL = 'yerak213@naver.com'

export default function Home() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // 초기 사용자 정보 가져오기
    const fetchUser = async () => {
      const currentUser = await getUser()
      setUser(currentUser)
      setLoading(false)
    }

    fetchUser()

    // 인증 상태 변화 감지
    const { data: { subscription } } = onAuthStateChange((event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleSignOut = async () => {
    await signOut()
    setUser(null)
  }

  // 퀸인지 확인
  const isQueen = user?.email === QUEEN_EMAIL

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
          </div>
          <p className="text-purple-600 font-medium">궁전 입장 중...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-purple-100">
      <Header user={user} onSignOut={handleSignOut} />

      {/* 메인 컨텐츠 */}
      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center space-y-12">
          {user ? (
            // 로그인된 상태
            <div className="space-y-12">
              {/* 환영 섹션 */}
              <div className="space-y-6">
                <div className="text-8xl animate-bounce">
                  {isQueen ? '👑' : '🙇‍♂️'}
                </div>
                <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  {isQueen ? '여왕 폐하 환영합니다!' : '궁전에 오신 것을 환영합니다!'}
                </h1>
                                 <p className="text-xl text-gray-900 max-w-2xl mx-auto">
                   {isQueen 
                     ? '신하들의 약속 요청을 확인하고 승인/거절하여 일정을 관리하세요.' 
                     : '여왕 폐하에게 약속을 요청하고 왕실 캘린더를 확인해보세요.'
                   }
                 </p>
              </div>

              {/* 메인 액션 카드 */}
              <div className={`rounded-2xl p-8 text-white shadow-2xl ${
                isQueen 
                  ? 'bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600' 
                  : 'bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600'
              }`}>
                <div className="text-6xl mb-4">
                  {isQueen ? '👑' : '📅'}
                </div>
                <h2 className="text-3xl font-bold mb-4">
                  {isQueen ? '왕실 관리실' : '퀸과 약속잡기'}
                </h2>
                <p className="text-xl mb-8 opacity-90">
                  {isQueen 
                    ? '신하들의 요청을 확인하고 왕실 일정을 관리하세요!' 
                    : '원하는 날짜에 여왕 폐하와의 만남을 요청하세요!'
                  }
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    href="/appointments"
                    className="inline-block px-8 py-4 bg-white text-purple-600 rounded-xl hover:bg-gray-100 transition-all duration-300 font-bold text-lg shadow-lg transform hover:scale-105"
                  >
                    {isQueen ? '👑 왕실 관리실 입장' : '📅 약속 요청하기'} →
                  </Link>
                  {!isQueen && (
                    <Link
                      href="/profile"
                      className="inline-block px-8 py-4 border-2 border-white text-white rounded-xl hover:bg-white hover:text-purple-600 transition-all duration-300 font-bold text-lg transform hover:scale-105"
                    >
                      👤 내 신분증 보기
                    </Link>
                  )}
                </div>
              </div>

              {/* 정보 카드들 */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* 사용자 정보 카드 */}
                <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-purple-500">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                      isQueen 
                        ? 'bg-gradient-to-br from-yellow-400 to-yellow-600' 
                        : 'bg-gradient-to-br from-purple-400 to-purple-600'
                    }`}>
                      <span className="text-white text-xl">
                        {isQueen ? '👑' : '🙇‍♂️'}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {isQueen ? '왕실 정보' : '신하 정보'}
                    </h3>
                  </div>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-3 border-b border-gray-100">
                      <span className="text-gray-800 font-medium">신분</span>
                      <span className={`px-3 py-1 rounded-full text-sm font-bold ${
                        isQueen 
                          ? 'bg-yellow-100 text-yellow-800' 
                          : 'bg-purple-100 text-purple-800'
                      }`}>
                        {isQueen ? '👑 여왕 폐하' : '🙇‍♂️ 신하'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-gray-100">
                      <span className="text-gray-800 font-medium">이메일</span>
                      <span className="text-gray-900 font-mono text-sm">
                        {user.email}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-3 border-b border-gray-100">
                      <span className="text-gray-800 font-medium">입궁일</span>
                      <span className="text-gray-900">
                        {new Date(user.created_at).toLocaleDateString('ko-KR')}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-3">
                      <span className="text-gray-800 font-medium">신분증 ID</span>
                      <span className="font-mono text-xs text-gray-800 bg-gray-100 px-2 py-1 rounded">
                        {user.id.slice(0, 8)}...
                      </span>
                    </div>
                  </div>
                </div>

                {/* 시스템 기능 카드 */}
                <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-pink-500">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xl">⚡</span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {isQueen ? '왕실 권한' : '이용 가능 서비스'}
                    </h3>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                      <span className={`font-medium ${
                        isQueen ? 'text-purple-800' : 'text-gray-800'
                      }`}>
                        {isQueen ? '약속 승인/거절 권한' : '약속 요청'}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-pink-50 to-purple-50 rounded-lg">
                      <div className="w-2 h-2 bg-pink-500 rounded-full animate-pulse"></div>
                      <span className={`font-medium ${
                        isQueen ? 'text-pink-800' : 'text-gray-800'
                      }`}>
                        {isQueen ? '전체 일정 관리' : '캘린더 조회'}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                      <span className={`font-medium ${
                        isQueen ? 'text-blue-800' : 'text-gray-800'
                      }`}>
                        {isQueen ? '신하 관리' : '상태 알림'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* 퀸 전용 또는 일반 사용자용 추가 카드 */}
                <div className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-green-500">
                  <div className="flex items-center space-x-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-xl">
                        {isQueen ? '📊' : '🎯'}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900">
                      {isQueen ? '왕실 통계' : '이용 가이드'}
                    </h3>
                  </div>
                  {isQueen ? (
                    <div className="space-y-4">
                      <div className="text-center p-4 bg-green-50 rounded-lg">
                        <div className="text-2xl font-bold text-green-600">📈</div>
                        <p className="text-sm text-green-700 mt-2">
                          신하들의 약속 요청을<br />실시간으로 관리하세요
                        </p>
                      </div>
                      <Link
                        href="/appointments"
                        className="block w-full py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors font-medium text-center"
                      >
                        📊 통계 보러가기
                      </Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="text-sm text-gray-800 space-y-2">
                        <p><strong>1단계:</strong> 캘린더에서 날짜 선택</p>
                        <p><strong>2단계:</strong> 약속 정보 입력</p>
                        <p><strong>3단계:</strong> 여왕 폐하의 승인 대기</p>
                        <p><strong>4단계:</strong> 확정된 약속 확인</p>
                      </div>
                      <Link
                        href="/appointments"
                        className="block w-full py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors font-medium text-center"
                      >
                        🚀 지금 시작하기
                      </Link>
                    </div>
                  )}
                </div>
              </div>

              {/* 퀸 전용 또는 일반 사용자용 CTA */}
              <div className="bg-white rounded-2xl shadow-2xl p-8 mt-16">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                  {isQueen ? '👑 왕실 업무 시작하기' : '🎯 약속 요청 가이드'}
                </h3>
                {isQueen ? (
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="text-center p-6 bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl">
                      <div className="text-4xl mb-4">⏳</div>
                      <h4 className="font-bold text-yellow-800 mb-2">대기 중인 요청</h4>
                      <p className="text-sm text-yellow-700">
                        신하들의 약속 요청을 확인하고 승인/거절하세요
                      </p>
                    </div>
                    <div className="text-center p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl">
                      <div className="text-4xl mb-4">📅</div>
                      <h4 className="font-bold text-green-800 mb-2">일정 관리</h4>
                      <p className="text-sm text-green-700">
                        왕실 캘린더에서 모든 일정을 한눈에 확인하세요
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="text-center p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl">
                      <div className="text-4xl mb-4">📝</div>
                      <h4 className="font-bold text-purple-800 mb-2">약속 요청</h4>
                      <p className="text-sm text-purple-700">
                        캘린더에서 원하는 날짜를 선택하여 약속을 요청하세요
                      </p>
                    </div>
                    <div className="text-center p-6 bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl">
                      <div className="text-4xl mb-4">✨</div>
                      <h4 className="font-bold text-pink-800 mb-2">승인 대기</h4>
                      <p className="text-sm text-pink-700">
                        여왕 폐하의 승인을 받아 확정된 약속을 확인하세요
                      </p>
                    </div>
                  </div>
                )}
                <div className="text-center mt-8">
                  <Link
                    href="/appointments"
                    className={`inline-block px-10 py-4 rounded-xl font-bold text-lg shadow-lg transform hover:scale-105 transition-all duration-300 ${
                      isQueen 
                        ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-white hover:from-yellow-500 hover:to-yellow-700' 
                        : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600'
                    }`}
                  >
                    {isQueen ? '👑 왕실 관리실 입장' : '📅 약속 요청하러 가기'}
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            // 로그인되지 않은 상태
            <div className="space-y-12">
              {/* 메인 히어로 섹션 */}
              <div className="space-y-6">
                <div className="text-8xl animate-bounce">👑</div>
                <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">
                  퀸과 약속잡기
                </h1>
                <p className="text-2xl text-gray-800 max-w-3xl mx-auto leading-relaxed">
                  여왕 폐하와의 특별한 만남을 예약하세요! ✨<br />
                  왕실 캘린더에서 원하는 날짜를 선택하고 약속을 요청할 수 있습니다.
                </p>
              </div>

              {/* 메인 액션 카드 */}
              <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-purple-600 rounded-3xl p-12 text-white shadow-2xl transform hover:scale-105 transition-all duration-300">
                <div className="text-6xl mb-6">🏰</div>
                <h2 className="text-4xl font-bold mb-6">왕궁에 입장하세요</h2>
                <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                  신분증을 발급받고 여왕 폐하에게 약속을 요청해보세요!<br />
                  특별한 왕실 경험이 여러분을 기다립니다.
                </p>
                <div className="flex flex-col sm:flex-row gap-6 justify-center">
                  <Link
                    href="/signup"
                    className="px-10 py-4 bg-white text-purple-600 rounded-xl hover:bg-gray-100 transition-all duration-300 font-bold text-lg shadow-lg transform hover:scale-105"
                  >
                    👑 신분증 발급받기
                  </Link>
                  <Link
                    href="/signin"
                    className="px-10 py-4 border-2 border-white text-white rounded-xl hover:bg-white hover:text-purple-600 transition-all duration-300 font-bold text-lg transform hover:scale-105"
                  >
                    🗝️ 궁전 입장하기
                  </Link>
                </div>
              </div>

              {/* 기능 소개 카드들 */}
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white rounded-2xl shadow-xl p-8 text-center border-t-4 border-purple-500 transform hover:scale-105 transition-all duration-300">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <span className="text-white text-2xl">📅</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">왕실 캘린더</h3>
                  <p className="text-gray-800 leading-relaxed">
                    아름다운 캘린더 인터페이스로 여왕 폐하와의 약속을 쉽게 예약하고 관리하세요
                  </p>
                </div>

                <div className="bg-white rounded-2xl shadow-xl p-8 text-center border-t-4 border-pink-500 transform hover:scale-105 transition-all duration-300">
                  <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <span className="text-white text-2xl">✨</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">왕실 승인 시스템</h3>
                  <p className="text-gray-800 leading-relaxed">
                    여왕 폐하의 직접적인 승인/거절로 특별하고 격식 있는 약속 관리 경험을 제공합니다
                  </p>
                </div>

                <div className="bg-white rounded-2xl shadow-xl p-8 text-center border-t-4 border-yellow-500 transform hover:scale-105 transition-all duration-300">
                  <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <span className="text-white text-2xl">👑</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">프리미엄 경험</h3>
                  <p className="text-gray-800 leading-relaxed">
                    실시간 알림과 상태 업데이트로 왕실 수준의 최고급 서비스를 경험해보세요
                  </p>
                </div>
              </div>

              {/* 추가 정보 섹션 */}
              <div className="bg-white rounded-2xl shadow-2xl p-12">
                <h3 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                  🎯 왕궁 이용 가이드
                </h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white font-bold text-xl">1</span>
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2">신분증 발급</h4>
                    <p className="text-sm text-gray-800">
                      왕궁에 입장하기 위한 신분증을 발급받으세요
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white font-bold text-xl">2</span>
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2">궁전 입장</h4>
                    <p className="text-sm text-gray-800">
                      발급받은 신분증으로 왕궁에 입장하세요
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white font-bold text-xl">3</span>
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2">약속 요청</h4>
                    <p className="text-sm text-gray-800">
                      캘린더에서 원하는 날짜를 선택하여 약속을 요청하세요
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="text-white font-bold text-xl">4</span>
                    </div>
                    <h4 className="font-bold text-gray-900 mb-2">만남 성사</h4>
                    <p className="text-sm text-gray-800">
                      여왕 폐하의 승인을 받아 특별한 만남을 가져보세요
                    </p>
                  </div>
                </div>
                <div className="text-center mt-10">
                  <Link
                    href="/signup"
                    className="inline-block px-12 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 font-bold text-lg shadow-lg transform hover:scale-105"
                  >
                    👑 지금 시작하기
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* 푸터 */}
      <footer className="bg-white border-t mt-20">
        <div className="max-w-6xl mx-auto px-4 py-12 text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">👑</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              퀸과 약속잡기
            </span>
          </div>
          <p className="text-gray-800 mb-4">
            여왕 폐하와의 특별한 만남, 프리미엄 약속 관리 서비스
          </p>
          <p className="text-sm text-gray-700">
            🏰 Royal Appointment System • Built with Next.js & Supabase ✨
          </p>
        </div>
      </footer>
    </div>
  )
}
