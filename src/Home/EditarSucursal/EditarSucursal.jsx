import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './EditarSucursal.css';

export function EditarSucursal() {
    const [nombre, setNombre] = useState("");
    const [direccion, setDireccion] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        // Obtén los datos de la sucursal cuando el componente se monta
        axios.get(`http://localhost:8080/sucursales/${id}`)
          .then(response => {
            setNombre(response.data.nombreSucursal);
            setDireccion(response.data.direccionSucursal);
          })
          .catch(error => {
            // Imprime el error a la consola
            console.error('Hubo un error al obtener los datos de la sucursal:', error);
          });
    }, [id]);

    const handleSubmit = (event) => {
        event.preventDefault();
      
        axios.put(`http://localhost:8080/sucursales/${id}`, {
            nombreSucursal: nombre,
            direccionSucursal: direccion,
        })
        .then(response => {
          // Haz algo con la respuesta, por ejemplo, redirige al usuario a la página de inicio
          navigate('/Home');
        })
        .catch(error => {
          // Maneja cualquier error que pueda ocurrir
          console.error('Hubo un error al actualizar la sucursal:', error);
        });
    };

    const handleCancel = () => {
      navigate("/home");
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

            <label htmlFor="direccion" className="form-label">Dirección <span class="required">*</span></label>
            <input 
            type="text" 
            id="direccion" 
            name="direccion"
            required 
            value={direccion || ''} onChange={e => setDireccion(e.target.value)} className="form-input"/>
            
            <div className='form-submit'>
              <button type="submit" className="form-button">Guardar cambios</button>
              <button type="button" onClick={handleCancel} className="form-button-cancelar">Cancelar</button>
            </div>
        </form>
    );
}
