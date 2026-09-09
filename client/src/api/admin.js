import { API_BASE_URL } from '../config/api';

const API_URL = API_BASE_URL;

const getHeaders = (isFormData = false) => {
  const token = localStorage.getItem('token');
  const headers = {};
  if (!isFormData) {
    headers['Content-Type'] = 'application/json';
  }
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
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

export const updateAdminRegistrationStatus = async (id, data) => {
  const payload = typeof data === 'string' ? { paymentStatus: data } : data;
  const res = await fetch(`${API_URL}/admin/registrations/${id}`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(payload)
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

// 3. Payment Settings Management
export const getAdminPaymentSettings = async () => {
  const res = await fetch(`${API_URL}/admin/payment-settings`, {
    headers: getHeaders()
  });
  if (!res.ok) throw new Error('Failed to fetch payment settings');
  return res.json();
};

export const updateAdminPaymentSettings = async (formData) => {
  const res = await fetch(`${API_URL}/admin/payment-settings`, {
    method: 'PUT',
    headers: getHeaders(true), // Content-Type omitted so browser sets multipart boundary
    body: formData
  });
  if (!res.ok) throw new Error('Failed to update payment settings');
  return res.json();
};

// Public helper for fetching active payment settings (used on Register / Client pages)
export const getPublicPaymentSettings = async () => {
  const res = await fetch(`${API_URL}/registrations/payment-settings`);
  if (!res.ok) throw new Error('Failed to fetch payment settings');
  return res.json();
};

// 4. Users Management
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

// 5. Service Requests / Transactions
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

// 6. Services Catalog
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

// 7. Inquiries / Grievances
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

// 8. Admin Profile & Security Settings
export const getAdminProfile = async () => {
  const res = await fetch(`${API_URL}/admin/profile`, {
    headers: getHeaders()
  });
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to fetch admin profile');
  }
  return res.json();
};

export const updateAdminProfile = async (profileData) => {
  const res = await fetch(`${API_URL}/admin/profile`, {
    method: 'PUT',
    headers: getHeaders(),
    body: JSON.stringify(profileData)
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.message || 'Failed to update admin profile credentials');
  }
  return data;
};
