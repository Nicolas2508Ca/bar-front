import React, { useState } from 'react';
import axios from 'axios';
import './CrearProducto.css'; // Importa tu archivo CSS
import { useNavigate } from 'react-router-dom';

export function CrearProducto() {

  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:8080/productos', {
        nombreProducto: nombre,
        precioProducto: precio
    }, { withCredentials: true})
    .then(response => {
        // Redirige al usuario a la página de inicio
        navigate('/Home');
    }).catch(response => {
      alert("No tienes permitido hacer eso");
    })
  }

  const handleCancel = () => {
    navigate("/home");
  };

  return (
    <div>
      <div className="crear-sucursal-container">
        <h2 className="crear-sucursal-title">Crear nuevo producto</h2>
        <form className="crear-sucursal-form" onSubmit={handleSubmit}>

          <label htmlFor="nombre">Nombre  <span class="required">*</span></label>
          <input 
          type="text" 
          id="nombre" 
          autoComplete="off" 
          name="nombre" 
          required
          value={nombre} onChange={e => setNombre(e.target.value)} />

          <label htmlFor="precio">Precio <span class="required">*</span></label>
          <input 
          type="number" 
          autoComplete="off" 
          id="precio" 
          name="precio"
          required 
          value={precio} onChange={e => setPrecio(e.target.value)} />

          <div className='form-submit'>
            <button className="form-crear" type="submit">Crear producto</button>
            <button className="form-cancelar" type="button" onClick={handleCancel}>Cancelar</button>
          </div>

        </form>
      </div>
    </div>
  );
}
