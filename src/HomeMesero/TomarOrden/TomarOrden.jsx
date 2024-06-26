import "../TomarOrden/TomarOrden.css"
import { useLocation, useNavigate } from 'react-router-dom';
import { Header } from '../../Header/Header';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export function TomarOrden(){
    const location = useLocation();
    const navigate = useNavigate();
    const { state } = location;
    const { documentoEmpleado, sucursal } = state || {};
    console.log(documentoEmpleado);
    const [productos, setProductos] = useState([]);
    const [detallesOrden, setDetallesOrden] = useState([]);
    const [inventario, setInventario] = useState([]);
    const { idSucursal } = useParams();
    const { idMesa } = useParams();
    
    useEffect(() => {
        axios.get(`http://localhost:8080/inventario/${idSucursal}`)
            .then(response => {
                setInventario(response.data);
                if (response.data.length > 0) {
                    const idSucursal = response.data[0].sucursal.idSucursal;
                    console.log(idSucursal); // Imprime el idSucursal en la consola
                }
            })
            .catch(error => {
                console.error(error);
                // Aquí puedes manejar los errores.
                // Por ejemplo, podrías mostrar un mensaje de error al usuario.
            });
    }, [idSucursal]);

    const eliminarDeOrden = (index) => {
        const detalleEliminado = detallesOrden[index];
    
        // Incrementar la cantidad en el inventario
        const nuevoInventario = inventario.map(i => {
            if (i.producto.idProducto === detalleEliminado.producto.idProducto) {
                return { ...i, cantidad: i.cantidad + detalleEliminado.cantidad };
            }
            return i;
        });
    
        // Actualizar la cantidad en la base de datos
        const itemInventario = nuevoInventario.find(i => i.producto.idProducto === detalleEliminado.producto.idProducto);
        axios.patch(`http://localhost:8080/inventario/${itemInventario.idInventario}`, { cantidad: itemInventario.cantidad })
            .then(response => {
                console.log('Cantidad actualizada en la base de datos');
                // Actualizar el estado del inventario después de que la petición PATCH se haya completado con éxito
                setInventario(nuevoInventario);
            })
            .catch(error => {
                console.error(error);
                // Aquí puedes manejar los errores.
                // Por ejemplo, podrías mostrar un mensaje de error al usuario.
            });
    
        // Eliminar el detalle de la orden
        const nuevosDetalles = [...detallesOrden];
        nuevosDetalles.splice(index, 1);
        setDetallesOrden(nuevosDetalles);
    };

    const agregarAOrden = (item, cantidad) => {
        // Agregar un nuevo detalle a detallesOrden
        const nuevoDetalle = {
            producto: {
                idProducto: item.producto.idProducto,
                nombreProducto: item.producto.nombreProducto,
                precioProducto: item.producto.precioProducto
            },
            cantidad: cantidad
        };

        setDetallesOrden([...detallesOrden, nuevoDetalle]);

        // Disminuir la cantidad en el inventario
        const nuevoInventario = inventario.map(i => {
            if (i.idInventario === item.idInventario) {
                return { ...i, cantidad: i.cantidad - 1 };
            }
            return i;
        });

        // Actualizar la cantidad en la base de datos
        axios.patch(`http://localhost:8080/inventario/${item.idInventario}`, { cantidad: item.cantidad - 1 })
            .then(response => {
                console.log('Cantidad actualizada en la base de datos');
                // Actualizar el estado del inventario después de que la petición PATCH se haya completado con éxito
                setInventario(nuevoInventario);
            })
            .catch(error => {
                console.error(error);
                // Aquí puedes manejar los errores.
                // Por ejemplo, podrías mostrar un mensaje de error al usuario.
            });
    };

    const subtotal = detallesOrden.reduce((total, detalle) => {
        const cantidad = Number(detalle.cantidad);
        const precioProducto = Number(detalle.producto.precioProducto);
    
        if (isNaN(cantidad) || isNaN(precioProducto)) {
            console.error(`Cantidad o precio del producto no es un número: ${detalle.cantidad}, ${detalle.producto.precioProducto}`);
            return total;
        }
    
        return total + cantidad * precioProducto;
    }, 0);

    const crearOrden = () => {
        const requestBody = {
            mesa: {
                idMesa: idMesa,
                idEstadoMesa: {
                    idEstadoMesa: 2
                }
            },
            sucursal: {
                idSucursal: idSucursal
            },
            estadoOrden: {
                idEstado: 1
            },
            empleado: {
                documento: documentoEmpleado
            },
            detalles: detallesOrden.map(detalle => ({
                producto: {
                    idProducto: detalle.producto.idProducto
                },
                cantidad: detalle.cantidad
            }))
        };
        
        axios.post('http://localhost:8080/ordenes/crear', requestBody)
            .then(response => {
                console.log('Orden creada con éxito');
                // Aquí puedes manejar la respuesta.
                // Por ejemplo, podrías actualizar el estado de tu componente con la nueva orden.
                navigate('/HomeMesero', { state: { sucursal, documentoEmpleado}});
            })
            .catch(error => {
                console.error(error);
                // Aquí puedes manejar los errores.
                // Por ejemplo, podrías mostrar un mensaje de error al usuario.
            });
    };
    
    return(
        <section>
            <Header />
            <div className="orden-info">
                <div className="orden-info-productos">
                    <h1>Productos disponibles</h1>
                    <table>
                        <thead>
                            <tr>
                                <th>Producto</th>
                                <th>Precio</th>
                                <th>Cantidad</th>
                                <th className="columna-añadir">Añadir</th>
                            </tr>
                        </thead>
                        <tbody>
                        {inventario.map(item => (
                            <tr key={item.idInventario}>
                                <td>{ item.producto.nombreProducto }</td>
                                <td>${ item.producto.precioProducto.toLocaleString('en-US') }</td>
                                <td>{ item.cantidad }</td>
                                <td><button onClick={() => agregarAOrden(item, 1)}>+</button></td>
                            </tr>
                        ))}  
                        </tbody>
                    </table>
                </div>
                <div className="orden-subtotal">
                    <h1>Orden y subtotal</h1>
                    <table>
                        <thead>
                            <tr>
                                <th>Producto</th>
                                <th>Cantidad</th>
                                <th>Precio</th>
                                <th>Eliminar</th>
                            </tr>
                        </thead>
                        <tbody>
                            {detallesOrden.map((detalle, index) => (
                                <tr key={index}>
                                    <td>{detalle.producto.nombreProducto}</td>
                                    <td>{detalle.cantidad}</td>
                                    <td>${detalle.producto.precioProducto.toLocaleString('en-US')}</td>
                                    <td><button onClick={() => eliminarDeOrden(index)}>Eliminar</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <h2>Total a pagar: ${subtotal.toLocaleString('en-US')}</h2>
                    <button onClick={crearOrden}>Crear orden</button>
                </div>
            </div>
        </section>
    );
}
