import { Header } from "../Header/Header";
import "./HomeCajero.css"
import { useLocation, useNavigate } from "react-router-dom";

import { useEffect, useState } from "react"
import axios from "axios";

export function HomeCajero() {
    const location = useLocation();
    const { state } = location;
    const navigate = useNavigate();
    const { sucursal, documentoEmpleado } = location.state || {};
    const [mesas, setMesas] = useState([])
    const [ error, setError] = useState(null);
    
    useEffect(() => {
        axios.get(`http://localhost:8080/mesas/${sucursal.idSucursal}`)
            .then(response => {
                console.log(response.data)
                setMesas(response.data)
            })
            .catch(error => 
                {
                console.log(error);
                setError("Error al cargar las mesas");}
        )
    }, []);

    const irInventario = () => {
        navigate('/HomeCajero/inventario', { state: { sucursal }});
    };

    return (
        <section>
    <Header />
    <div className="home-sucursal">
        <h1 className="sucursal-titulo">{sucursal.nombreSucursal}</h1>
        <button className="alimentar-button" onClick={irInventario}>Alimentar inventario</button>
    </div>
    <div className="home-cajero">
        <div className="mesas">
            {error && <p>{error}</p>}
            {mesas.map((mesa, index) => (
                <div className="mesas-box" key={index}>
                    <img className="mesas-sucursal" src="mesa-de-comedor.png" alt={`Mesa ${index + 1}`} />
                    <p className="mesa-nombre">{mesa.nombreMesa}</p>
                </div>
            ))}
        </div>
    </div>
</section>

    );
}