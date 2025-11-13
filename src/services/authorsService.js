import AxiosConfig from "../axiosConfig";

const RESOURCE = "/api/authors";

export async function getAuthors(page, pageSize) {
  const response = await AxiosConfig.get(
    `${RESOURCE}?page=${page}&pageSize=${pageSize}`
  );
  return response.data;
}

export async function getOneAuthor(id) {
  const response = await AxiosConfig.get(`${RESOURCE}/${id}`);
  return response.data;
}

export async function createAuthor(author) {
  const response = await AxiosConfig.post(RESOURCE, author);
  return response.data;
}

export async function updateAuthor(author) {
  const response = await AxiosConfig.put(`${RESOURCE}/${author.id}`, author);
  return response.data;
}

export async function deleteAuthor(id) {
  const response = await AxiosConfig.delete(`${RESOURCE}/${id}`);
  return response.data;
}
