import { Link } from 'react-router-dom';
import { isAuthenticated } from '../services/api';

export default function Home() {
  const loggedIn = isAuthenticated();

  return (
    <div className="fade-in">
      {/* Hero Section */}
      <div style={{
        backgroundColor: '#1976d2',
        color: 'white',
        padding: '60px 20px',
        textAlign: 'center'
      }}>
        <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>🛠️ Ferretería Herramientas Plus</h1>
        <p style={{ fontSize: '20px', maxWidth: '800px', margin: '0 auto 30px', lineHeight: '1.6' }}>
          Bienvenido al sistema de gestión de productos para ferretería. 
          Encuentra herramientas, materiales de construcción y mucho más.
        </p>
        
        <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {!loggedIn ? (
            <>
              <Link to="/login">
                <button style={{
                  padding: '15px 30px',
                  fontSize: '18px',
                  backgroundColor: '#4caf50',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  textDecoration: 'none'
                }}>
                  Iniciar Sesión
                </button>
              </Link>
              <Link to="/registro">
                <button style={{
                  padding: '15px 30px',
                  fontSize: '18px',
                  backgroundColor: 'transparent',
                  color: 'white',
                  border: '2px solid white',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}>
                  Registrarse
                </button>
              </Link>
            </>
          ) : (
            <Link to="/productos">
              <button style={{
                padding: '15px 40px',
                fontSize: '18px',
                backgroundColor: '#ff9800',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}>
                👉 Ver Catálogo Completo
              </button>
            </Link>
          )}
        </div>
      </div>

      {/* Features Section */}
      <div style={{
        maxWidth: '1200px',
        margin: '60px auto',
        padding: '0 20px'
      }}>
        <h2 style={{ 
          textAlign: 'center', 
          color: '#333',
          marginBottom: '40px',
          fontSize: '36px'
        }}>
          ¿Qué puedes hacer aquí?
        </h2>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '30px'
        }}>
          <div style={{
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '20px' }}>📦</div>
            <h3 style={{ color: '#1976d2', marginBottom: '15px' }}>Gestión de Productos</h3>
            <p style={{ color: '#666', lineHeight: '1.6' }}>
              Explora nuestro catálogo completo de productos de ferretería con precios, 
              descripciones y disponibilidad en tiempo real.
            </p>
          </div>
          
          <div style={{
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '20px' }}>🔐</div>
            <h3 style={{ color: '#1976d2', marginBottom: '15px' }}>Acceso Seguro</h3>
            <p style={{ color: '#666', lineHeight: '1.6' }}>
              Sistema de autenticación con JWT que garantiza la seguridad de tus datos 
              y operaciones dentro de la plataforma.
            </p>
          </div>
          
          <div style={{
            backgroundColor: 'white',
            padding: '30px',
            borderRadius: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '48px', marginBottom: '20px' }}>⚡</div>
            <h3 style={{ color: '#1976d2', marginBottom: '15px' }}>API REST</h3>
            <p style={{ color: '#666', lineHeight: '1.6' }}>
              Backend completamente funcional con endpoints RESTful documentados 
              con Swagger para fácil integración.
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{
        backgroundColor: '#f5f5f5',
        padding: '40px 20px',
        textAlign: 'center'
      }}>
        <h3 style={{ color: '#333', marginBottom: '30px' }}>Proyecto Educacional</h3>
        <p style={{ 
          maxWidth: '800px', 
          margin: '0 auto', 
          color: '#666',
          lineHeight: '1.6',
          fontSize: '18px'
        }}>
          Este sistema fue desarrollado como parte de un proyecto educativo para demostrar 
          el uso de <strong>Spring Boot</strong>, <strong>React</strong>, <strong>JWT</strong> y 
          buenas prácticas de desarrollo web.
        </p>
      </div>
    </div>
  );
}