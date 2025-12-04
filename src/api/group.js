import apiClient from './client.js'

// 여행 그룹 생성 API
export const createGroup = async (groupData) => {
  const { data } = await apiClient.post(`/groups`, groupData)
  return data
}

export const getMyGroups = async () => {
  const { data } = await apiClient.get('/groups')
  return data
}

export const getGroupDetail = async (groupId) => {
  const { data } = await apiClient.get(`/groups/${groupId}`)
  return data
}

export const deleteGroup = async (groupId) => {
  const { data } = await apiClient.delete(`/groups/${groupId}`)
  return data
}

export const updateGroup = async (groupId, payload) => {
  const { data } = await apiClient.put(`/groups/${groupId}`, payload)
  return data
}

export const getGroupMembers = async (groupId) => {
  const { data } = await apiClient.get(`/groups/${groupId}/members`)
  return data
}

export const addGroupMember = async (groupId, userId) => {
  const { data } = await apiClient.post(`/groups/${groupId}/members`, { userId })
  return data
}
