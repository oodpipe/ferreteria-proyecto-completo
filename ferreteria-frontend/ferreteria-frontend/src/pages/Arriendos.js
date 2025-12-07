import { useEffect, useState } from 'react';
import { getArriendos } from '../services/api';

export default function Arriendos() {
  const [arriendos, setArriendos] = useState([]);

  useEffect(() => {
    getArriendos().then(data => setArriendos(data));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Arriendos</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        {arriendos.map((arr, index) => (
          <div key={index} style={{ border: '1px solid #ccc', padding: '10px' }}>
            <p><strong>Cliente:</strong> {arr.cliente.nombre} {arr.cliente.apellido}</p>
            <p><strong>Producto/Servicio:</strong> {arr.producto?.nombre || arr.motocicleta?.marca}</p>
            <p><strong>Fecha:</strong> {arr.fecha}</p>
            <p><strong>Valor:</strong> ${arr.valor}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
