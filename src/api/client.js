import axios from 'axios'

// 기본 Axios 인스턴스
const useProxy = import.meta.env.VITE_USE_PROXY === 'true'
// 개발(vite)에서는 '/backend' 프록시, 배포(vercel functions)에서는 '/api' catch-all 사용
const devProxyPrefix = import.meta.env.VITE_PROXY_PREFIX || '/backend'
const prodProxyPrefix = '/api'
const envBase = import.meta.env.VITE_API_BASE_URL
const isAbsolute = typeof envBase === 'string' && /^https?:\/\//i.test(envBase)
let baseURL
if (useProxy) {
  // 프록시 사용: 개발과 배포에서 서로 다른 프록시 엔드포인트 사용
  const prefix = import.meta.env.DEV ? devProxyPrefix : prodProxyPrefix
  baseURL = prefix
} else {
  // 프록시 미사용: 절대 URL(또는 상대 '/api') 사용
  baseURL = envBase || '/api'
}
if (import.meta.env.DEV) {
  console.debug('[api] baseURL =', baseURL, '(useProxy:', useProxy + ')')
}
const apiClient = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 요청 인터셉터: 필요 시 공통 헤더(예: Authorization) 추가
apiClient.interceptors.request.use((config) => {
  // 로그인/회원가입 요청에는 인증/사용자 헤더를 붙이지 않음
  const urlPath = typeof config.url === 'string' ? config.url : ''
  const isAuthFree = /\/login$|\/register$|\/users$/.test(urlPath)

  const userId = localStorage.getItem('userId')
  if (!isAuthFree && userId && !config.headers['X-USER-ID']) {
    config.headers['X-USER-ID'] = userId
  }
  
  const lsAccess = localStorage.getItem('accessToken')
  const lsToken = localStorage.getItem('token')
  const token = lsAccess || lsToken
  const tokenSource = lsAccess ? 'localStorage:accessToken' : lsToken ? 'localStorage:token' : 'none'
  if (!isAuthFree && token) {
    // 기존 값이 있으면 덮어씀
    config.headers['Authorization'] = `Bearer ${token}`
    if (import.meta.env.DEV) {
      // lightweight debug to confirm source of token during development
      console.debug('[api] Authorization set from', tokenSource)
    }
  } else {
    // 토큰이 없으면 Authorization 헤더 제거
    if ('Authorization' in config.headers) delete config.headers['Authorization']
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