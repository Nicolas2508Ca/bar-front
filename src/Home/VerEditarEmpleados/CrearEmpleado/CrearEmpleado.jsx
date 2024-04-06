import axios from 'axios';
import './CrearEmpleado.css'; // Importa tu archivo CSS
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';


export function CrearEmpleado() {
  const [documento, setDocumento] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [telefono, setTelefono] = useState("");
  const [cargo, setCargo] = useState([]);
  const [tipodocumento, setTipoDocumento] = useState([]);
  const [sucursal, setSucursal] = useState("");

  const [selectedTipoDocumento, setSelectedTipoDocumento] = useState('');
  const [selectedCargo, setSelectedCargo] = useState('');
  const [sucursalId, setSucursalId] = useState('');
  const { idSucursal } = useParams();

  const generarContrasenaTemporal = () => {
    // Genera una contraseña temporal de 8 caracteres
    return Math.random().toString(36).slice(-8);
  };

  useEffect(() => {
    axios.get('http://localhost:8080/tipodocumento')
      .then(response => {
        // Asegúrate de que response.data es un array antes de establecerlo como el valor de tipodocumento
        if (Array.isArray(response.data)) {
          setTipoDocumento(response.data);
        } else {
          console.error('La respuesta de la API no es un array: ', response.data);
        }
      })
      .catch(error => {
        console.error('Hubo un error al obtener los tipos de documento: ', error);
      });
  }, []);

  useEffect(() => {
    axios.get('http://localhost:8080/cargo')
      .then(response => {
        if (Array.isArray(response.data)) {
          setCargo(response.data);
        } else {
          console.error('La respuesta de la API no es un array: ', response.data);
        }
      })
      .catch(error => {
        console.error('Hubo un error al obtener los cargos: ', error);
      });
  }, []);

  useEffect(() => {
    setSucursalId(idSucursal);
  }, [idSucursal]);

  const navigate = useNavigate();

  const crearEmpleado = async (event) => {
    event.preventDefault();

    const empleado = {
      documento: documento,
      nombre: nombre,
      apellido: apellido,
      email: email,
      telefono: telefono,
      contrasenia: generarContrasenaTemporal(),
      idRol: selectedCargo, // Aquí deberías usar selectedCargo
      idTipoDoc: selectedTipoDocumento, // Aquí deberías usar selectedTipoDocumento
      idSucursal: sucursalId, // Aquí deberías usar sucursalId
    };

    try {
      await axios.post('http://localhost:8080/empleados', empleado, { withCredentials:true}); // Asegúrate de incluir 'http://' en la URL
      navigate(`/sucursales/${idSucursal}/empleados`);
    } catch (error) {
      console.error('Hubo un error al crear el empleado: ', error.response);
    }
  };

  return (
    <div className="crear-sucursal-container">
      <h2 className="crear-sucursal-title">Crear nuevo empleado</h2>
      <form className="crear-sucursal-form" onSubmit={crearEmpleado}>

        <label htmlFor="documento">Documento:</label>
        <input 
        type="number" 
        id="documento" 
        name="documento" 
        value={documento}
        onChange={e => setDocumento(e.target.value)}/>

        <label htmlFor="nombre">Nombre:</label>
        <input 
        type="text" 
        id="nombre" 
        name="nombre"
        onChange={e => setNombre(e.target.value)}
        value={nombre}/>

        <label htmlFor="apellido">Apellido:</label>
        <input 
        type="text" 
        id="apellido" 
        name="apellido"
        value={apellido}
        onChange={e => setApellido(e.target.value)}/>

        <label htmlFor="email">Email:</label>
        <input 
        type="text" 
        id="email" 
        name="email"
        value={email}
        onChange={e => setEmail(e.target.value)}/>

        <label htmlFor="telefono">Telefono:</label>
        <input 
        type="text" 
        id="telefono" 
        name="telefono"
        value={telefono}
        onChange={e => setTelefono(e.target.value)}/>

        <label htmlFor="cargo">Cargo:</label>
        <select 
        className="select-style"
        type="text" 
        id="cargo" 
        name="cargo"
        value={selectedCargo}
        onChange={e => setSelectedCargo(e.target.value)}>
        {cargo.map(cargo => (
          <option key={cargo.idRol} value={cargo.idRol}>{cargo.nombreRol}</option>
        ))}
        </select>

        <label htmlFor="tipodocumento">Tipo documento:</label>
        <select 
        className="select-style"
        type="text" 
        id="tipodoocumento" 
        name="tipodoocumento"
        value={selectedTipoDocumento}
        onChange={e => setSelectedTipoDocumento(e.target.value)}>
        {tipodocumento.map(tipo => (
          <option key={tipo.idTipoDoc} value={tipo.idTipoDoc}>{tipo.nombreTipoDoc}</option>
        ))}
        </select>

        <label htmlFor="sucursal">Sucursal</label>
        <input 
        type="text" 
        id="sucursal" 
        name="sucursal"
        value={sucursalId}
        readOnly/>

        <button type="submit">Crear</button>
      </form>
    </div>
  );
}
