import axios from "axios";
import {
  Client,
  CreateClientDto,
  UpdateClientDto,
} from "@/types/client";

const API_URL = "http://localhost:3001/api/clients";

export const clientService = {

  async getAll() {
    const { data } = await axios.get(API_URL);

    return data;
  },

  async getById(id: string) {
    const { data } = await axios.get(
      `${API_URL}/${id}`
    );

    return data;
  },

  async create(dto: CreateClientDto) {
    const { data } = await axios.post(
      API_URL,
      dto
    );

    return data;
  },

  async update(
    id: string,
    dto: UpdateClientDto,
  ) {
    const { data } = await axios.patch(
      `${API_URL}/${id}`,
      dto
    );

    return data;
  },

  async delete(id: string) {
    const { data } = await axios.delete(
      `${API_URL}/${id}`
    );

    return data;
  },
};