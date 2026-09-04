import { API_BASE_URL } from '../config/api';

const API_URL = API_BASE_URL;

const getHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

export const getHistory = async () => {
  try {
    const res = await fetch(`${API_URL}/services/requests/my`, {
      headers: getHeaders()
    });
    if (!res.ok) {
      if (res.status === 401) {
        return []; // Not logged in
      }
      throw new Error('Failed to fetch history');
    }
    const data = await res.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const addHistoryRequest = async (newRequest) => {
  return Promise.resolve(newRequest);
};
