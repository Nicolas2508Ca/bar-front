import "./Inventario.css"
import React, { useEffect, useState } from "react"
import axios from "axios"
import { Header } from "../../Header/Header";
import { useLocation } from "react-router-dom";

export function Inventario(){

    const location = useLocation();
    const { state } = location;
    const {sucursal} = location.state || {};
    const [existencias, setExistencias] = useState([]);
    const [error, setError] = useState(null)

    useEffect(() => {
        axios.get(`http://localhost:8080/inventario/${sucursal.idSucursal}`)
            .then(response => {
                console.log(response.data)
                setExistencias(response.data)
            })
            .catch(error => {
                setError("No se pudieron cargar los productos")
            })
    }, [])

    const actualizarInventario = (existencia) => {
        const cantidadIngresada = parseInt(document.getElementById(`cantidad-${existencia.idInventario}`).value) || 0;
        const cantidadActual = existencia.cantidad;
        const nuevaCantidad = cantidadActual + cantidadIngresada;

        axios.patch(`http://localhost:8080/inventario/${existencia.idInventario}`, { cantidad: nuevaCantidad })
            .then(response => {
                console.log('Inventario actualizado con éxito');

                // Actualiza el estado de existencias con la nueva cantidad.
                setExistencias(existencias.map(item => {
                    if (item.idInventario === existencia.idInventario) {
                        document.getElementById(`cantidad-${existencia.idInventario}`).value = "";
                        return { ...item, cantidad: nuevaCantidad };
                    } else {
                        return item;
                    }
                }));
            })
            .catch(error => {
                console.error(error);
                // Aquí puedes manejar los errores.
                // Por ejemplo, podrías mostrar un mensaje de error al usuario.
            });
    };

    return(
        <section>

        <Header/>
        <div className="table-container">
            <h2 className="titulo-inventario">Productos en Existencia por Sucursal</h2>
            <table>
                <thead>
                    <tr>
                        <th>Nombre del producto</th>
                        <th>Cantidad</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {existencias.map(existencia => (
                        <tr key={existencia.idInventario}>
                            <td>{existencia.producto.nombreProducto}</td>
                            <td>{existencia.cantidad}</td>
                            <td>
                                <input type="number" min="0" id={`cantidad-${existencia.idInventario}`} />
                                <button className="actualizar-inventario" onClick={() => actualizarInventario(existencia)}>Añadir al inventario</button>
                            </td>
                        </tr>
                        
                    ))}
                </tbody>
            </table>
        </div>
        </section>
    );
}