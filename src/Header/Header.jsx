import React from 'react';
import './Header.css';

export function Header ()  {

    const handleLogout = () => {
        // Aquí puedes poner la lógica para desloguear al usuario
        // Por ejemplo, puedes borrar el usuario del estado de la aplicación o del almacenamiento local
        // Luego, redirige al usuario a la página de inicio de sesión
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

