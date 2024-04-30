import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { Header } from "../../Header/Header";
import { useEffect, useState } from "react";
import './Orden.css'
import axios from "axios";


export function Orden() {
    const location = useLocation();
    const { state } = location;
    const { idMesa, sucursal } = state || {};
    const navigate = useNavigate();
    console.log(idMesa)
    const [orden, setOrden] = useState({});
    const [error, setError] = useState(null);
    const [detalles, setDetalles] = useState([{}]);
    const [pagado, setPagado] = useState(false);

    const handlePagarOrden = () => {
        axios.patch(`http://localhost:8080/ordenes/pagar/${orden.idOrden}`, {
            mesa: {
                idMesa: idMesa
            },
            idEstado: {
                idEstado: 2
            }
            
        })
            .then(response => {
                navigate(`/HomeCajero`, { state: {sucursal} });
            })
        setPagado(true);
    };

    useEffect(() => {
        axios.get(`http://localhost:8080/ordenes/${idMesa}`)
            .then(response => {
                setOrden(response.data)
                setDetalles(response.data.detalles)
            })
            .catch(error => 
                {
                console.log(error);
                setError("Error al cargar las ordenes");}
        )
    }, []);
    return (
        <section>
            <Header />
            <div className="orden-titulo">
                <h2>Tu orden es la # {orden.idOrden}</h2>
            </div>
            <div className="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>Producto</th>
                            <th>Cantidad</th>
                            <th>Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {detalles.map((detalle, index) => (
                            <tr key={index}>
                                <td>{detalle.producto && detalle.producto.nombreProducto}</td>
                                <td>{detalle.cantidad}</td>
                                <td>{detalle.subtotal}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="info-orden-total">
                    <p className="total-a-pagar">Total a pagar: {orden.totalOrden}</p>
                    {!pagado && (
                        <button className="pagar-btn" onClick={handlePagarOrden}>
                            Pagar Orden
                        </button>
                    )}
                    {pagado && <p>La orden ha sido pagada.</p>}
                </div>
            </div>
        </section>
    );
}
