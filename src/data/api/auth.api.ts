import { apiClient } from "./apiConfig";

const siginWithIdAndPasswordAPI = (username: string, password: string) => {
  return apiClient.post("/auth/signin", {
    username,
    password,
  });
};

const signupAPI = ((data: {
  id: string,
  name: string,
  email: string,
  phone_number: string,
  role_id: string,
  position_id: string
}) => {
  return apiClient.post("/auth/signup", data);
})

export const authAPI = {
  siginWithIdAndPasswordAPI,
  signupAPI
};
