import axios from 'axios';

// Configuración base de Axios
const apiClient = axios.create({
  baseURL: 'http://localhost:3000', // Cambia según tu backend
});

// Interceptor para agregar el token al header de cada solicitud
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken')
      ? JSON.parse(localStorage.getItem('authToken')).token
      : null;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Servicio combinado
const ModuleService = {
  // UserProgress
  userProgress: {
    create: async (data) => {
      const response = await apiClient.post('/user-progress', data);
      return response.data;
    },
    getAll: async () => {
      const response = await apiClient.get('/user-progress');
      return response.data;
    },
    getById: async (id) => {
      const response = await apiClient.get(`/user-progress/${id}`);
      return response.data;
    },
    update: async (id, data) => {
      const response = await apiClient.patch(`/user-progress/${id}`, data);
      return response.data;
    },
    remove: async (id) => {
      await apiClient.delete(`/user-progress/${id}`);
      return { success: true };
    },
  },

  // Modules
  modules: {
    create: async (data) => {
      const response = await apiClient.post('/modules', data);
      return response.data;
    },
    getAll: async () => {
      const response = await apiClient.get('/modules');
      return response.data;
    },
    getById: async (id) => {
      const response = await apiClient.get(`/modules/${id}`);
      return response.data;
    },
    update: async (id, data) => {
      const response = await apiClient.patch(`/modules/${id}`, data);
      return response.data;
    },
    remove: async (id) => {
      await apiClient.delete(`/modules/${id}`);
      return { success: true };
    },
  },

  // Lessons
  lessons: {
    create: async (data) => {
      const response = await apiClient.post('/lessons', data);
      return response.data;
    },
    getAll: async () => {
      const response = await apiClient.get('/lessons');
      return response.data;
    },
    getById: async (id) => {
      const response = await apiClient.get(`/lessons/${id}`);
      return response.data;
    },
    update: async (id, data) => {
      const response = await apiClient.patch(`/lessons/${id}`, data);
      return response.data;
    },
    remove: async (id) => {
      await apiClient.delete(`/lessons/${id}`);
      return { success: true };
    },
  },

  // Quizzes
  quizzes: {
    create: async (data) => {
      const response = await apiClient.post('/quizzes', data);
      return response.data;
    },
    getAll: async () => {
      const response = await apiClient.get('/quizzes');
      return response.data;
    },
    getById: async (id) => {
      const response = await apiClient.get(`/quizzes/${id}`);
      return response.data;
    },
    update: async (id, data) => {
      const response = await apiClient.patch(`/quizzes/${id}`, data);
      return response.data;
    },
    remove: async (id) => {
      await apiClient.delete(`/quizzes/${id}`);
      return { success: true };
    },
  },
};

export default ModuleService;
