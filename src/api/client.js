import axios from 'axios'

// 기본 Axios 인스턴스
const apiClient = axios.create({
  baseURL: '/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 요청 인터셉터: 필요 시 공통 헤더(예: Authorization) 추가
apiClient.interceptors.request.use((config) => {
  const userId = localStorage.getItem('userId')
  if (userId && !config.headers['X-USER-ID']) {
    config.headers['X-USER-ID'] = userId
  }
  return config
})

// 응답 인터셉터: 에러 메시지 정규화
apiClient.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response) {
      // 서버가 status 코드와 함께 응답한 경우
      return Promise.reject({
        status: error.response.status,
        message: error.response.data?.message || '요청 실패',
        data: error.response.data
      })
    }
    if (error.request) {
      // 요청은 전송됐지만 응답이 없는 경우(네트워크/타임아웃)
      return Promise.reject({ status: 0, message: '네트워크 오류 또는 타임아웃' })
    }
    return Promise.reject({ status: 0, message: error.message })
  }
)

export default apiClient