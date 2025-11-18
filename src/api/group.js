import axios from "axios";

// 여행 그룹 생성 API
export const createGroup = async (groupData) => {
  const leaderId = localStorage.getItem("userId");
  const response = await axios.post(`/api/groups?userId=${leaderId}`, groupData);
  return response.data;
};

// 여행 그룹 정보 조회 API
export const getGroupInfo = async (groupId) => {
  const response = await axios.get(`/api/groups/${groupId}`);
  return response.data;
};