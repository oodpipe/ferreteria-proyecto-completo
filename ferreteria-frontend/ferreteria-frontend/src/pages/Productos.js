import { useEffect, useState } from 'react';
import { getProductos, buscarProductos, getProductosPorCategoria } from '../services/api';

export default function Productos() {
  const [productos, setProductos] = useState([]);
  const [filtro, setFiltro] = useState('');
  const [categoria, setCategoria] = useState('');
  const [loading, setLoading] = useState(true);

  const categorias = ['Herramientas', 'Electricidad', 'Fontanería', 'Construcción', 'Jardinería'];

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    setLoading(true);
    try {
      const data = await getProductos();
      setProductos(data);
    } catch (error) {
      console.error('Error cargando productos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBuscar = async () => {
    if (!filtro.trim()) {
      cargarProductos();
      return;
    }
    setLoading(true);
    try {
      const data = await buscarProductos(filtro);
      setProductos(data);
    } catch (error) {
      console.error('Error buscando:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFiltrarCategoria = async (cat) => {
    setCategoria(cat);
    setLoading(true);
    try {
      const data = await getProductosPorCategoria(cat);
      setProductos(data);
    } catch (error) {
      console.error('Error filtrando:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ color: '#1976d2', marginBottom: '30px' }}>🛒 Nuestros Productos</h1>
      
      {/* Filtros */}
      <div style={{ 
        backgroundColor: '#f5f5f5', 
        padding: '20px', 
        borderRadius: '8px',
        marginBottom: '30px'
      }}>
        <div style={{ display: 'flex', gap: '15px', marginBottom: '15px', flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="Buscar producto..."
            value={filtro}
            onChange={(e) => setFiltro(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleBuscar()}
            style={{
              flex: '1',
              minWidth: '200px',
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '4px',
              fontSize: '16px'
            }}
          />
          <button
            onClick={handleBuscar}
            style={{
              padding: '10px 20px',
              backgroundColor: '#1976d2',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            🔍 Buscar
          </button>
          <button
            onClick={cargarProductos}
            style={{
              padding: '10px 20px',
              backgroundColor: '#666',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '16px'
            }}
          >
            ↻ Restablecer
          </button>
        </div>
        
        {/* Filtros por categoría */}
        <div>
          <p style={{ marginBottom: '10px', color: '#555' }}>Filtrar por categoría:</p>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button
              onClick={() => {
                setCategoria('');
                cargarProductos();
              }}
              style={{
                padding: '8px 15px',
                backgroundColor: categoria === '' ? '#1976d2' : '#e0e0e0',
                color: categoria === '' ? 'white' : '#333',
                border: 'none',
                borderRadius: '20px',
                cursor: 'pointer'
              }}
            >
              Todas
            </button>
            {categorias.map((cat) => (
              <button
                key={cat}
                onClick={() => handleFiltrarCategoria(cat)}
                style={{
                  padding: '8px 15px',
                  backgroundColor: categoria === cat ? '#1976d2' : '#e0e0e0',
                  color: categoria === cat ? 'white' : '#333',
                  border: 'none',
                  borderRadius: '20px',
                  cursor: 'pointer'
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Lista de productos */}
      {loading ? (
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <div style={{ fontSize: '48px', marginBottom: '20px' }}>⏳</div>
          <p style={{ color: '#666' }}>Cargando productos...</p>
        </div>
      ) : productos.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px', backgroundColor: '#fff3e0', borderRadius: '8px' }}>
          <div style={{ fontSize: '48px', marginBottom: '20px' }}>😕</div>
          <p style={{ color: '#e65100', fontSize: '18px' }}>No se encontraron productos</p>
          <p style={{ color: '#666' }}>Intenta con otra búsqueda o categoría</p>
        </div>
      ) : (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '20px'
        }}>
          {productos.map((prod) => (
            <div
              key={prod.id}
              style={{
                border: '1px solid #e0e0e0',
                borderRadius: '8px',
                padding: '20px',
                backgroundColor: 'white',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                transition: 'transform 0.3s, box-shadow 0.3s',
                display: 'flex',
                flexDirection: 'column'
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'translateY(-5px)';
                e.target.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
              }}
            >
              <div style={{ 
                backgroundColor: '#e3f2fd', 
                padding: '10px', 
                borderRadius: '4px',
                marginBottom: '15px',
                fontSize: '12px',
                color: '#1976d2',
                fontWeight: 'bold'
              }}>
                {prod.categoria || 'Sin categoría'}
              </div>
              
              <h3 style={{ 
                margin: '0 0 10px 0', 
                color: '#333',
                fontSize: '18px',
                minHeight: '54px'
              }}>
                {prod.nombre}
              </h3>
              
              <p style={{ 
                color: '#666', 
                fontSize: '14px',
                flex: '1',
                marginBottom: '15px',
                lineHeight: '1.5'
              }}>
                {prod.descripcion?.substring(0, 100)}...
              </p>
              
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 'auto'
              }}>
                <div>
                  <p style={{ 
                    fontSize: '24px', 
                    fontWeight: 'bold',
                    color: '#2e7d32',
                    margin: '0'
                  }}>
                    ${prod.precio?.toLocaleString('es-CL')}
                  </p>
                  <p style={{ 
                    fontSize: '12px', 
                    color: '#666',
                    margin: '5px 0 0 0'
                  }}>
                    {prod.stock} unidades disponibles
                  </p>
                </div>
                
                <div style={{ 
                  backgroundColor: prod.stock > 0 ? '#e8f5e9' : '#ffebee',
                  color: prod.stock > 0 ? '#2e7d32' : '#c62828',
                  padding: '5px 10px',
                  borderRadius: '4px',
                  fontSize: '12px',
                  fontWeight: 'bold'
                }}>
                  {prod.stock > 0 ? '✓ Disponible' : '✗ Agotado'}
                </div>
              </div>
              
              {prod.sku && (
                <p style={{ 
                  fontSize: '12px', 
                  color: '#888',
                  marginTop: '10px',
                  fontFamily: 'monospace'
                }}>
                  SKU: {prod.sku}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}