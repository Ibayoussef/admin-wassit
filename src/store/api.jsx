import axios from 'axios';

const client = axios.create({
  // baseURL: 'https://www.wassit.biz/api/',
  baseURL: 'http://localhost:4000/api/',
});

export const fetchAxios = async (
  endpoint,
  method,
  payload,
  token
) => {
  if (token) {
    client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
  const config = {
    url: endpoint,
    method: method,
    data: payload,
  };

  const response = await client.request(config);
  return response.data;

};
