import { Link, useNavigate } from 'react-router-dom';
import { logout, isAuthenticated, isAdmin, getUserRole } from '../services/api';

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={{
      padding: '10px 20px',
      backgroundColor: '#1976d2',
      color: 'white',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <Link to="/" style={{ 
          color: 'white', 
          textDecoration: 'none',
          fontSize: '1.2rem',
          fontWeight: 'bold'
        }}>
          🛠️ Ferretería Plus
        </Link>
        
        <Link to="/productos" style={{ 
          margin: '0 10px', 
          color: 'white',
          textDecoration: 'none',
          padding: '5px 10px',
          borderRadius: '4px',
          transition: 'background-color 0.3s'
        }} onMouseOver={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.1)'}
           onMouseOut={(e) => e.target.style.backgroundColor = 'transparent'}>
          Productos
        </Link>
        
        {isAuthenticated() && isAdmin() && (
          <Link to="/admin" style={{ 
            margin: '0 10px', 
            color: 'white',
            textDecoration: 'none',
            padding: '5px 10px',
            borderRadius: '4px',
            backgroundColor: 'rgba(255,255,255,0.2)'
          }}>
            Panel Admin
          </Link>
        )}
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        {isAuthenticated() ? (
          <>
            <span style={{ fontSize: '0.9rem' }}>
              👤 {user.nombre} ({getUserRole()})
            </span>
            <button 
              onClick={handleLogout}
              style={{
                padding: '5px 15px',
                backgroundColor: 'transparent',
                color: 'white',
                border: '1px solid white',
                borderRadius: '4px',
                cursor: 'pointer',
                transition: 'all 0.3s'
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = 'white';
                e.target.style.color = '#1976d2';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = 'transparent';
                e.target.style.color = 'white';
              }}
            >
              Cerrar Sesión
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ 
              color: 'white',
              textDecoration: 'none',
              padding: '5px 10px'
            }}>
              Login
            </Link>
            <Link to="/registro" style={{ 
              color: 'white',
              textDecoration: 'none',
              padding: '5px 10px',
              border: '1px solid white',
              borderRadius: '4px'
            }}>
              Registro
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}