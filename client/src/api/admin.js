import { API_BASE_URL } from '../config/api';

const API_URL = API_BASE_URL;

const getHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` })
  };
};

// 1. Dashboard Stats
export const getAdminStats = async () => {
  const res = await fetch(`${API_URL}/admin/stats`, {
    headers: getHeaders()
  });
  if (!res.ok) throw new Error('Failed to fetch admin stats');
  return res.json();
};

// 2. Registrations
export const getAdminRegistrations = async (params = {}) => {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`${API_URL}/admin/registrations?${query}`, {
    headers: getHeaders()
  });
  if (!res.ok) throw new Error('Failed to fetch registrations');
  return res.json();
};

export const getAdminRegistrationById = async (id) => {
  const res = await fetch(`${API_URL}/admin/registrations/${id}`, {
    headers: getHeaders()
  });
  if (!res.ok) throw new Error('Failed to fetch registration');
  return res.json();
};

export const updateAdminRegistrationStatus = async (id, paymentStatus) => {
  const res = await fetch(`${API_URL}/admin/registrations/${id}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify({ paymentStatus })
  });
  if (!res.ok) throw new Error('Failed to update registration status');
  return res.json();
};

export const deleteAdminRegistration = async (id) => {
  const res = await fetch(`${API_URL}/admin/registrations/${id}`, {
    method: 'DELETE',
    headers: getHeaders()
  });
  if (!res.ok) throw new Error('Failed to delete registration');
  return res.json();
};

// 3. Users Management
export const getAdminUsers = async (params = {}) => {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`${API_URL}/admin/users?${query}`, {
    headers: getHeaders()
  });
  if (!res.ok) throw new Error('Failed to fetch users');
  return res.json();
};

export const updateAdminUserRole = async (id, role) => {
  const res = await fetch(`${API_URL}/admin/users/${id}/role`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify({ role })
  });
  if (!res.ok) throw new Error('Failed to update user role');
  return res.json();
};

export const updateAdminUserStatus = async (id, status) => {
  const res = await fetch(`${API_URL}/admin/users/${id}/status`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify({ status })
  });
  if (!res.ok) throw new Error('Failed to update user status');
  return res.json();
};

export const updateAdminUserWallet = async (id, amount, action = 'credit') => {
  const res = await fetch(`${API_URL}/admin/users/${id}/wallet`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify({ amount, action })
  });
  if (!res.ok) throw new Error('Failed to update wallet');
  return res.json();
};

// 4. Service Requests / Transactions
export const getAdminRequests = async (params = {}) => {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`${API_URL}/admin/requests?${query}`, {
    headers: getHeaders()
  });
  if (!res.ok) throw new Error('Failed to fetch service requests');
  return res.json();
};

export const updateAdminRequestStatus = async (id, status) => {
  const res = await fetch(`${API_URL}/admin/requests/${id}/status`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify({ status })
  });
  if (!res.ok) throw new Error('Failed to update request status');
  return res.json();
};

// 5. Services Catalog
export const createAdminService = async (serviceData) => {
  const res = await fetch(`${API_URL}/admin/services`, {
    method: 'POST',
    headers: getHeaders(),
    body: JSON.stringify(serviceData)
  });
  if (!res.ok) throw new Error('Failed to create service');
  return res.json();
};

export const updateAdminService = async (id, serviceData) => {
  const res = await fetch(`${API_URL}/admin/services/${id}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(serviceData)
  });
  if (!res.ok) throw new Error('Failed to update service');
  return res.json();
};

export const deleteAdminService = async (id) => {
  const res = await fetch(`${API_URL}/admin/services/${id}`, {
    method: 'DELETE',
    headers: getHeaders()
  });
  if (!res.ok) throw new Error('Failed to delete service');
  return res.json();
};

// 6. Inquiries / Grievances
export const getAdminInquiries = async (params = {}) => {
  const query = new URLSearchParams(params).toString();
  const res = await fetch(`${API_URL}/admin/inquiries?${query}`, {
    headers: getHeaders()
  });
  if (!res.ok) throw new Error('Failed to fetch inquiries');
  return res.json();
};

export const updateAdminInquiryStatus = async (id, status, adminReply) => {
  const res = await fetch(`${API_URL}/admin/inquiries/${id}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify({ status, adminReply })
  });
  if (!res.ok) throw new Error('Failed to update inquiry status');
  return res.json();
};
