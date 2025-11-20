import apiClient from './client.js'

// 여행 그룹 생성 API
export const createGroup = async (groupData) => {
  const leaderId = localStorage.getItem('userId')
  const { data } = await apiClient.post(`/groups`, groupData, { params: { userId: leaderId } })
  return data
}

export const getMyGroups = async () => {
  const userId = localStorage.getItem('userId')
  const { data } = await apiClient.get('/groups', { params: { userId } })
  return data
}

export const getGroupDetail = async (groupId, userId = localStorage.getItem('userId')) => {
  const { data } = await apiClient.get(`/groups/${groupId}`, { params: { userId } })
  return data
}

export const deleteGroup = async (groupId, userId = localStorage.getItem('userId')) => {
  const { data } = await apiClient.delete(`/groups/${groupId}`, { params: { userId } })
  return data
}

export const updateGroup = async (groupId, payload, userId = localStorage.getItem('userId')) => {
  const { data } = await apiClient.put(`/groups/${groupId}`, payload, { params: { userId } })
  return data
}

export const getGroupMembers = async (groupId) => {
  const { data } = await apiClient.get(`/groups/${groupId}/members`)
  return data
}

export const addGroupMember = async (groupId, userId) => {
  const { data } = await apiClient.post(`/groups/${groupId}/members`, null, { params: { userId } })
  return data
}