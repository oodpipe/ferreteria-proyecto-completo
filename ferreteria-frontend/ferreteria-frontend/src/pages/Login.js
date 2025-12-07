import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      navigate('/productos');
    } catch (err) {
      setError(err.response?.data?.message || 'Error al iniciar sesión');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '80vh',
      padding: '20px'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '400px',
        padding: '30px',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ textAlign: 'center', color: '#1976d2', marginBottom: '30px' }}>
          🔐 Iniciar Sesión
        </h2>
        
        {error && (
          <div style={{
            padding: '10px',
            backgroundColor: '#ffebee',
            color: '#c62828',
            borderRadius: '4px',
            marginBottom: '20px',
            textAlign: 'center'
          }}>
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label style={{
              display: 'block',
              marginBottom: '5px',
              color: '#555',
              fontWeight: '500'
            }}>
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '16px',
                boxSizing: 'border-box'
              }}
              placeholder="ejemplo@correo.com"
            />
          </div>
          
          <div style={{ marginBottom: '25px' }}>
            <label style={{
              display: 'block',
              marginBottom: '5px',
              color: '#555',
              fontWeight: '500'
            }}>
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontSize: '16px',
                boxSizing: 'border-box'
              }}
              placeholder="••••••••"
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: loading ? '#ccc' : '#1976d2',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '16px',
              cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'background-color 0.3s'
            }}
          >
            {loading ? 'Cargando...' : 'Ingresar'}
          </button>
        </form>
        
        <p style={{ textAlign: 'center', marginTop: '20px', color: '#666' }}>
          ¿No tienes cuenta?{' '}
          <button
            onClick={() => navigate('/registro')}
            style={{
              background: 'none',
              border: 'none',
              color: '#1976d2',
              cursor: 'pointer',
              textDecoration: 'underline'
            }}
          >
            Regístrate aquí
          </button>
        </p>
      </div>
    </div>
  );
}