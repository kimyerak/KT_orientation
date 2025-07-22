import { supabase } from './supabase'

// 회원가입
export const signUp = async (email, password) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  })
  return { data, error }
}

// 로그인
export const signIn = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  return { data, error }
}

// 로그아웃
export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  return { error }
}

// 현재 사용자 정보 가져오기
export const getUser = async () => {
  const { data: { user } } = await supabase.auth.getUser()
  return user
}

// 인증 상태 변화 감지
export const onAuthStateChange = (callback) => {
  return supabase.auth.onAuthStateChange(callback)
} 