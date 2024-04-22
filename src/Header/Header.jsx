import React from 'react';
import './Header.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export function Header ()  {

    const navigate = useNavigate();

    const handleLogout = () => {
        axios.get('http://localhost:8080/logout', { withCredentials: true })
        .then(response => {
            if (response.data === "Haz salido de la sesión") {
                navigate('/'); // Redirige a la página de inicio de sesión
            }
            else {
                console.log(response.data); // Imprime un mensaje de error si la respuesta no es exitosa
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    };

    return (
        <header className='header'>
            <div className='header-box'>
                <button onClick={handleLogout} className='header-boton'>
                    <img src='/logout.svg'></img>
                </button>
            </div>
        </header>
    );
};

