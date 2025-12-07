// API 100% MOCK - NO necesita backend

// ========== DATOS DEMO ==========
const productosDemo = [
  {id:1, nombre:"Taladro Percutor 750W", descripcion:"Profesional para concreto", precio:89990, stock:15, categoria:"Herramientas", sku:"TAL-750"},
  {id:2, nombre:"Destornillador Eléctrico", descripcion:"Recargable 12V", precio:45990, stock:8, categoria:"Herramientas", sku:"DES-12V"},
  {id:3, nombre:"Cable Eléctrico 2.5mm", descripcion:"100 metros THW", precio:78990, stock:25, categoria:"Electricidad", sku:"CAB-25"},
  {id:4, nombre:"Llave Inglesa 10''", descripcion:"Ajustable acero", precio:12990, stock:30, categoria:"Herramientas", sku:"LLE-10"},
  {id:5, nombre:"Tubería PVC 1''", descripcion:"6 metros presión 10bar", precio:8990, stock:50, categoria:"Fontanería", sku:"TUB-PVC"}
];

// ========== FUNCIONES MOCK ==========
const delay = ms => new Promise(r => setTimeout(r, ms));

// LOGIN - ACEPTA TODO
export const login = async (email, password) => {
  console.log("✅ Login MOCK aceptado:", email);
  await delay(500);
  
  const user = {
    id: 1,
    nombre: email.includes('admin') ? "Administrador" : "Usuario",
    email: email,
    rol: email.includes('admin') ? 'ADMIN' : 'USER',
    region: "Metropolitana",
    comuna: "Santiago"
  };
  
  localStorage.setItem('token', 'mock-token-123');
  localStorage.setItem('user', JSON.stringify(user));
  
  return { token: 'mock-token-123', usuario: user };
};

// REGISTRO - ACEPTA TODO
export const registro = async (userData) => {
  console.log("✅ Registro MOCK aceptado:", userData.email);
  await delay(500);
  
  const user = {
    id: Date.now(),
    nombre: userData.nombre || "Nuevo Usuario",
    email: userData.email,
    rol: "USER",
    apellido: userData.apellido || "",
    run: userData.run || "",
    region: userData.region || "",
    comuna: userData.comuna || "",
    direccion: userData.direccion || ""
  };
  
  localStorage.setItem('token', 'mock-token-new');
  localStorage.setItem('user', JSON.stringify(user));
  
  return { token: 'mock-token-new', usuario: user };
};

// LOGOUT
export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

// PRODUCTOS
export const getProductos = async () => {
  await delay(300);
  return productosDemo;
};

export const buscarProductos = async (nombre) => {
  await delay(200);
  if (!nombre) return productosDemo;
  return productosDemo.filter(p => 
    p.nombre.toLowerCase().includes(nombre.toLowerCase())
  );
};

export const getProductosPorCategoria = async (categoria) => {
  await delay(200);
  if (!categoria) return productosDemo;
  return productosDemo.filter(p => 
    p.categoria.toLowerCase() === categoria.toLowerCase()
  );
};

// UTILIDADES
export const isAuthenticated = () => !!localStorage.getItem('token');

export const getUserRole = () => {
  try {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.rol || 'USER';
  } catch {
    return 'USER';
  }
};

export const isAdmin = () => getUserRole() === 'ADMIN';

export const getCurrentUser = () => {
  try {
    return JSON.parse(localStorage.getItem('user') || '{}');
  } catch {
    return {};
  }
};
