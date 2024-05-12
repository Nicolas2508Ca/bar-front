import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './EditarProducto.css';

export function EditarProducto() {
    const [nombre, setNombre] = useState("");
    const [precio, setPrecio] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        // Obtén los datos de la sucursal cuando el componente se monta
        axios.get(`http://localhost:8080/productos/producto/${id}`)
          .then(response => {
            setNombre(response.data.nombreProducto);
            setPrecio(response.data.precioProducto);
          })
          .catch(error => {
            // Imprime el error a la consola
            console.error('Hubo un error al obtener los datos del producto:', error);
          });
    }, [id]);

    const handleSubmit = (event) => {
        event.preventDefault();
      
        axios.patch(`http://localhost:8080/productos/${id}`, {
            nombreProducto: nombre,
            precioProducto: precio,
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

            <label htmlFor="precio" className="form-label">Precio <span class="required">*</span></label>
            <input 
            type="number" 
            id="precio" 
            name="precio"
            required 
            value={precio || ''} onChange={e => setPrecio(e.target.value)} className="form-input"/>
            
            <div className='form-submit'>
              <button type="submit" className="form-button">Guardar cambios</button>
              <button type="button" onClick={handleCancel} className="form-button-cancelar">Cancelar</button>
            </div>
        </form>
    );
}
