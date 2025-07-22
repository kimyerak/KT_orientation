'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { getUser, onAuthStateChange } from '@/lib/auth'
import Header from '@/components/Header'
import { signOut } from '@/lib/auth'

// 퀸의 이메일 주소
const QUEEN_EMAIL = 'yerak213@naver.com'

export default function HomePage() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    initializeUser()
    
    const { data: { subscription } } = onAuthStateChange((event, session) => {
      if (session?.user) {
        setUser(session.user)
      } else {
        setUser(null)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const initializeUser = async () => {
    const currentUser = await getUser()
    setUser(currentUser)
    setLoading(false)
  }

  const handleSignOut = async () => {
    await signOut()
    setUser(null)
  }

  // 퀸인지 확인
  const isQueen = user?.email === QUEEN_EMAIL

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} onSignOut={handleSignOut} />
      
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center space-y-8">
          
          {user ? (
            // 로그인된 상태
            <div className="space-y-8">
              {/* 환영 메시지 */}
              <div className="space-y-4">
                <div className="text-6xl">
                  {isQueen ? '👑' : '👋'}
                </div>
                <h1 className="text-4xl font-bold text-gray-900">
                  {isQueen ? '여왕 폐하 환영합니다!' : '안녕하세요!'}
                </h1>
                <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                  {isQueen 
                    ? '약속 요청을 확인하고 관리하세요.' 
                    : '여왕에게 약속을 요청해보세요.'
                  }
                </p>
              </div>

              {/* 메인 액션 */}
              <div className="bg-white rounded-lg shadow-md p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  {isQueen ? '약속 관리' : '약속 요청'}
                </h2>
                <p className="text-gray-600 mb-6">
                  {isQueen 
                    ? '신청된 약속 요청들을 확인하고 승인/거절하세요.' 
                    : '원하는 날짜에 여왕과의 약속을 요청하세요.'
                  }
                </p>
                <Link
                  href="/appointments"
                  className="inline-block px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
                >
                  {isQueen ? '약속 관리하기' : '약속 요청하기'}
                </Link>
              </div>
            </div>
          ) : (
            // 로그인되지 않은 상태
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="text-6xl">👑</div>
                <h1 className="text-4xl font-bold text-gray-900">
                  퀸과 약속잡기
                </h1>
                <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                  여왕과의 약속을 잡을 수 있는 시스템입니다.<br/>
                  로그인하여 서비스를 이용해보세요.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/signin"
                  className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors font-medium"
                >
                  로그인
                </Link>
                <Link
                  href="/signup"
                  className="px-6 py-3 border border-purple-600 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors font-medium"
                >
                  회원가입
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
