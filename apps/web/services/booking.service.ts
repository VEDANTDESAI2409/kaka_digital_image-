import { api } from "./api";

export const bookingService = {
  async getAll(params?: Record<string, any>) {
    const { data } = await api.get("/bookings", {
      params,
    });

    return data.data;
  },

  async getById(id: string) {
    const { data } = await api.get(`/bookings/${id}`);

    return data.data;
  },

  async create(dto: any) {
    const { data } = await api.post("/bookings", dto);

    return data.data;
  },

  async update(id: string, dto: any) {
    const { data } = await api.patch(`/bookings/${id}`, dto);

    return data.data;
  },

  async delete(id: string) {
    const { data } = await api.delete(`/bookings/${id}`);

    return data.data;
  },
};