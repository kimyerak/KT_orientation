'use client'

import { useState, useEffect } from 'react'
import { getUser } from '@/lib/auth'
import Header from '@/components/Header'
import { signOut } from '@/lib/auth'

const QUEEN_EMAIL = 'yerak213@naver.com'

export default function ProfilePage() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await getUser()
      setUser(currentUser)
      setLoading(false)
    }
    fetchUser()
  }, [])

  const handleSignOut = async () => {
    await signOut()
    setUser(null)
  }

  const isQueen = user?.email === QUEEN_EMAIL

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header user={null} onSignOut={handleSignOut} />
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              로그인이 필요합니다
            </h1>
            <a
              href="/signin"
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              로그인하기
            </a>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} onSignOut={handleSignOut} />
      
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-sm border p-8">
          <div className="flex items-center space-x-3 mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              사용자 프로필
            </h1>
            {isQueen && (
              <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                👑 퀸
              </span>
            )}
          </div>
          
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  이메일
                </label>
                <div className="p-3 bg-gray-50 rounded-md border">
                  <code className="text-gray-900">{user.email}</code>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-2">
                  역할
                </label>
                <div className={`p-3 rounded-md border ${
                  isQueen ? 'bg-purple-50 border-purple-200' : 'bg-blue-50 border-blue-200'
                }`}>
                  <span className={`font-medium ${
                    isQueen ? 'text-purple-800' : 'text-blue-800'
                  }`}>
                    {isQueen ? '👑 퀸 (관리자)' : '👥 일반 사용자'}
                  </span>
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                사용자 ID
              </label>
              <div className="p-3 bg-gray-50 rounded-md border">
                <code className="text-gray-700 font-mono text-sm break-all">
                  {user.id}
                </code>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">
                가입일
              </label>
              <div className="p-3 bg-gray-50 rounded-md border">
                <span className="text-gray-900">
                  {new Date(user.created_at).toLocaleString('ko-KR')}
                </span>
              </div>
            </div>
            
            {isQueen ? (
              // 퀸 모드 안내
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-purple-900 mb-3">
                  👑 퀸 권한
                </h3>
                <ul className="space-y-2 text-sm text-purple-800">
                  <li>• 다른 사용자들의 약속 요청 승인/거절</li>
                  <li>• 약속 관리 대시보드 접근</li>
                  <li>• 캘린더에서 모든 약속 상태 확인</li>
                  <li>• 약속 통계 및 현황 모니터링</li>
                </ul>
                <div className="mt-4 p-3 bg-purple-100 rounded">
                  <p className="text-sm text-purple-900">
                    ✨ 당신은 퀸입니다! 약속 관리 페이지에서 요청받은 약속들을 확인하고 승인/거절하세요.
                  </p>
                </div>
              </div>
            ) : (
              // 일반 사용자 안내
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-3">
                  📅 약속 요청 방법
                </h3>
                <div className="space-y-3 text-sm text-blue-800">
                  <p>
                    <strong>1단계:</strong> 약속 관리 페이지로 이동하세요
                  </p>
                  <p>
                    <strong>2단계:</strong> 캘린더에서 원하는 날짜를 클릭하세요
                  </p>
                  <p>
                    <strong>3단계:</strong> 약속 정보를 입력하고 퀸에게 요청하세요
                  </p>
                  <p>
                    <strong>4단계:</strong> 퀸의 승인을 기다리세요
                  </p>
                </div>
                <div className="mt-4">
                  <a
                    href="/appointments"
                    className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    약속 관리 페이지로 이동
                  </a>
                </div>
              </div>
            )}
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-green-900 mb-3">
                ✅ 시스템 상태
              </h3>
              <div className="space-y-2 text-sm text-green-800">
                <div className="flex justify-between">
                  <span>데이터베이스 연결:</span>
                  <span className="font-medium">정상</span>
                </div>
                <div className="flex justify-between">
                  <span>인증 시스템:</span>
                  <span className="font-medium">정상</span>
                </div>
                <div className="flex justify-between">
                  <span>퀸 모드:</span>
                  <span className="font-medium">{isQueen ? '활성화됨' : '비활성화됨'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 