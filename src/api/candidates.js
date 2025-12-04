import apiClient from './client.js'

// 트리거: 후보 생성 요청 (바디 없음). 응답은 즉시 후보 목록이 아닌 식별자일 수 있음.
export const generateCandidates = async (groupId) => {
  // 후보 생성은 시간이 오래 걸릴 수 있으므로 타임아웃을 늘림
  const { data } = await apiClient.post(`/groups/${groupId}/candidates`, undefined, { timeout: 120000 })
  return data
}

// 생성된 후보 묶음 상세 조회: 후보 2개와 callCnt 등을 반환
export const getCandidatesDetail = async (groupId, candidateId) => {
  const { data } = await apiClient.get(`/groups/${groupId}/candidates/${candidateId}`)
  return data
}

export const getVoteSummary = async (groupId) => {
  const { data } = await apiClient.get(`/groups/${groupId}/candidates/votes`)
  return data
}

export const voteCandidatePlan = async (groupId, candidatePlanId) => {
  const { data } = await apiClient.post(`/groups/${groupId}/candidates/votes`, { candidatePlanId })
  return data
}