'use client'

import { useState, useEffect } from 'react'
import { getMonthlyAppointments } from '@/lib/appointments'

export default function Calendar({ user, onDateClick, onAppointmentClick }) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(false)

  const year = currentDate.getFullYear()
  const month = currentDate.getMonth() + 1

  useEffect(() => {
    if (user) {
      loadAppointments()
    }
  }, [user, currentDate])

  const loadAppointments = async () => {
    setLoading(true)
    try {
      console.log('약속 로딩 시도:', { userId: user.id, year, month })
      const { data, error } = await getMonthlyAppointments(user.id, year, month)
      
      if (error) {
        console.error('약속 로딩 실패:', error)
        console.error('에러 상세:', JSON.stringify(error, null, 2))
      } else {
        console.log('약속 로딩 성공:', data)
        setAppointments(data || [])
      }
    } catch (error) {
      console.error('약속 로딩 에러:', error)
      console.error('에러 메시지:', error.message)
      console.error('에러 스택:', error.stack)
    }
    setLoading(false)
  }

  // 캘린더 날짜 생성
  const getDaysInMonth = (year, month) => {
    return new Date(year, month, 0).getDate()
  }

  const getFirstDayOfMonth = (year, month) => {
    return new Date(year, month - 1, 1).getDay()
  }

  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(year, month)
    const firstDay = getFirstDayOfMonth(year, month)
    const days = []

    // 이전 달의 빈 날짜들
    for (let i = 0; i < firstDay; i++) {
      days.push(null)
    }

    // 현재 달의 날짜들
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day)
    }

    return days
  }

  // 특정 날짜의 약속들 가져오기
  const getAppointmentsForDate = (day) => {
    if (!day) return []
    
    const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`
    return appointments.filter(apt => apt.appointment_date === dateStr)
  }

  // 월 변경
  const changeMonth = (direction) => {
    const newDate = new Date(currentDate)
    newDate.setMonth(currentDate.getMonth() + direction)
    setCurrentDate(newDate)
  }

  // 오늘 날짜인지 확인
  const isToday = (day) => {
    const today = new Date()
    return day === today.getDate() && 
           month === today.getMonth() + 1 && 
           year === today.getFullYear()
  }

  // 상태별 색상
  const getStatusColor = (status) => {
    console.log('Status received:', status, 'Type:', typeof status) // 디버깅용
    
    switch (status) {
      case 'pending': 
      case '대기중':
        return 'bg-yellow-400 text-yellow-900'
      case 'approved': 
      case '승인됨':
        return 'bg-green-400 text-green-900'
      case 'rejected': 
      case '거절됨':
        return 'bg-red-400 text-red-100'
      case 'cancelled': 
      case 'canceled':  // 영어 철자 차이
      case '취소됨':
        return 'bg-gray-400 text-gray-900'
      default: 
        console.warn('Unknown status:', status) // 알 수 없는 상태 경고
        return 'bg-blue-400 text-blue-900'
    }
  }

  const monthNames = [
    '1월', '2월', '3월', '4월', '5월', '6월',
    '7월', '8월', '9월', '10월', '11월', '12월'
  ]

  const dayNames = ['일', '월', '화', '수', '목', '금', '토']

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      {/* 캘린더 헤더 */}
      <div className="flex items-center justify-between p-4 border-b">
        <button
          onClick={() => changeMonth(-1)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <h2 className="text-xl font-semibold text-gray-900">
          {year}년 {monthNames[month - 1]}
        </h2>
        
        <button
          onClick={() => changeMonth(1)}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* 요일 헤더 */}
      <div className="grid grid-cols-7 border-b">
        {dayNames.map((day, index) => (
          <div
            key={day}
            className={`p-3 text-center text-sm font-medium ${
              index === 0 ? 'text-red-600' : index === 6 ? 'text-blue-600' : 'text-gray-700'
            }`}
          >
            {day}
          </div>
        ))}
      </div>

      {/* 캘린더 날짜들 */}
      <div className="grid grid-cols-7">
        {generateCalendarDays().map((day, index) => {
          const dayAppointments = getAppointmentsForDate(day)
          const isCurrentDay = isToday(day)
          
          return (
            <div
              key={index}
              className={`min-h-[100px] p-2 border-r border-b hover:bg-gray-50 cursor-pointer transition-colors ${
                !day ? 'bg-gray-50' : ''
              }`}
              onClick={() => day && onDateClick && onDateClick(day, month, year)}
            >
              {day && (
                <>
                  {/* 날짜 */}
                  <div className={`text-sm font-medium mb-1 ${
                    isCurrentDay 
                      ? 'bg-blue-600 text-white w-6 h-6 rounded-full flex items-center justify-center'
                      : index % 7 === 0 
                        ? 'text-red-600' 
                        : index % 7 === 6 
                          ? 'text-blue-600' 
                          : 'text-gray-900'
                  }`}>
                    {day}
                  </div>
                  
                  {/* 약속들 */}
                  <div className="space-y-1">
                    {dayAppointments.slice(0, 3).map((appointment) => (
                      <div
                        key={appointment.id}
                        className={`text-xs px-2 py-1 rounded-sm cursor-pointer hover:opacity-80 ${getStatusColor(appointment.status)}`}
                        onClick={(e) => {
                          e.stopPropagation()
                          onAppointmentClick && onAppointmentClick(appointment)
                        }}
                        title={`${appointment.title} - ${appointment.appointment_time}`}
                      >
                        <div className="truncate">
                          {appointment.appointment_time.slice(0, 5)} {appointment.title}
                        </div>
                      </div>
                    ))}
                    
                    {/* 더 많은 약속이 있을 때 */}
                    {dayAppointments.length > 3 && (
                      <div className="text-xs text-gray-500 pl-2">
                        +{dayAppointments.length - 3}개 더
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          )
        })}
      </div>

      {/* 로딩 상태 */}
      {loading && (
        <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        </div>
      )}

      {/* 범례 */}
      <div className="p-4 border-t bg-gray-50">
        <div className="flex flex-wrap gap-4 text-xs">
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-yellow-400 rounded"></div>
            <span className="text-gray-800">대기중</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-green-400 rounded"></div>
            <span className="text-gray-800">승인됨</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-red-400 rounded"></div>
            <span className="text-gray-800">거절됨</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-3 h-3 bg-gray-400 rounded"></div>
            <span className="text-gray-800">취소됨</span>
          </div>
        </div>
      </div>
    </div>
  )
} 