import React, { useState, useEffect } from 'react';
import './VerEditarEmpleados.css';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Header } from '../../Header/Header';

export function VerEditarEmpleados() {

    const navigate = useNavigate();
    const { idSucursal } = useParams();
    const [empleados, setEmpleados] = useState([]);

    const roles = {
        1: 'Administrador',
        2: 'Mesero',
        3: 'Cajero',
    };

    const tipodoc = {
        1: 'Cedula de Ciudadania',
        2: 'Tarjeta de Identidad',
        3: 'Cédula de Extranjería',
    };

    const irAInicio = () => {
        navigate('/Home');
      };

    useEffect(() => {
        axios.get(`http://localhost:8080/sucursales/${idSucursal}/empleados`)
            .then(response => {
                setEmpleados(response.data);
            })
            .catch(error => console.error(error));
    }, [idSucursal]);

    const crearEmpleado = () => {
        navigate(`/sucursales/${idSucursal}/empleados/CrearEmpleado`)
    };

    const actualizarEmpleado = (empleado) => {
        navigate(`/sucursales/${idSucursal}/empleados/EditarEmpleado/${empleado.documento}`)
    };

    const eliminarEmpleado = (id) => {
        axios.delete(`http://localhost:8080/empleados/${id}`)
            .then(response => {
                // Actualiza la lista de empleados después de eliminar uno
                setEmpleados(empleados.filter(empleado => empleado.documento !== id));
            })
            .catch(error => console.error(error));
    };

    return (
        <section>
            <Header />
            <div className='home_titulo'>
                <h1 className='home_titulo-text'>Gestion de Empleados</h1>
                <div>
                    <button className='home_boton-crear' onClick={irAInicio}>Ir a sucursales</button>
                    <button 
                        className='home-crear'
                        onClick={crearEmpleado}
                        >Crear Empleado
                    </button>
                </div>
            </div>
        <table className="empleados-table">
        <thead className='empelados-cabecera'>
            <tr>
                <th className="empleados-header">Tipo Doc.</th>
                <th className="empleados-header">Doc.</th>
                <th className="empleados-header">Nombre</th>
                <th className="empleados-header">Apellido</th>
                <th className="empleados-header">Email</th>
                <th className="empleados-header">Telefono</th>
                <th className="empleados-header">Cargo</th>
                <th className="empleados-header">Acciones</th>
            </tr>
        </thead>
        <tbody className='empleados-cuerpo'>
            {empleados.map(empleado => (
            <tr key={empleado.documento}>
                <td className="empleados-data">{tipodoc[empleado.idTipoDoc]}</td>
                <td className="empleados-data">{empleado.documento}</td>
                <td className="empleados-data">{empleado.nombre}</td>
                <td className="empleados-data">{empleado.apellido}</td>
                <td className="empleados-data">{empleado.email}</td>
                <td className="empleados-data">{empleado.telefono}</td>
                <td className="empleados-data">{roles[empleado.idRol]}</td> {/* Muestra el rol aquí */}
                <td className="empleados-data-acciones">
                    <button 
                    className="empleados-button-editar" 
                    onClick={() => actualizarEmpleado(empleado)}>
                        <img src='/lapiz.svg'/>
                    </button>
                    <button 
                    className="empleados-button-eliminar" 
                    onClick={() => eliminarEmpleado(empleado.documento)}>
                        <img src='/eliminar.svg'/>
                    </button>
                </td>
            </tr>
            ))}
        </tbody>
    </table>
    </section>
);
}