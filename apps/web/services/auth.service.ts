import { api } from "./api";

export interface LoginDto {
  email: string;
  password: string;
}

export const authService = {
  async login(data: LoginDto) {
    const response = await api.post("/auth/login", data);

    return response.data.data;
  },
};