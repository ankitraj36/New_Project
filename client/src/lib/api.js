import axios from 'axios';

// Use relative URL — works both locally and on Vercel
const api = axios.create({
    baseURL: '/api',
    headers: { 'Content-Type': 'application/json' },
});

// Attach JWT token to requests
api.interceptors.request.use((config) => {
    if (typeof window !== 'undefined') {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
});

// Handle 401 errors
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401 && typeof window !== 'undefined') {
            localStorage.removeItem('token');
            localStorage.removeItem('user');
        }
        return Promise.reject(error);
    }
);

export default api;

// API helper functions
export const authAPI = {
    register: (data) => api.post('/auth/register', data),
    login: (data) => api.post('/auth/login', data),
    getMe: () => api.get('/auth/me'),
    updateProfile: (data) => api.put('/auth/profile', data),
};

export const materialsAPI = {
    getAll: (params) => api.get('/materials', { params }),
    getById: (id) => api.get(`/materials/${id}`),
    create: (data) => api.post('/materials', data),
    update: (id, data) => api.put(`/materials/${id}`, data),
    delete: (id) => api.delete(`/materials/${id}`),
    download: (id) => api.post(`/materials/${id}/download`),
    getStats: () => api.get('/materials/stats'),
};

export const departmentsAPI = {
    getAll: () => api.get('/departments'),
    getById: (id) => api.get(`/departments/${id}`),
    create: (data) => api.post('/departments', data),
    update: (id, data) => api.put(`/departments/${id}`, data),
    delete: (id) => api.delete(`/departments/${id}`),
};

export const bookmarksAPI = {
    getAll: () => api.get('/bookmarks'),
    add: (materialId) => api.post('/bookmarks', { materialId }),
    remove: (materialId) => api.delete(`/bookmarks/${materialId}`),
    check: (materialId) => api.get(`/bookmarks/${materialId}`),
};

export const adminAPI = {
    getStats: () => api.get('/admin/stats'),
    getUsers: (params) => api.get('/admin/users', { params }),
    deleteUser: (id) => api.delete(`/admin/users/${id}`),
    updateUserRole: (id, role) => api.put(`/admin/users/${id}`, { role }),
};
