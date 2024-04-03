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
        axios.get(`http://localhost:8080/api/sucursales/${id}`)
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
      
        axios.put(`http://localhost:8080/api/sucursales/${id}`, {
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

      return (
        <form onSubmit={handleSubmit} className="form">
            <label htmlFor="nombre" className="form-label">Nombre:</label>
            <input type="text" id="nombre" name="nombre" value={nombre || ''} onChange={e => setNombre(e.target.value)} className="form-input" />

            <label htmlFor="direccion" className="form-label">Dirección:</label>
            <input type="text" id="direccion" name="direccion" value={direccion || ''} onChange={e => setDireccion(e.target.value)} className="form-input" />

            <button type="submit" className="form-button">Guardar cambios</button>
        </form>
    );
}
