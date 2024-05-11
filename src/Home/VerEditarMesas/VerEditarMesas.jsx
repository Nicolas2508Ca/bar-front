import { Header } from '../../Header/Header';
import { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from 'react-router-dom';
import './VerEditarMesas.css';

export function VerEditarMesas() {

    const location = useLocation();
    const { state } = location;
    const { sucursal } = state || {};

    const navigate = useNavigate();
    const [mesas, setMesas] = useState([]);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        console.log(sucursal)
        if (sucursal) {
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
        }
    }, [sucursal]);

    const crear = () => {
        navigate(`/sucursales/${sucursal.idSucursal}/mesas/crear`, { state: { sucursal } });
    };

    const eliminar = (id) => {
        axios.delete(`http://localhost:8080/mesas/${id}`)
            .then(response => {
                // Actualiza la lista de empleados después de eliminar uno
                setMesas(mesas.filter(mesa => mesa.idMesa !== id));
            })
            .catch(error => console.error(error));
    };

    const actualizarMesa = (mesa) => {
        navigate(`/sucursales/${sucursal.idSucursal}/mesas/editar/${mesa.idMesa}`, { state: { sucursal, mesa } });
    };

    return(
        <section>
            <Header />
            <div className="home-sucursal">
                <div className='home-sucursal-titulo'>
                    <h1 className="sucursal-titulo">{sucursal.nombreSucursal}</h1>
                    <div>
                        <button className="boton-sucursales" onClick={() => navigate(`/home`)}>Ir a sucursales</button>
                        <button className="boton-crear" onClick={crear}>Crear Mesa</button>
                    </div>
                </div>
                <div className="home-mesero">
                    <div className="mesas">
                        {error && <p>{error}</p>}
                        {mesas.map((mesa, index) => (
                            <div className="mesas-box" key={index}>
                                <img className="mesas-sucursal" src="/mesa-de-comedor.png" alt={`Mesa ${index + 1}`} />
                                <p className="mesa-nombre">{mesa.nombreMesa}</p>
                                <div className='acciones-mesa'>
                                    <button 
                                    className='home_tabla-editar' 
                                    onClick={() => actualizarMesa(mesa)}>
                                        <img src='/lapiz.svg'/>
                                    </button>
                                    <button 
                                    className='home_tabla-eliminar'
                                    onClick={() => eliminar(mesa.idMesa)}>
                                        <img src='/eliminar.svg'/>
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}