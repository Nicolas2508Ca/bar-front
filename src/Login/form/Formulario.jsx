import "./Formulario.css"
import { useState } from "react"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export function Formulario({setUser}){
    const [identificacion, setIdentificacion] = useState("")
    const [contrasenia, setContrasenia] = useState("")
    const [error, setError] = useState("")
    const [loginMessage, setLoginMessage] = useState("") // Nuevo estado para el mensaje de inicio de sesión
    const navigate = useNavigate();

    const handleSubmit = event => {
        event.preventDefault()
        if(identificacion === "" || contrasenia === ""){
            setError(true)
            return
        }
        setError(false)

        // Realiza una solicitud POST a la API de inicio de sesión
        axios.post('http://localhost:8080/login', null,{ 
            params: {

                documento: identificacion,
                contrasenia: contrasenia
            }
        })
        .then(response => {
            if (response.data === "Inicio de sesión exitoso") {

                setUser(identificacion); // Actualiza el estado del usuario solo si la respuesta es exitosa
                navigate('/home'); // Redirige a la página de inicio si la respuesta es exitosa
            } else {
                setLoginMessage(response.data); // Muestra un mensaje de error si la respuesta no es exitosa
            }
        })
        .catch(error => {
            console.error(error); // Imprime el error en la consola si hay uno
        });
    }

    return(
        <section className="formulario">
            <img className="formulario_imagen" src="../user.png"></img>
            <h1>MEMBER LOGIN</h1>
            <form 
            className="formulario"
            onSubmit={handleSubmit}
            >
                <input
                className="formulario_input"
                type="text" 
                placeholder="Nº de identificación"
                onChange={(event) => setIdentificacion(event.target.value)}
                />
                <input
                className="formulario_input"
                type="password" 
                placeholder="Contraseña"
                onChange={(event) => setContrasenia(event.target.value)}
                />
                <button className="formulario_boton">Iniciar sesion</button>
            </form>
            {error && <p>Por favor, complete todos los campos</p>}
            <p>{loginMessage}</p>
        </section>
    )
}