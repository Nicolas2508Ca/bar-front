import React, { useState } from 'react';
import axios from 'axios';
import './CrearSucursal.css'; // Importa tu archivo CSS
import { useNavigate } from 'react-router-dom';

export function CrearSucursal() {
  const [nombre, setNombre] = useState("");
  const [direccion, setDireccion] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:8080/sucursales', {
        nombreSucursal: nombre,
        direccionSucursal: direccion
    }, { withCredentials: true})
    .then(response => {
        // Redirige al usuario a la página de inicio
        navigate('/Home');
    }).catch(response => {
      alert("No tienes permitido hacer eso");
    })
  }

  return (
    <div className="crear-sucursal-container">
      <h2 className="crear-sucursal-title">Crear nueva sucursal</h2>
      <form className="crear-sucursal-form" onSubmit={handleSubmit}>

        <label htmlFor="nombre">Nombre:</label>
        <input type="text" id="nombre" name="nombre" value={nombre} onChange={e => setNombre(e.target.value)} />

        <label htmlFor="direccion">Dirección:</label>
        <input type="text" id="direccion" name="direccion" value={direccion} onChange={e => setDireccion(e.target.value)} />

        <button type="submit">Crear</button>
      </form>
    </div>
  );
}
