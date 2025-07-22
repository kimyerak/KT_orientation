import { supabase } from './supabase'

// UUID 생성 함수
const generateUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0
    var v = c == 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

// 프로필 관련 함수들
export const createProfile = async (profileData) => {
  const profileWithId = {
    id: generateUUID(),
    ...profileData
  }
  
  const { data, error } = await supabase
    .from('profiles')
    .insert([profileWithId])
    .select()
  
  return { data, error }
}

export const getProfile = async (userId) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('user_id', userId)
    .single()
  
  return { data, error }
}

export const updateProfile = async (userId, updates) => {
  const { data, error } = await supabase
    .from('profiles')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('user_id', userId)
    .select()
  
  return { data, error }
}

// 약속 관련 함수들
export const createAppointment = async (appointmentData) => {
  const appointmentWithId = {
    id: generateUUID(),
    status: 'pending', // 기본값으로 pending 상태 설정
    ...appointmentData
  }
  
  const { data, error } = await supabase
    .from('appointments')
    .insert([appointmentWithId])
    .select()  // join 없이 기본 데이터만
  
  return { data, error }
}

export const getAppointments = async (userId, options = {}) => {
  let query = supabase
    .from('appointments')
    .select('*')  // join 없이 기본 데이터만
  
  // 현재 사용자가 퀸인지 확인
  const { data: { user } } = await supabase.auth.getUser()
  const isQueen = user?.email === 'yerak213@naver.com'
  
  if (isQueen) {
    // 퀸이면 모든 약속 조회
    // 별도 필터링 없음 (모든 약속이 퀸에게 오는 것)
  } else {
    // 일반 사용자는 자신이 요청한 약속만
    query = query.eq('requester_id', userId)
  }
  
  // 날짜 필터링
  if (options.startDate && options.endDate) {
    query = query
      .gte('appointment_date', options.startDate)
      .lte('appointment_date', options.endDate)
  }
  
  // 상태 필터링
  if (options.status) {
    query = query.eq('status', options.status)
  }
  
  query = query.order('appointment_date', { ascending: true })
  
  const { data, error } = await query
  return { data, error }
}

export const getMonthlyAppointments = async (userId, year, month) => {
  const startDate = `${year}-${String(month).padStart(2, '0')}-01`
  const endDate = `${year}-${String(month).padStart(2, '0')}-31`
  
  return getAppointments(userId, { startDate, endDate })
}

export const updateAppointmentStatus = async (appointmentId, status) => {
  // 퀸 권한 확인
  const { data: { user } } = await supabase.auth.getUser()
  if (!user || user.email !== 'yerak213@naver.com') {
    return { data: null, error: { message: '퀸만 약속 상태를 변경할 수 있습니다.' } }
  }

  const { data, error } = await supabase
    .from('appointments')
    .update({ 
      status,
      updated_at: new Date().toISOString() 
    })
    .eq('id', appointmentId)
    .select()  // join 없이 기본 데이터만
  
  return { data, error }
}

export const deleteAppointment = async (appointmentId, userId) => {
  const { data, error } = await supabase
    .from('appointments')
    .delete()
    .eq('id', appointmentId)
    .eq('requester_id', userId) // 요청자만 삭제 가능
  
  return { data, error }
}

// 대시보드 통계
export const getAppointmentStats = async (userId) => {
  // 현재 사용자가 퀸인지 확인
  const { data: { user } } = await supabase.auth.getUser()
  const isQueen = user?.email === 'yerak213@naver.com'
  
  if (isQueen) {
    // 퀸이면 모든 약속 통계
    const { data: pending } = await supabase
      .from('appointments')
      .select('id')
      .eq('status', 'pending')
    
    const { data: approved } = await supabase
      .from('appointments')
      .select('id')
      .eq('status', 'approved')
    
    const { data: total } = await supabase
      .from('appointments')
      .select('id')
    
    return {
      pending: pending?.length || 0,
      approved: approved?.length || 0,
      total: total?.length || 0
    }
  } else {
    // 일반 사용자는 자신의 약속만
    const { data: pending } = await supabase
      .from('appointments')
      .select('id')
      .eq('requester_id', userId)
      .eq('status', 'pending')
    
    const { data: approved } = await supabase
      .from('appointments')
      .select('id')
      .eq('requester_id', userId)
      .eq('status', 'approved')
    
    const { data: total } = await supabase
      .from('appointments')
      .select('id')
      .eq('requester_id', userId)
    
    return {
      pending: pending?.length || 0,
      approved: approved?.length || 0,
      total: total?.length || 0
    }
  }
} 