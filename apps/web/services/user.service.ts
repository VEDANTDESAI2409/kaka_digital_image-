import { api } from "./api";

export const userService = {
  async getMe() {
    const response = await api.get("/users/me");

    // ResponseInterceptor wraps everything in { success, message, timestamp, data }
    return response.data.data;
  },
};