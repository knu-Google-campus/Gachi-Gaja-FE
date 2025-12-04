import apiClient from './client.js'

export const createRequirement = async (groupId, requirement) => {
  // requirement camelCase: { style?, schedule?, lodgingCriteria?, lodgingType?, mealBudget?, eatingHabit?, distance?, plusRequirement? }
  const payload = {
    style: requirement?.style || '',
    schedule: requirement?.schedule || '',
    lodgingCriteria: requirement?.lodgingCriteria || '',
    lodgingType: requirement?.lodgingType || '',
    mealBudget: requirement?.mealBudget || '',
    eatingHabit: requirement?.eatingHabit || '',
    distance: requirement?.distance || '',
    plusRequirement: requirement?.plusRequirement || '',
  }
  const { data } = await apiClient.post(`/groups/${groupId}/requirements`, payload)
  return data
}

export const getRequirements = async (groupId) => {
  const { data } = await apiClient.get(`/groups/${groupId}/requirements`)
  return data
}

export const updateRequirement = async (groupId, requirementId, requirement) => {
  const payload = {
    style: requirement?.style || '',
    schedule: requirement?.schedule || '',
    lodgingCriteria: requirement?.lodgingCriteria || '',
    lodgingType: requirement?.lodgingType || '',
    mealBudget: requirement?.mealBudget || '',
    eatingHabit: requirement?.eatingHabit || '',
    distance: requirement?.distance || '',
    plusRequirement: requirement?.plusRequirement || '',
  }
  const { data } = await apiClient.put(`/groups/${groupId}/requirements/${requirementId}`, payload)
  return data
}

export const deleteRequirement = async (groupId, requirementId) => {
  const { data } = await apiClient.delete(`/groups/${groupId}/requirements/${requirementId}`)
  return data
}