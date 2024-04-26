import "../TomarOrden/TomarOrden.css"
import { useLocation, useNavigate } from 'react-router-dom';
import { Header } from '../../Header/Header';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export function TomarOrden(){
    const location = useLocation();
    const { documentoEmpleado } = location.state || {};
    const [productos, setProductos] = useState([]);
    const [orden, setOrden] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8080/productos')
            .then(response => {
                console.log(response.data);
                setProductos(response.data);
            })
            .catch(error => console.error(error));
    }, []);

    const añadirAOrden = (producto) => {
        setOrden(prevOrden => [...prevOrden, producto]);
    }

    return(
        <section>
            <Header />
            <h1 className="orden-titulo">Numero mesa</h1>
            <div className="orden-info">
                <div className="orden-info-productos">
                    <h1>Productos disponibles</h1>
                    <table>
                        <thead>
                            <tr>
                                <th>Producto</th>
                                <th>Precio</th>
                                <th className="columna-añadir">Añadir</th>
                            </tr>
                        </thead>
                        <tbody>
                        {productos.map(producto => (
                            <tr key={producto.idProducto}>
                                <td>{ producto.nombreProducto }</td>
                                <td>{ producto.precioProducto }</td>
                                <td><button onClick={() => añadirAOrden(producto)}>+</button></td>
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
                        {orden.map((producto, index) => (
                            <tr key={index}>
                                <td>{producto.nombreProducto}</td>
                                <td>{producto.precioProducto}</td>
                                <td>1</td>
                                <td><input type="text" /></td>
                                <td>{producto.precioProducto}</td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                    <h2>Total a pagar: 200</h2>
                    <button>Enviar orden</button>
                </div>
            </div>
        </section>
    )
}