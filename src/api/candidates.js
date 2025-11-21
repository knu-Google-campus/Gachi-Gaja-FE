import apiClient from './client.js'

export const generateCandidates = async (groupId) => {
  const { data } = await apiClient.post(`/groups/${groupId}/candidates`)
  return data
}

export const getVoteSummary = async (groupId, userId = localStorage.getItem('userId')) => {
  const { data } = await apiClient.get(`/groups/${groupId}/candidates/votes`, { params: { userId } })
  return data
}

export const voteCandidatePlan = async (groupId, candidatePlanId, userId = localStorage.getItem('userId')) => {
  const { data } = await apiClient.post(`/groups/${groupId}/candidates/votes`, { candidatePlanId }, { params: { userId } })
  return data
}