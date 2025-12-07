import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { isAuthenticated } from './services/api';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Registro from './pages/Registro';
import Productos from './pages/Productos';
import Home from './pages/Home';
import './App.css';

// Componente para rutas protegidas
const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
        <Navbar />
        <div style={{ paddingBottom: '40px' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Registro />} />
            <Route 
              path="/productos" 
              element={
                <PrivateRoute>
                  <Productos />
                </PrivateRoute>
              } 
            />
            {/* Redirigir rutas no existentes */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
        
        {/* Footer */}
        <footer style={{
          backgroundColor: '#1976d2',
          color: 'white',
          textAlign: 'center',
          padding: '20px',
          marginTop: '40px'
        }}>
          <p>🛠️ Ferretería Herramientas Plus - Proyecto Educacional</p>
          <p style={{ fontSize: '14px', opacity: '0.8' }}>
            Sistema de gestión de productos | {new Date().getFullYear()}
          </p>
        </footer>
      </div>
    </Router>
  );
}

export default App;