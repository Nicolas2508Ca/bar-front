import axios from 'axios';
import React, { useEffect, useState } from 'react';


export function GenerarReporte() {
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaFinal, setFechaFinal] = useState('');
    const [selectedSucursal, setSelectedSucursal] = useState(null);

    const [sucursal, setSucursal] = useState([]);

    function formatFecha(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Agrega un cero delante si es necesario
        const day = String(date.getDate()).padStart(2, '0'); // Agrega un cero delante si es necesario
        return `${year}-${month}-${day}`;
    }

    useEffect(() => {
        axios.get('http://localhost:8080/sucursales')
          .then(response => {
            if (Array.isArray(response.data)) {
              setSucursal(response.data);
            } else {
              console.error('La respuesta de la API no es un array: ', response.data);
            }
          })
          .catch(error => {
            console.error('Hubo un error al obtener las sucursales: ', error);
          });
      }, []);

    const handleSubmit = (event) => {
        console.log('Ejecuta sumbit')
        event.preventDefault();
    
        // Formatea las fechas según el formato requerido (yyyy-MM-dd)
        const formattedFechaInicio = formatFecha(new Date(fechaInicio));
        const formattedFechaFinal = formatFecha(new Date(fechaFinal));
    
        // Crea un objeto con los datos del reporte
        const reporteData = {
            fechaInicio: formattedFechaInicio,
            fechaFinal: formattedFechaFinal,
            idSucursal: sucursal.idSucursal
        };
        
        
        // Envía la solicitud POST con los datos en el cuerpo
        axios.post('http://localhost:8080/reporte/descargar', reporteData, { responseType: 'blob' })
    .then(response => {
        // Crea un objeto Blob con los datos de la respuesta

        const blob = new Blob([response.data], { type: 'application/vnd.ms-excel' });

        // Crea una URL de objeto para el Blob
        const url = window.URL.createObjectURL(blob);

        // Crea un enlace <a> para iniciar la descarga
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'reporte.xls');

        // Simula hacer clic en el enlace para iniciar la descarga
        document.body.appendChild(link);
        link.click();

        // Limpia la URL del objeto después de la descarga
        window.URL.revokeObjectURL(url);
    })
    .catch(error => {
        console.error('Error al generar el reporte:', error);
        // Maneja el error aquí
    });
    };
    

    return (
        <form className="form" onSubmit={handleSubmit}>
            <label>Sucursal</label>
            <select 
              type="text" 
              required
              value={selectedSucursal ? selectedSucursal.idSucursal : ''}
              onChange={e =>
               {
                console.log(e.target.value);
                setSelectedSucursal(sucursal.find(sucursal => sucursal.idSucursal === parseInt(e.target.value)));}}>
                <option value="" disabled>Selecciona una sucursal</option>
                <option value={null}>Todas sucursales</option>
              {sucursal.map(sucursal => (
                <option key={sucursal.idSucursal} value={sucursal.idSucursal}>{sucursal.nombreSucursal}</option>
              ))}
              </select>

            <label htmlFor="fechaInicio">Fecha Inicio reporte</label>
            <input
                type="date"
                id="fechaInicio"
                value={fechaInicio}
                onChange={(e) => setFechaInicio(e.target.value)}
            />
            <label htmlFor="fechaFin">Fecha Fin reporte</label>
            <input
                type="date"
                id="fechaFin"
                value={fechaFinal}
                onChange={(e) => setFechaFinal(e.target.value)}
            />
            <div className="form-submit">
                <button type="submit" className="form-button">Generar reporte</button>
            </div>
        </form>
    );
}
