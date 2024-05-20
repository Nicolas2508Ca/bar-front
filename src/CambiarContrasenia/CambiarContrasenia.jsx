import { Header } from '../Header/Header';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';

export function CambiarContrasenia() {
    const location = useLocation();
    const [nuevaContrasena, setNuevaContrasena] = useState('');
    const [confirmacionContrasena, setConfirmacionContrasena] = useState('');
    const { documentoEmpleado } = useLocation().state;
    const navigate = useNavigate();

    const cambiarContrasena = (event) => {
        event.preventDefault();

        console.log('documentoEmpleado:', documentoEmpleado);

        if (nuevaContrasena !== confirmacionContrasena) {
            // Las contraseñas no coinciden
            // Aquí puedes mostrar un mensaje de error al usuario
            return;
        }

        axios.patch(`http://localhost:8080/empleados/${documentoEmpleado}`, { contrasenia: nuevaContrasena })
            .then(response => {
                // La contraseña se ha cambiado con éxito
                // Aquí puedes redirigir al usuario a la página de inicio de sesión o mostrar un mensaje de éxito
                navigate('/');
            })
            .catch(error => {
                console.error(error);
                // Aquí puedes manejar los errores.
                // Por ejemplo, podrías mostrar un mensaje de error al usuario.
            });
    };

    return (
        <section>
            <Header />
            <div className="crear-sucursal-container">
                <h2 className="crear-sucursal-title">Reestablecer contraseña</h2>
                <form className="crear-sucursal-form" onSubmit={cambiarContrasena}>
                    <label htmlFor="password">Nueva contraseña <span className="required">*</span></label>
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        autoComplete="off"
                        required
                        value={nuevaContrasena}
                        onChange={e => setNuevaContrasena(e.target.value)}
                    />

                    <label htmlFor="confirmacion">Confirmacion nueva contraseña <span className="required">*</span></label>
                    <input 
                        type="password" 
                        id="confirmacion" 
                        name="confirmacion" 
                        autoComplete="off"
                        required
                        value={confirmacionContrasena}
                        onChange={e => setConfirmacionContrasena(e.target.value)}
                    />

                    <div className='form-boton'>
                            <button className='form-crear' type="submit">Cambiar contraseña</button>
                    </div>
                </form>
            </div>
        </section>
    );
}