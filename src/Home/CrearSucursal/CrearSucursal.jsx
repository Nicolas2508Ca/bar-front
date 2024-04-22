import React, { useState } from 'react';
import axios from 'axios';
import './CrearSucursal.css'; // Importa tu archivo CSS
import { useNavigate } from 'react-router-dom';
import { Header } from '../../Header/Header';

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
    <div>
      <Header />
      <div className="crear-sucursal-container">
        <h2 className="crear-sucursal-title">Crear nueva sucursal</h2>
        <form className="crear-sucursal-form" onSubmit={handleSubmit}>

          <label htmlFor="nombre">Nombre:</label>
          <input type="text" id="nombre" autoComplete="off" name="nombre" value={nombre} onChange={e => setNombre(e.target.value)} />

          <label htmlFor="direccion">Dirección:</label>
          <input type="text" autoComplete="off" id="direccion" name="direccion" value={direccion} onChange={e => setDireccion(e.target.value)} />

          <div className='form-submit'>
            <button className="form-crear" type="submit">Crear sucursal</button>
            <button className="form-cancelar" type="button">Cancelar</button>
          </div>

        </form>
      </div>
    </div>
  );
}
