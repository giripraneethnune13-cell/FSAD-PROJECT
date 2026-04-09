import axios from 'axios';

const API_BASE = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
});

// Interceptor to attach JWT token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth
export const registerUser = (data) => api.post('/auth/register', data);
export const loginUser = (data) => api.post('/auth/login', data);

// User
export const getCurrentUser = () => api.get('/users/me');
export const getAllStudents = () => api.get('/users');
export const getUserById = (id) => api.get(`/users/${id}`);

// Projects
export const getAllProjects = () => api.get('/projects');
export const getMyProjects = () => api.get('/projects/my');
export const getProjectById = (id) => api.get(`/projects/${id}`);
export const createProject = (data) => api.post('/projects', data);
export const updateProject = (id, data) => api.put(`/projects/${id}`, data);
export const deleteProject = (id) => api.delete(`/projects/${id}`);

// Milestones
export const getMilestones = (projectId) => api.get(`/milestones/project/${projectId}`);
export const createMilestone = (data) => api.post('/milestones', data);
export const toggleMilestone = (id) => api.patch(`/milestones/${id}/toggle`);
export const deleteMilestone = (id) => api.delete(`/milestones/${id}`);

// Feedback
export const getFeedback = (projectId) => api.get(`/feedback/project/${projectId}`);
export const createFeedback = (data) => api.post('/feedback', data);
export const deleteFeedback = (id) => api.delete(`/feedback/${id}`);

// Files
export const uploadFile = (file, projectId) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('projectId', projectId);
  return api.post('/files/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};
export const getFilesByProject = (projectId) => api.get(`/files/project/${projectId}`);
export const deleteFile = (id) => api.delete(`/files/${id}`);
export const getFileUrl = (fileName) => `${API_BASE}/files/download/${fileName}`;

// Portfolio (public)
export const getPortfolioUser = (userId) => api.get(`/portfolio/${userId}`);
export const getPortfolioProjects = (userId) => api.get(`/portfolio/${userId}/projects`);

export default api;
