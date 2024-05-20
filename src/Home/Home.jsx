import React, { useState, useEffect } from 'react';
import './Home.css';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import { Header } from '../Header/Header';

export function Home() {
    const location = useLocation();
    const sucursalId = location.state?.sucursalId || null;
    console.log(sucursalId);
    const [sucursales, setSucursales] = useState([]);
    const [productos, setProductos] = useState([]);
    const navigate = useNavigate();

    // Simula la obtención de datos de las sucursales desde una API
    useEffect(() => {
        axios.get('http://localhost:8080/sucursales') // Reemplaza esto con la URL de tu API
            .then(response => {
                console.log(response.data); // Agrega esto para ver los datos en la consola
                setSucursales(response.data);
            })
            .catch(error => console.error(error));
    }, []);

    useEffect(() => {
        axios.get('http://localhost:8080/productos') // Reemplaza esto con la URL de tu API
            .then(response => {
                console.log(response.data); // Agrega esto para ver los datos en la consola
                setProductos(response.data);
            })
            .catch(error => console.error(error));
    }, []);

    const handleEdit = (sucursal) => {
        if (sucursal && sucursal.idSucursal) {
          navigate(`/Home/EditarSucursal/${sucursal.idSucursal}`); // Redirige al usuario al componente EditarSucursal
        } else {
          console.error('Sucursal o ID de sucursal no definido:', sucursal);
        }
    };

    const editarProducto = (producto) => {
        if (producto && producto.idProducto) {
          navigate(`/Home/EditarProducto/${producto.idProducto}`); // Redirige al usuario al componente EditarSucursal
        } else {
          console.error('Sucursal o ID de sucursal no definido:', producto);
        }
    };

    const handleDelete = (id) => {
        fetch(`http://localhost:8080/sucursales/${id}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al eliminar la sucursal');
            }
            return response.text().then(text => text ? JSON.parse(text) : {})
        })
        
        .then(data => {
            console.log('Sucursal eliminada:', data);
            setSucursales(sucursales.filter(sucursal => sucursal.idSucursal !== id));
        })
        .catch(error => {
            console.error('Error:', error);
            // Muestra un mensaje al usuario
            alert('No se pudo eliminar la sucursal porque hay empleados asociados a ella.');
        })
    };

    const eliminarProducto = (id) => {
        fetch(`http://localhost:8080/productos/eliminar/${id}`, {
            method: 'DELETE',
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al eliminar la sucursal');
            }
            return response.text().then(text => text ? JSON.parse(text) : {})
        })
        
        .then(data => {
            console.log('Producto eliminado:', data);
            setProductos(productos.filter(producto => producto.idProducto !== id));
        })
        .catch(error => {
            console.error('Error:', error);
            // Muestra un mensaje al usuario
            alert('No se pudo eliminar el producto porque hay existencias del producto en el inventario de una sucursal asociados a ella, o el producto esta asociado a una orden.');
        })
    };

    const handleCreate = () => {
        navigate('/Home/CrearSucursal'); // Redirige al usuario al componente CrearSucursal
    }

    const crearProducto = () => {
        navigate('/Home/CrearProducto'); // Redirige al usuario al componente CrearSucursal
    }

    const handleViewEmployees = (idSucursal) => {
        navigate(`/sucursales/${idSucursal}/empleados`);
    };

    const handleViewTables = (sucursal) => {
        navigate(`/sucursales/${sucursal.idSucursal}/mesas`, { state: { sucursal } });
    };

    return (
        <section className="home">
            <Header />
            <div className='home_titulo'>
                <h1 className='home_titulo-text'>Gestion de sucursales</h1>
                <button 
                    className='home-crear'
                    onClick={handleCreate}>Crear sucursal
                </button>
            </div>
            <table className='home_tabla'>
                <thead className='home_tabla-cabecera'>
                    <tr>
                        <th className='home_tabla-cabecera-item'>Nombre</th>
                        <th className='home_tabla-cabecera-item'>Dirección</th>
                        <th className='home_tabla-cabecera-item'>Acciones</th>
                    </tr>
                </thead>
                <tbody className='home_tabla-cuerpo'>
                {sucursales.map(sucursal => (
                        <tr key={sucursal.idSucursal}>
                            <td>{sucursal.nombreSucursal}</td>
                            <td>{sucursal.direccionSucursal}</td>
                            <td className='home_tabla-acciones'>
                                <button 
                                className='home_tabla-editar' 
                                onClick={() => handleEdit(sucursal)}>
                                    <img src='lapiz.svg'/>
                                </button>
                                <button 
                                className='home_tabla-eliminar'
                                onClick={() => handleDelete(sucursal.idSucursal)}>
                                    <img src='eliminar.svg'/>
                                </button>
                                <button 
                                className='home_tabla-empleados'
                                onClick={() => handleViewEmployees(sucursal.idSucursal)}>
                                    Ver/Editar empleados
                                </button>
                                <button 
                                className='home_tabla-empleados'
                                onClick={() => handleViewTables(sucursal)}>
                                    Ver/Editar mesas
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className='home_titulo'>
                <h1 className='home_titulo-text'>Gestion de productos</h1>
                <button 
                    className='home-crear'
                    onClick={crearProducto}>Crear producto
                </button>
            </div>
            <table className='home_tabla'>
                <thead className='home_tabla-cabecera'>
                    <tr>
                        <th className='home_tabla-cabecera-item'>Nombre</th>
                        <th className='home_tabla-cabecera-item'>Precio</th>
                        <th className='home_tabla-cabecera-item'>Acciones</th>
                    </tr>
                </thead>
                <tbody className='home_tabla-cuerpo'>
                {productos.map(producto => (
                        <tr key={producto.idProducto}>
                            <td>{producto.nombreProducto}</td>
                            <td>${producto.precioProducto.toLocaleString('en-US')}</td>
                            <td className='home_tabla-acciones'>
                                <button 
                                className='home_tabla-editar' 
                                onClick={() => editarProducto(producto)}>
                                    <img src='lapiz.svg'/>
                                </button>
                                <button 
                                className='home_tabla-eliminar'
                                onClick={() => eliminarProducto(producto.idProducto)}>
                                    <img src='eliminar.svg'/>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>


            
        </section>
    );
}