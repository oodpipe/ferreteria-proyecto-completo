import axios from 'axios';

// Para desarrollo local
// const API_URL = 'http://localhost:8080/api';

// Para producción en EC2 (usa la IP de tu EC2)
const API_URL = 'http://3.239.7.160:8080/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar token
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

// Funciones para autenticación
export const login = (credentials) => api.post('/auth/login', credentials);
export const register = (userData) => api.post('/auth/register', userData);
export const getCurrentUser = () => api.get('/auth/me');
export const isAuthenticated = () => !!localStorage.getItem('token');
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userRole');
};
export const getUserRole = () => localStorage.getItem('userRole') || 'USER';
export const isAdmin = () => getUserRole() === 'ADMIN';

// Funciones para productos
export const getProductos = async () => {
  const response = await api.get('/productos');
  return response.data;
};

export const getProductoById = (id) => api.get(`/productos/${id}`);
export const createProducto = (producto) => api.post('/productos', producto);
export const updateProducto = (id, producto) => api.put(`/productos/${id}`, producto);
export const deleteProducto = (id) => api.delete(`/productos/${id}`);

// buscarProductos mejorada - busca localmente si no hay endpoint
export const buscarProductos = async (searchTerm) => {
  try {
    // Primero intenta usar el endpoint del backend si existe
    const response = await api.get(`/productos/search?nombre=${searchTerm}`);
    return response.data;
  } catch (error) {
    // Si no existe el endpoint, busca localmente
    console.warn('Endpoint /productos/search no disponible, buscando localmente');
    const productos = await getProductos();
    const filtered = productos.filter(producto => 
      producto.nombre && producto.nombre.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return filtered;
  }
};

// getProductosPorCategoria - filtra localmente
export const getProductosPorCategoria = async (categoria) => {
  try {
    // Primero intenta usar el endpoint del backend si existe
    const response = await api.get(`/productos/categoria/${categoria}`);
    return response.data;
  } catch (error) {
    // Si no existe el endpoint, filtra localmente
    console.warn('Endpoint /productos/categoria no disponible, filtrando localmente');
    const productos = await getProductos();
    const filtered = productos.filter(producto => 
      producto.categoria && producto.categoria.toLowerCase() === categoria.toLowerCase()
    );
    return filtered;
  }
};

// Funciones para ventas
export const getVentas = () => api.get('/ventas');
export const createVenta = (venta) => api.post('/ventas', venta);
export const getVentaById = (id) => api.get(`/ventas/${id}`);

// Funciones para reportes
export const getReporteVentas = (fechaInicio, fechaFin) => 
  api.get(`/reportes/ventas?fechaInicio=${fechaInicio}&fechaFin=${fechaFin}`);

// Funciones para usuarios
export const getUsuarios = () => api.get('/usuarios');
export const getUsuarioById = (id) => api.get(`/usuarios/${id}`);
export const updateUsuario = (id, usuario) => api.put(`/usuarios/${id}`, usuario);
export const deleteUsuario = (id) => api.delete(`/usuarios/${id}`);

// Funciones para clientes - versión simple si no hay endpoint
export const getClientes = async () => {
  try {
    const response = await api.get('/clientes');
    return response.data;
  } catch (error) {
    console.warn('Endpoint /clientes no disponible, devolviendo array vacío');
    return [];
  }
};

// Funciones para arriendos - versión simple si no hay endpoint
export const getArriendos = async () => {
  try {
    const response = await api.get('/arriendos');
    return response.data;
  } catch (error) {
    console.warn('Endpoint /arriendos no disponible, devolviendo array vacío');
    return [];
  }
};

// Alias para registro
export const registro = register;

export default api;
