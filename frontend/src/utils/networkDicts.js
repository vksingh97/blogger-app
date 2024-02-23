import { create } from 'apisauce';

const apiInstance = create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

export const get = ({ url, params }) => apiInstance.get(url, params);
export const post = ({ url, body }) => apiInstance.post(url, body);
export const put = ({ url, body }) => apiInstance.put(url, body);
export const del = ({ url, params }) => apiInstance.delete(url, params);
export const patch = ({ url, body }) => apiInstance.patch(url, body);
