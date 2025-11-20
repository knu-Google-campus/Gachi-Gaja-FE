import apiClient from './client.js'

// 회원가입
export const registerUser = async (userData) => {
  const { data } = await apiClient.post('/users', userData)
  return data
}

// 로그인
export const loginUser = async (credentials) => {
  const { data } = await apiClient.post('/login', credentials)
  return data
}

// 로그아웃
export const logoutUser = async () => {
  const { data } = await apiClient.post('/logout')
  return data
}

// 사용자 삭제
export const deleteUser = async (userId) => {
  const { data } = await apiClient.delete('/users', { params: { userId } })
  return data
}