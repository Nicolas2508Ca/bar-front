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

    return(
        <section>

        <Header/>
        <div className="table-container">
            <h2>Productos en Existencia por Sucursal</h2>
            <h2>Lista de Productos</h2>
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
                        <tr key={existencia.idExistenciasSucursal}>
                            <td>{existencia.producto.nombreProducto}</td>
                            <td>{existencia.cantidad}</td>
                            <td><button 
                                className='home_tabla-editar' 
                                >
                                    <img src='/lapiz.svg'/>
                                </button>
                                <button 
                                className='home_tabla-eliminar'
                                >
                                    <img src='/eliminar.svg'/>
                                </button>
                                </td>
                        </tr>
                        
                    ))}
                </tbody>
            </table>
        </div>
        </section>
    );
}