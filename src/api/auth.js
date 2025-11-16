import axios from "axios";

// 회원가입
export const registerUser = async (userData) => {
  const response = await axios.post("/api/users", userData);
  return response.data;
};

// 로그인
export const loginUser = async (credentails) => {
  const response = await axios.post("/api/login", credentails);
  return response.data;
};

// 로그아웃
export const logoutUser = async () => {
  const response = await axios.post("/api/logout");
  return response.data;
};

// 사용자 삭제
export const deleteUser = async () => {
  const response = await axios.delete("/api/users", {
    param: { userId: userId}
  });
  return response.data;
};