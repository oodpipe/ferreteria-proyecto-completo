import { useEffect, useState } from 'react';
import { getClientes } from '../services/api';

export default function Clientes() {
  const [clientes, setClientes] = useState([]);

  useEffect(() => {
    getClientes().then(data => setClientes(data));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Clientes</h2>
      <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        {clientes.map(cliente => (
          <div key={cliente.rut} style={{ border: '1px solid #ccc', padding: '10px', width: '250px' }}>
            <h4>{cliente.nombre} {cliente.apellido}</h4>
            <p>RUT: {cliente.rut}</p>
            <p>Teléfono: {cliente.telefono}</p>
            <p>Email: {cliente.correo}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
