import { create } from 'apisauce';

const apiInstance = create({
  baseURL: 'http://localhost:6001/',
});

export const get = ({ url, params }) => apiInstance.get(url, params);
export const post = ({ url, body }) => apiInstance.post(url, body);
export const put = ({ url, body }) => apiInstance.put(url, body);
export const del = ({ url, params }) => apiInstance.delete(url, params);
export const patch = ({ url, body }) => apiInstance.patch(url, body);
