import "./Formulario.css"
import { useState } from "react"
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export function Formulario({setUser}){

    const [identificacion, setIdentificacion] = useState("")
    const [contrasenia, setContrasenia] = useState("")
    const [error, setError] = useState("")
    const [loginMessage, setLoginMessage] = useState("") 
    const [sucursalId, setSucursalId] = useState("");
    const [documentoEmpleado, setDocumentoEmpleado] = useState("");
    const navigate = useNavigate();

    const handleSubmit = event => {
        event.preventDefault()
        if(identificacion === "" || contrasenia === ""){
            setError(true)
            return
        }
        setError(false)

        axios.post('http://localhost:8080/login', null,{ 
            params: {

                documento: identificacion,
                contrasenia: contrasenia
            }, withCredentials: true
        })
        .then(response => {
            const{ mensaje, sucursal, documentoEmpleado } = response.data
            console.log("Recibe respuesta: ");
<<<<<<< HEAD
            console.log(response.data)
            if (mensaje === "Inicio de sesión exitoso admin") {                
                navigate('/home', { state: { sucursal, documentoEmpleado}}); // Redirige a la página de inicio si la respuesta es exitosa
=======
            if (mensaje === "Inicio de sesión exitoso admin") {
                navigate('/home', { state: { sucursal, documentoEmpleado } });
            } else if (mensaje === "Inicio de sesión exitoso mesero") {
                navigate('/HomeMesero', { state: { sucursal, documentoEmpleado } });
            } else if (mensaje === "Inicio de sesión exitoso cajero") {
                navigate('/HomeCajero', { state: { sucursal, documentoEmpleado}});
>>>>>>> 922800050912ebfbb0e1e181aa394bca54d72ba8
            } else {
                setLoginMessage(mensaje);
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
                type="number" 
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