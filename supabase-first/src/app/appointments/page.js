'use client'

import { useState, useEffect } from 'react'
import { getUser, onAuthStateChange } from '@/lib/auth'
import { 
  createAppointment, 
  updateAppointmentStatus, 
  getProfile, 
  createProfile,
  getAppointmentStats
} from '@/lib/appointments'
import Calendar from '@/components/Calendar'
import Header from '@/components/Header'
import { signOut } from '@/lib/auth'

// 퀸의 이메일 주소
const QUEEN_EMAIL = 'yerak213@naver.com'

export default function AppointmentsPage() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [profile, setProfile] = useState(null)
  const [stats, setStats] = useState({ pending: 0, approved: 0, total: 0 })
  
  // 모달 상태
  const [showNewAppointment, setShowNewAppointment] = useState(false)
  const [showAppointmentDetail, setShowAppointmentDetail] = useState(false)
  const [selectedAppointment, setSelectedAppointment] = useState(null)
  const [selectedDate, setSelectedDate] = useState(null)

  // 폼 상태
  const [newAppointmentForm, setNewAppointmentForm] = useState({
    title: '',
    description: '',
    location: '',
    appointment_time: '14:00'
  })

  useEffect(() => {
    initializeUser()
    
    const { data: { subscription } } = onAuthStateChange((event, session) => {
      if (session?.user) {
        setUser(session.user)
        loadUserData(session.user)
      } else {
        setUser(null)
        setProfile(null)
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const initializeUser = async () => {
    const currentUser = await getUser()
    if (currentUser) {
      setUser(currentUser)
      await loadUserData(currentUser)
    }
    setLoading(false)
  }

  const loadUserData = async (user) => {
    try {
      // 프로필 로드
      const { data: profileData, error: profileError } = await getProfile(user.id)
      
      if (profileError && profileError.code === 'PGRST116') {
        // 프로필이 없으면 생성
        const profileToCreate = {
          user_id: user.id,
          display_name: user.email === QUEEN_EMAIL ? 'Queen' : user.email.split('@')[0],
          is_available: user.email === QUEEN_EMAIL,
          bio: user.email === QUEEN_EMAIL ? 'The Queen - 약속 요청을 받습니다' : ''
        }
        
        const { data: newProfile } = await createProfile(profileToCreate)
        setProfile(newProfile?.[0])
      } else {
        setProfile(profileData)
      }

      // 통계 로드
      const statsData = await getAppointmentStats(user.id)
      setStats(statsData)
    } catch (error) {
      console.error('사용자 데이터 로딩 실패:', error)
    }
  }

  const handleSignOut = async () => {
    await signOut()
    setUser(null)
    setProfile(null)
  }

  const handleDateClick = (day, month, year) => {
    const date = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    setSelectedDate(date)
    setNewAppointmentForm({
      title: '',
      description: '',
      location: '',
      appointment_time: '14:00'
    })
    setShowNewAppointment(true)
  }

  const handleAppointmentClick = (appointment) => {
    setSelectedAppointment(appointment)
    setShowAppointmentDetail(true)
  }

  const handleCreateAppointment = async (e) => {
    e.preventDefault()
    
    if (!selectedDate || !newAppointmentForm.title) {
      alert('필수 정보를 모두 입력해주세요.')
      return
    }

    try {
      // 간단하게! 모든 약속은 퀸에게 가는 것
      const appointmentData = {
        requester_id: user.id,
        appointment_date: selectedDate,
        appointment_time: newAppointmentForm.appointment_time,
        title: newAppointmentForm.title,
        description: newAppointmentForm.description,
        location: newAppointmentForm.location
      }

      console.log('약속 생성 데이터:', appointmentData)

      const { data, error } = await createAppointment(appointmentData)
      
      if (error) {
        console.error('약속 생성 오류:', error)
        alert('약속 생성 실패: ' + error.message)
      } else {
        alert('퀸에게 약속 요청이 성공적으로 전송되었습니다!')
        setShowNewAppointment(false)
        window.location.reload()
      }
    } catch (error) {
      console.error('약속 생성 에러:', error)
      alert('약속 생성 중 오류가 발생했습니다.')
    }
  }

  const handleUpdateAppointmentStatus = async (status) => {
    if (!selectedAppointment) return

    try {
      const { data, error } = await updateAppointmentStatus(
        selectedAppointment.id, 
        status
      )
      
      if (error) {
        console.error('상태 업데이트 오류:', error)
        alert('상태 업데이트 실패: ' + error.message)
      } else {
        alert(`약속이 ${status === 'approved' ? '승인' : '거절'}되었습니다.`)
        setShowAppointmentDetail(false)
        window.location.reload()
      }
    } catch (error) {
      console.error('상태 업데이트 에러:', error)
      alert('상태 업데이트 중 오류가 발생했습니다.')
    }
  }

  // 퀸인지 확인 (이메일 기반)
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
            <p className="text-gray-800 mb-8">
              퀸이랑 약속잡기 서비스를 이용하려면 로그인해주세요.
            </p>
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
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* 페이지 헤더 */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <h1 className="text-3xl font-bold text-gray-900">
              퀸이랑 약속잡기 📅
            </h1>
            {isQueen && (
              <span className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                👑 퀸
              </span>
            )}
          </div>
          <p className="text-gray-800">
            {isQueen 
              ? '약속 요청을 확인하고 승인/거절하세요.' 
              : '캘린더에서 날짜를 클릭해 퀸에게 약속을 요청하세요.'
            }
          </p>
        </div>

        {/* 통계 카드들 */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-800">
                  {isQueen ? '승인 대기중' : '내 요청 대기중'}
                </p>
                <p className="text-2xl font-bold text-gray-900">{stats.pending}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-800">승인된 약속</p>
                <p className="text-2xl font-bold text-gray-900">{stats.approved}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4" />
                </svg>
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-800">전체 약속</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </div>
        </div>

        {/* 캘린더 */}
        <div className="mb-8">
          <Calendar 
            user={user}
            onDateClick={!isQueen ? handleDateClick : undefined}
            onAppointmentClick={handleAppointmentClick}
          />
        </div>

        {/* 안내 메시지 */}
        <div className="bg-white rounded-lg shadow-sm border p-6">
          {isQueen ? (
            <div className="text-center">
              <h3 className="text-lg font-semibold text-purple-900 mb-2">
                👑 퀸 관리자 모드
              </h3>
              <p className="text-gray-800">
                사용자들의 약속 요청을 확인하고 승인/거절할 수 있습니다.
                캘린더에서 약속을 클릭하여 상세 정보를 확인하세요.
              </p>
            </div>
          ) : (
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                퀸에게 약속 요청하기
              </h3>
              <p className="text-gray-800">
                캘린더에서 원하는 날짜를 클릭하여 퀸에게 약속을 요청할 수 있습니다.
                요청된 약속은 퀸의 승인을 받아야 확정됩니다.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* 새 약속 생성 모달 (퀸이 아닐 때만) */}
      {showNewAppointment && !isQueen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              퀸에게 약속 요청
            </h3>
            <form onSubmit={handleCreateAppointment} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-1">
                  날짜
                </label>
                <input
                  type="text"
                  value={selectedDate}
                  readOnly
                  className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-800 mb-1">
                  시간
                </label>
                <input
                  type="time"
                  value={newAppointmentForm.appointment_time}
                  onChange={(e) => setNewAppointmentForm({
                    ...newAppointmentForm,
                    appointment_time: e.target.value
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-800 mb-1">
                  약속 제목
                </label>
                <input
                  type="text"
                  value={newAppointmentForm.title}
                  onChange={(e) => setNewAppointmentForm({
                    ...newAppointmentForm,
                    title: e.target.value
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="예: 커피 한잔 하며 이야기하기"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-800 mb-1">
                  설명
                </label>
                <textarea
                  value={newAppointmentForm.description}
                  onChange={(e) => setNewAppointmentForm({
                    ...newAppointmentForm,
                    description: e.target.value
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  rows="3"
                  placeholder="약속에 대한 자세한 설명을 입력하세요"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-800 mb-1">
                  장소
                </label>
                <input
                  type="text"
                  value={newAppointmentForm.location}
                  onChange={(e) => setNewAppointmentForm({
                    ...newAppointmentForm,
                    location: e.target.value
                  })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                  placeholder="예: 강남역 스타벅스"
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowNewAppointment(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-800 rounded-md hover:bg-gray-50"
                >
                  취소
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  약속 요청
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 약속 상세보기 모달 */}
      {showAppointmentDetail && selectedAppointment && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              약속 상세보기
            </h3>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-800">제목</p>
                <p className="text-gray-900">{selectedAppointment.title}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-800">날짜 및 시간</p>
                <p className="text-gray-900">
                  {selectedAppointment.appointment_date} {selectedAppointment.appointment_time}
                </p>
              </div>
              
              <div>
                <p className="text-sm font-medium text-gray-800">요청자</p>
                <p className="text-gray-900">
                  {selectedAppointment.requester?.display_name || `사용자 (${selectedAppointment.requester_id?.slice(0, 8)}...)`}
                </p>
              </div>
              
              {selectedAppointment.description && (
                <div>
                  <p className="text-sm font-medium text-gray-800">설명</p>
                  <p className="text-gray-900">{selectedAppointment.description}</p>
                </div>
              )}
              
              {selectedAppointment.location && (
                <div>
                  <p className="text-sm font-medium text-gray-800">장소</p>
                  <p className="text-gray-900">{selectedAppointment.location}</p>
                </div>
              )}
              
              <div>
                <p className="text-sm font-medium text-gray-800">상태</p>
                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                  selectedAppointment.status === 'pending' ? 'bg-yellow-400 text-yellow-900' :
                  selectedAppointment.status === 'approved' ? 'bg-green-400 text-green-900' :
                  selectedAppointment.status === 'rejected' ? 'bg-red-400 text-red-100' :
                  'bg-gray-400 text-gray-900'
                }`}>
                  {selectedAppointment.status === 'pending' ? '대기중' :
                   selectedAppointment.status === 'approved' ? '승인됨' :
                   selectedAppointment.status === 'rejected' ? '거절됨' : '취소됨'}
                </span>
              </div>
            </div>

            <div className="flex space-x-3 pt-6">
              <button
                onClick={() => setShowAppointmentDetail(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-800 rounded-md hover:bg-gray-50"
              >
                닫기
              </button>
              
              {/* 퀸만 상태 변경 가능 - 모든 상태에서 변경 가능 */}
              {isQueen && (
                <>
                  <button
                    onClick={() => handleUpdateAppointmentStatus('rejected')}
                    className={`flex-1 px-4 py-2 rounded-md transition-colors ${
                      selectedAppointment.status === 'rejected' 
                        ? 'bg-red-400 text-red-100 cursor-default' 
                        : 'bg-red-600 text-white hover:bg-red-700'
                    }`}
                    disabled={selectedAppointment.status === 'rejected'}
                  >
                    {selectedAppointment.status === 'rejected' ? '✓ 거절됨' : '거절'}
                  </button>
                  <button
                    onClick={() => handleUpdateAppointmentStatus('approved')}
                    className={`flex-1 px-4 py-2 rounded-md transition-colors ${
                      selectedAppointment.status === 'approved' 
                        ? 'bg-green-400 text-green-100 cursor-default' 
                        : 'bg-green-600 text-white hover:bg-green-700'
                    }`}
                    disabled={selectedAppointment.status === 'approved'}
                  >
                    {selectedAppointment.status === 'approved' ? '✓ 승인됨' : '승인'}
                  </button>
                  {(selectedAppointment.status === 'approved' || selectedAppointment.status === 'rejected') && (
                    <button
                      onClick={() => handleUpdateAppointmentStatus('pending')}
                      className="flex-1 px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700"
                    >
                      대기중으로 변경
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 