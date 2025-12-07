import axios from 'axios';

// URL de la API - Usa variable de entorno o localhost por defecto
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar token JWT automáticamente
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Servicios de Autenticación
export const login = async (email, password) => {
  const response = await api.post('/auth/login', { email, password });
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.usuario));
  }
  return response.data;
};

export const registro = async (userData) => {
  const response = await api.post('/auth/registro', userData);
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
    localStorage.setItem('user', JSON.stringify(response.data.usuario));
  }
  return response.data;
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

// Servicios de Productos
export const getProductos = async () => {
  const response = await api.get('/productos');
  return response.data;
};

export const getProductoById = async (id) => {
  const response = await api.get(`/productos/${id}`);
  return response.data;
};

export const buscarProductos = async (nombre) => {
  const response = await api.get(`/productos/buscar?nombre=${nombre}`);
  return response.data;
};

export const getProductosPorCategoria = async (categoria) => {
  const response = await api.get(`/productos/categoria/${categoria}`);
  return response.data;
};

// Servicios de Administración (requieren token de ADMIN)
export const crearProducto = async (producto) => {
  const response = await api.post('/admin/productos', producto);
  return response.data;
};

export const actualizarProducto = async (id, producto) => {
  const response = await api.put(`/admin/productos/${id}`, producto);
  return response.data;
};

export const eliminarProducto = async (id) => {
  await api.delete(`/admin/productos/${id}`);
};

// Verificar autenticación
export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

export const getUserRole = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  return user.rol || 'USER';
};

export const isAdmin = () => {
  return getUserRole() === 'ADMIN';
};
