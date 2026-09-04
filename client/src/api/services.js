import { services as localServices } from '../data/services';
import { API_BASE_URL } from '../config/api';

const API_URL = API_BASE_URL;

const getHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

export const getServices = async () => {
  try {
    const res = await fetch(`${API_URL}/services`);
    if (!res.ok) throw new Error('Failed to fetch services');
    const data = await res.json();
    return Array.isArray(data) && data.length > 0 ? data : localServices;
  } catch (error) {
    console.warn('API unavailable or returned empty, using local services data:', error);
    return localServices;
  }
};

export const getServiceById = async (id) => {
  try {
    const res = await fetch(`${API_URL}/services/details/${id}`);
    if (!res.ok) throw new Error('Failed to fetch service');
    const data = await res.json();
    return data || localServices.find(s => s.id === id) || null;
  } catch (error) {
    console.warn('API error, falling back to local service details:', error);
    return localServices.find(s => s.id === id) || null;
  }
};

export const submitServiceRequest = async (requestData) => {
  try {
    const res = await fetch(`${API_URL}/services/request`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(requestData)
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.message || 'Failed to submit request');
    }
    return await res.json();
  } catch (error) {
    console.error(error);
    throw error;
  }
};
