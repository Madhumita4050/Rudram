import { API_BASE_URL } from '../config/api';

const API_URL = API_BASE_URL;

const getHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` })
  };
};

// User dashboard summary
export const getUserDashboardSummary = async () => {
  const res = await fetch(`${API_URL}/user/dashboard-summary`, {
    headers: getHeaders()
  });
  if (!res.ok) throw new Error('Failed to fetch dashboard summary');
  return res.json();
};

// Submit Contact or Grievance
export const submitContactMessage = async (data) => {
  const res = await fetch(`${API_URL}/user/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Failed to submit message');
  return res.json();
};
