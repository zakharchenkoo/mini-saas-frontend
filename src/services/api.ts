import axios from 'axios';

const KEYCLOAK_URL = 'http://localhost:8088/realms/mini-saas/protocol/openid-connect/token';
const CLIENT_ID = 'mini-saas-api';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Function to get a token
export const login = async (username: string, password: string) => {
  const params = new URLSearchParams();
  params.append('grant_type', 'password');
  params.append('client_id', CLIENT_ID);
  params.append('username', username);
  params.append('password', password);

  const response = await axios.post(KEYCLOAK_URL, params, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  });

  const { access_token } = response.data;
  localStorage.setItem('token', access_token);
  return access_token;
};

// Interceptor for adding a token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
