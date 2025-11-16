import axios from "axios";

// 여행 그룹 생성 API
export const createGroup = async (groupData) => {
  const leaderId = localStorage.getItem("userId");
  const response = await axios.post(`/api/groups?userId=${leaderId}`, groupData);
  return response.data;
};