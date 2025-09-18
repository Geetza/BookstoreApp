import AxiosConfig from "../axiosConfig";

const RESOURCE = "/api/publishers";

export async function getPublishers() {
  const response = await AxiosConfig.get(RESOURCE);
  return response.data;
}

export async function getOnePublisher(id) {
  const response = await AxiosConfig.get(`${RESOURCE}/${id}`);
  return response.data;
}

export async function createPublisher(publisher) {
  const response = await AxiosConfig.post(RESOURCE, publisher);
  return response.data;
}

export async function updatePublisher(id, publisher) {
  const response = await AxiosConfig.put(`${RESOURCE}/${id}`, publisher);
  return response.data;
}

export async function deletePublisher(id) {
  const response = await AxiosConfig.delete(`${RESOURCE}/${id}`);
  return response.data;
}
