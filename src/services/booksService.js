import AxiosConfig from "../axiosConfig";

const RESOURCE = "/api/books";

export async function getBooks() {
  const response = await AxiosConfig.get(RESOURCE);
  return response.data;
}

export async function getOneBook(id) {
  const response = await AxiosConfig.get(`${RESOURCE}/${id}`);
  return response.data;
}

export async function createBook(book) {
  const response = await AxiosConfig.post(RESOURCE, book);
  return response.data;
}

export async function updateBook(id, book) {
  const response = await AxiosConfig.put(`${RESOURCE}/${id}`, book);
  return response.data;
}

export async function deleteBook(id) {
  const response = await AxiosConfig.delete(`${RESOURCE}/${id}`);
  return response.data;
}
