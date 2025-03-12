import { api } from "@/services/api";

const baseUrl = '/authors';

export const getAuthors = async () => {
  try {
    const response = await api.get(baseUrl);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch authors');
  }
};
