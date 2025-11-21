import apiClient from './client.js'

export const createRequirement = async (groupId, text) => {
  const { data } = await apiClient.post(`/groups/${groupId}/requirements`, { text })
  return data
}

export const getRequirements = async (groupId) => {
  const { data } = await apiClient.get(`/groups/${groupId}/requirements`)
  return data
}

export const updateRequirement = async (groupId, requirementId, text) => {
  const { data } = await apiClient.put(`/groups/${groupId}/requirements/${requirementId}`, { text })
  return data
}

export const deleteRequirement = async (groupId, requirementId) => {
  const { data } = await apiClient.delete(`/groups/${groupId}/requirements/${requirementId}`)
  return data
}