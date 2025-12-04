import apiClient from './client.js'

export const acceptInvite = async (groupId) => {
  const { data } = await apiClient.post(`/invites/${groupId}`)
  return data
}
