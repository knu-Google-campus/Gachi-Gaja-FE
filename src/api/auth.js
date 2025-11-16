import axios from "axios";

// 회원가입
export const registerUser = async (userData) => {
  const response = await axios.post("/api/users", userData);
  return response.data;
}

