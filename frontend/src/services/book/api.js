import { api } from "@/services/api";

const baseUrl = '/books';

export const getBooks = async (author_name) => {
  try {
    console.log('Fetching books with author name:', author_name);
    const response = await api.get(baseUrl, { params: { author_name } });
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch books');
  }
};

export const getBookById = async (id) => {
  try {
    const response = await api.get(`${baseUrl}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to fetch book');
  }
};

export const createBook = async (book) => {
  try {
    const response = await api.post(baseUrl, book);
    return response.data;
  } catch (error) {
    throw new Error('Failed to create book');
  }
};

export const updateBook = async (id, book) => {
  try {
    const response = await api.put(`${baseUrl}/${id}`, book);
    return response.data;
  } catch (error) {
    throw new Error('Failed to update book');
  }
};

export const deleteBook = async (id) => {
  try {
    const response = await api.delete(`${baseUrl}/${id}`);
    return response.data;
  } catch (error) {
    throw new Error('Failed to delete book');
  }
};