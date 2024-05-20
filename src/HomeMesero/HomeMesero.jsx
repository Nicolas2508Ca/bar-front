import "../HomeMesero/HomeMesero.css"
import { useLocation, useNavigate } from 'react-router-dom';
import { Header } from '../Header/Header';
import { useEffect, useState } from "react";
import axios from "axios";

export function HomeMesero(){
    const location = useLocation();
    const { state } = location;
    const { sucursal, documentoEmpleado } = state || {};

    const navigate = useNavigate();
    const [mesas, setMesas] = useState([]);
    const [error, setError] = useState(null);


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

    const TomarOrden = (mesa) => {
        navigate(`/HomeMesero/${sucursal.idSucursal}/TomarOrden/${mesa.idMesa}`, { state: {documentoEmpleado, sucursal}});
    }
    
    
    return(
        <section>
            <Header />
            <div className="home-sucursal">
                <h1 className="sucursal-titulo">{sucursal.nombreSucursal} - Mesas disponibles</h1>
                <div className="home-mesero">
                    <div className="mesas">
                        {error && <p>{error}</p>}
                        {mesas.map((mesa, index) => (
                            <div className="mesas-box" key={index} onClick={() => TomarOrden(mesa)}>
                                <img className="mesas-sucursal" src='mesa-de-comedor.png' alt={`Mesa ${index + 1}`} />
                                <p className="mesa-nombre">{mesa.nombreMesa}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}