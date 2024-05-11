import React, { useState } from 'react';
import axios from 'axios';
import './CrearMesa.css'; // Importa tu archivo CSS
import { useLocation, useNavigate } from 'react-router-dom';

export function CrearMesa() {

    const location = useLocation();
    const { state } = location;
    const { sucursal } = state || {};

    const [nombre, setNombre] = useState("");
    const [puestos, setPuestos] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8080/mesas', {
            nombreMesa: nombre,
            puestosMesa: puestos,
            idSucursal: {
              idSucursal:sucursal.idSucursal
            },
            idEstadoMesa: {
              idEstadoMesa:1
            },
        }, { withCredentials: true})
        .then(response => {
            navigate(`/sucursales/${sucursal.idSucursal}/mesas`, { state: { sucursal } });
        })
        .catch(response => {
            alert("No tienes permitido hacer eso");
        })
    }

    const handleCancel = () => {
        navigate(`/sucursales/${sucursal.idSucursal}/mesas`, { state: { sucursal } });
    };

  return (
    <div>
      <div className="crear-sucursal-container">
        <h2 className="crear-sucursal-title">Crear nueva mesa</h2>
        <form className="crear-sucursal-form" onSubmit={handleSubmit}>

          <label htmlFor="nombre">Nombre mesa  <span class="required">*</span></label>
          <input 
          type="text" 
          id="nombre" 
          autoComplete="off" 
          name="nombre" 
          required
          value={nombre} onChange={e => setNombre(e.target.value)} />

          <label htmlFor="puestos">Cantidad de puestos <span class="required">*</span></label>
          <input 
          type="number" 
          autoComplete="off" 
          id="puestos" 
          name="puestos"
          required 
          value={puestos} onChange={e => setPuestos(e.target.value)} />

          <div className='form-submit'>
            <button className="form-crear" type="submit">Crear mesa</button>
            <button className="form-cancelar" type="button" onClick={handleCancel}>Cancelar</button>
          </div>

        </form>
      </div>
    </div>
  );
}
