import React from 'react';
import './EditarEmpleado.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export function EditarEmpleado() {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [email, setEmail] = useState('');
    const [telefono, setTelefono] = useState('');
    const [cargo, setCargo] = useState([]);
    const [tipoDocumento, setTipoDocumento] = useState([]);
    const [sucursal, setSucursal] = useState('');

    const { documento } = useParams();
    const { idSucursal } = useParams();

    const [selectedTipoDocumento, setSelectedTipoDocumento] = useState('');
    const [selectedCargo, setSelectedCargo] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8080/empleados/${documento}`)
          .then(response => {
            const empleado = response.data;
            setNombre(empleado.nombre);
            setApellido(empleado.apellido);
            setEmail(empleado.email);
            setTelefono(empleado.telefono);
            setSelectedCargo(empleado.idRol);
            setSelectedTipoDocumento(empleado.idTipoDoc);
            setSucursal(empleado.idSucursal);
            console.log(response.data);
          })
          .catch(error => console.error(error));
      }, [documento]);

      useEffect(() => {
        axios.get('http://localhost:8080/tipodocumento')
          .then(response => {
            // Asegúrate de que response.data es un array antes de establecerlo como el valor de tipodocumento
            if (Array.isArray(response.data)) {
              setTipoDocumento(response.data);
            } else {
              console.error('La respuesta de la API no es un array: ', response.data);
            }
          })
          .catch(error => {
            console.error('Hubo un error al obtener los tipos de documento: ', error);
          });
      }, []);

      useEffect(() => {
        axios.get('http://localhost:8080/cargo')
          .then(response => {
            if (Array.isArray(response.data)) {
              setCargo(response.data);
            } else {
              console.error('La respuesta de la API no es un array: ', response.data);
            }
          })
          .catch(error => {
            console.error('Hubo un error al obtener los cargos: ', error);
          });
      }, []);

      const handleSubmit = (event) => {
        event.preventDefault();
      
        axios.put(`http://localhost:8080/empleados/${documento}`, {
            nombre: nombre,
            apellido: apellido,
            email: email,
            telefono: telefono,
            idRol: selectedCargo,
            idTipoDoc: selectedTipoDocumento,
            idSucursal: sucursal
        })
        .then(response => {
            // Haz algo con la respuesta, por ejemplo, redirige al usuario a la página de inicio
            navigate(`/sucursales/${idSucursal}/empleados`);
          })
        .catch(error => {
          // Maneja cualquier error que pueda ocurrir
          console.error('Hubo un error al actualizar la sucursal:', error);
        });
      };
    return (
        <div className="editar-empleado">
        <h1>Editar Empleado</h1>
        <form onSubmit={handleSubmit}>
            <label>Nombre:
            <input 
            type="text" 
            value={nombre} 
            onChange={e => setNombre(e.target.value)} />
            </label>

            <label>Apellido:
            <input 
            type="text" 
            value={apellido} 
            onChange={e => setApellido(e.target.value)} />
            </label>

            <label>Email:
            <input 
            type="email" 
            value={email} 
            onChange={e => setEmail(e.target.value)} />
            </label>

            <label>Telefono:
            <input 
            type="text" 
            value={telefono} 
            onChange={e => setTelefono(e.target.value)} />
            </label>

            <label>Cargo:
            <select 
            type="text" 
            value={selectedCargo} 
            onChange={e => setSelectedCargo(e.target.value)}>
            {cargo.map(cargo => (
              <option key={cargo.idRol} value={cargo.idRol}>{cargo.nombreRol}</option>
            ))}
            </select>
            </label>

            <label>Tipo documento:
            <select 
            type="text" 
            value={selectedTipoDocumento} 
            onChange={e => setSelectedTipoDocumento(e.target.value)}>
            {tipoDocumento.map(tipo => (
              <option key={tipo.idTipoDoc} value={tipo.idTipoDoc}>{tipo.nombreTipoDoc}</option>
            ))}
            </select>
            </label>

            <label>Sucursal:
            <input 
            type="text" 
            value={sucursal} 
            onChange={e => setSucursal(e.target.value)} />
            </label>

            <button type="submit">Guardar cambios</button>
        </form>
        </div>
    );
}