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
    const [cambio, setCambio] = useState({});
    const [cantidadEntregada, setCantidadEntregada] = useState(0);

    function calcularCambio(cantidadEntregada, totalOrden) {
        let denominaciones = [100000, 50000, 20000, 10000, 5000, 2000, 1000, 500, 200, 100, 50]; // Ajusta las denominaciones a las de tu moneda local
        let cambio = cantidadEntregada - totalOrden;
        let resultado = {};
    
        for (let i = 0; i < denominaciones.length; i++) {
            let monedaActual = denominaciones[i];
    
            if (cambio >= monedaActual) {
                let cantidadMonedas = Math.floor(cambio / monedaActual);
                cambio -= cantidadMonedas * monedaActual;
                resultado[monedaActual] = cantidadMonedas;
            }
        }
    
        return resultado;
    }

    const handleCantidadEntregada = (cantidad) => {
        setCantidadEntregada(cantidad);
        let cambio = calcularCambio(cantidad, orden.totalOrden);
        setCambio(cambio);
    };

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

    let totalCambio = Object.entries(cambio).reduce((total, [denominacion, cantidad]) => total + (parseInt(denominacion) * cantidad), 0);

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
                    <p className="total-a-pagar">Total a pagar: ${orden.totalOrden}</p>
                    <label htmlFor="cantidadEntregada">Cantidad entregada:  </label>
                    <input type="number" id="cantidadEntregada" onChange={e => handleCantidadEntregada(e.target.value)} />
                    <p className="total-a-pagar">Cambio:</p>
                    <div className="cambio">
                    {Object.entries(cambio).map(([denominacion, cantidad]) => (
                        <p className="cambio-voraz" key={denominacion}>{cantidad} de ${parseInt(denominacion).toLocaleString('en-US')}</p>
                    ))}
                    </div>
                    <p className="total-cambio">Total cambio: {totalCambio.toLocaleString('en-US')}</p>
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
