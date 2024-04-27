import "../TomarOrden/TomarOrden.css"
import { Header } from '../../Header/Header';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export function TomarOrden(){

    const [orden, setOrden] = useState([]);
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

    const agregarAOrden = (item) => {
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
            
                // Agregar el producto a la orden o incrementar su cantidad si ya está en la orden
                const productoEnOrden = orden.find(o => o.idInventario === item.idInventario);
                let nuevaOrden;
                if (productoEnOrden) {
                    // Si el producto ya está en la orden, incrementar la cantidad
                    nuevaOrden = orden.map(o => {
                        if (o.idInventario === item.idInventario) {
                            return { ...o, cantidad: o.cantidad + 1, idMesa: idMesa };
                        }
                        return o;
                    });
                } else {
                    // Si el producto no está en la orden, agregarlo con una cantidad de 1
                    nuevaOrden = [...orden, { ...item, cantidad: 1, Mesa: idMesa }];
                }
                setOrden(nuevaOrden);
            })
            .catch(error => {
                console.error(error);
                // Aquí puedes manejar los errores.
                // Por ejemplo, podrías mostrar un mensaje de error al usuario.
            });
    };

    const subtotal = orden.reduce((total, item) => {
        const cantidad = Number(item.cantidad);
        const precioProducto = Number(item.producto.precioProducto);
    
        if (isNaN(cantidad) || isNaN(precioProducto)) {
            console.error(`Cantidad o precio del producto no es un número: ${item.cantidad}, ${item.producto.precioProducto}`);
            return total;
        }
    
        return total + cantidad * precioProducto;
    }, 0);

    const crearOrden = (orden) => {
        console.log(orden[0]);
        axios.post('http://localhost:8080/ordenes/crear', orden[0])
            .then(response => {
                console.log('Orden creada con éxito');
                // Aquí puedes manejar la respuesta.
                // Por ejemplo, podrías actualizar el estado de tu componente con la nueva orden.
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
                                <td>{ item.producto.precioProducto }</td>
                                <td>{ item.cantidad }</td>
                                <td><button  onClick={() => {
                                    console.log("Añadir producto a la orden");
                                    agregarAOrden(item)}}>+</button></td>
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
                                <th>Precio</th>
                                <th>Cantidad</th>
                                <th>Comentarios</th>
                                <th>Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Object.values(orden).map((item, index) => (
                                <tr key={index}>
                                    <td>{item.producto.nombreProducto}</td>
                                    <td>{item.producto.precioProducto}</td>
                                    <td>{item.cantidad}</td>
                                    <td><input type="text"/></td>
                                    <td>{item.producto.precioProducto * item.cantidad}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <h2>Total a pagar: {subtotal}</h2>
                    <button onClick={() => crearOrden(orden)}>Crear orden</button>
                </div>
            </div>
        </section>
    )
}
