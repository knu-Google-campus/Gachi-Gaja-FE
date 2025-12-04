import client from './client'

export async function confirmPlans(groupId) {
  // 최종 확정은 서버 계산 시간이 길 수 있어 타임아웃을 늘림
  const { data } = await client.post(`/groups/${groupId}/plans`, undefined, { timeout: 120000 })
  return data
}

export async function getFinalPlans(groupId) {
  const { data } = await client.get(`/groups/${groupId}/plans`)
  return data
}

export async function updatePlan(groupId, planId, body) {
  const { data } = await client.put(`/groups/${groupId}/plans/${planId}`, body)
  return data
}

export async function addNewPlan(groupId, body) {
  const { data } = await client.post(`/groups/${groupId}/new-plans`, body)
  return data
}

export async function deletePlan(groupId, planId) {
  const { data } = await client.delete(`/groups/${groupId}/plans/${planId}`)
  return data
}
