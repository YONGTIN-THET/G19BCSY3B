import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

// ១. ទាញយក Google Auth URL ពី Laravel Backend
export const getGoogleAuthUrl = async () => {
  const response = await axios.get(`${API_URL}/google/oauth/redirect`);
  return response.data.url;
};

// ២. ផ្ញើ Code ដែលបានពី Google ទៅឱ្យ Laravel ដើម្បីទាញយក User Data & Token
export const handleGoogleCallbackApi = async (code) => {
  const response = await axios.get(`${API_URL}/google/oauth/callback`, {
    params: { code }
  });
  return response.data;
};