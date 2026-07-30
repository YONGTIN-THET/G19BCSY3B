import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

export const getGoogleAuthUrl = async () => {
  const response = await axios.get(`${API_URL}/google/oauth/redirect`);
  return response.data.url;
};

export const handleGoogleCallbackApi = async (code) => {
  const response = await axios.get(`${API_URL}/google/oauth/callback`, {
    params: { code }
  });
  return response.data;
};