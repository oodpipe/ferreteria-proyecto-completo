import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registro } from '../services/api';

export default function Registro() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: '',
    apellido: '',
    run: '',
    region: '',
    comuna: '',
    direccion: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await registro(formData);
      navigate('/productos');
    } catch (err) {
      setError(err.response?.data?.message || 'Error en el registro');
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
        maxWidth: '500px',
        padding: '30px',
        backgroundColor: 'white',
        borderRadius: '8px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
      }}>
        <h2 style={{ textAlign: 'center', color: '#1976d2', marginBottom: '30px' }}>
          📝 Registro de Usuario
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
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '20px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', color: '#555' }}>Nombre *</label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                required
                style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', color: '#555' }}>Apellido</label>
              <input
                type="text"
                name="apellido"
                value={formData.apellido}
                onChange={handleChange}
                style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
              />
            </div>
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', color: '#555' }}>Email *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
            />
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', color: '#555' }}>Contraseña *</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
            />
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', color: '#555' }}>RUN/RUT</label>
            <input
              type="text"
              name="run"
              value={formData.run}
              onChange={handleChange}
              style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
              placeholder="12.345.678-9"
            />
          </div>
          
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', marginBottom: '5px', color: '#555' }}>Dirección</label>
            <input
              type="text"
              name="direccion"
              value={formData.direccion}
              onChange={handleChange}
              style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
            />
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '25px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', color: '#555' }}>Región</label>
              <input
                type="text"
                name="region"
                value={formData.region}
                onChange={handleChange}
                style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', color: '#555' }}>Comuna</label>
              <input
                type="text"
                name="comuna"
                value={formData.comuna}
                onChange={handleChange}
                style={{ width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px' }}
              />
            </div>
          </div>
          
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: loading ? '#ccc' : '#4caf50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              fontSize: '16px',
              cursor: loading ? 'not-allowed' : 'pointer'
            }}
          >
            {loading ? 'Registrando...' : 'Registrarse'}
          </button>
        </form>
        
        <p style={{ textAlign: 'center', marginTop: '20px', color: '#666' }}>
          ¿Ya tienes cuenta?{' '}
          <button
            onClick={() => navigate('/login')}
            style={{
              background: 'none',
              border: 'none',
              color: '#1976d2',
              cursor: 'pointer',
              textDecoration: 'underline'
            }}
          >
            Inicia sesión aquí
          </button>
        </p>
      </div>
    </div>
  );
}