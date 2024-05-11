import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EditarMesa.css';
import { useLocation, useNavigate } from 'react-router-dom';

export function EditarMesa() {
    const { state } = useLocation();
    const { sucursal, mesa } = state || {};

    const [nombre, setNombre] = useState("");
    const [puestos, setPuestos] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        // Obtén los datos de la sucursal cuando el componente se monta
        axios.get(`http://localhost:8080/mesas/mesa/${mesa.idMesa}`)
          .then(response => {
            setNombre(response.data.nombreMesa);
            setPuestos(response.data.puestosMesa);
          })
          .catch(error => {
            // Imprime el error a la consola
            console.error('Hubo un error al obtener los datos de la mesa:', error);
          });
    }, [mesa.idMesa]);

    const handleSubmit = (event) => {
        event.preventDefault();
      
        axios.patch(`http://localhost:8080/mesas/actualizar/${mesa.idMesa}`, {
            nombreMesa: nombre,
            puestosMesa: puestos
        })
        .then(response => {
          // Haz algo con la respuesta, por ejemplo, redirige al usuario a la página de inicio
          navigate(`/sucursales/${sucursal.idSucursal}/mesas`, { state: { sucursal } });
        })
        .catch(error => {
          // Maneja cualquier error que pueda ocurrir
          console.error('Hubo un error al actualizar la mesa:', error);
        });
    };

    const handleCancel = () => {
        navigate(`/sucursales/${sucursal.idSucursal}/mesas`, { state: { sucursal } });
    };

    return (
        <form onSubmit={handleSubmit} className="form">
            <label 
            htmlFor="nombre" 
            className="form-label">Nombre <span class="required">*</span>
            </label>
            <input 
            type="text" 
            id="nombre" 
            name="nombre"
            required
            value={nombre || ''} onChange={e => setNombre(e.target.value)} className="form-input"/>

            <label htmlFor="puestos" className="form-label">Cantidad de puestos <span class="required">*</span></label>
            <input 
            type="number" 
            id="puestos" 
            name="puestos"
            required 
            value={puestos || ''} onChange={e => setPuestos(e.target.value)} className="form-input"/>
            
            <div className='form-submit'>
              <button type="submit" className="form-button">Guardar cambios</button>
              <button type="button" onClick={handleCancel} className="form-button-cancelar">Cancelar</button>
            </div>
        </form>
    );
}