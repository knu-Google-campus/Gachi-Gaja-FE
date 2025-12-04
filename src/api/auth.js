import apiClient from './client.js'

// 회원가입
export const registerUser = async (userData) => {
  const { data } = await apiClient.post('/users', userData)
  return data
}

// 로그인
export const loginUser = async (credentials) => {
  const { data } = await apiClient.post('/login', credentials)
  // 기대 응답: { userId, accessToken, message }
  if (data?.accessToken) {
    localStorage.setItem('accessToken', data.accessToken)
  }
  if (data?.userId) {
    localStorage.setItem('userId', data.userId)
  }
  return data
}

// 로그아웃
export const logoutUser = async () => {
  const { data } = await apiClient.post('/logout')
  // 토큰 및 세션 관련 로컬 스토리지 정리
  localStorage.removeItem('accessToken')
  localStorage.removeItem('token')
  localStorage.removeItem('userId')
  return data
}

// 사용자 삭제
export const deleteUser = async (userId) => {
  const { data } = await apiClient.delete('/users', { params: { userId } })
  return data
}