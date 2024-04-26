import './App.css';
import { Formulario } from './Login/form/Formulario';
import { Home } from './Home/Home'
import { Routes, Route } from 'react-router-dom'
import { useState } from "react"
import { CrearSucursal } from './Home/CrearSucursal/CrearSucursal'
import { EditarSucursal } from './Home/EditarSucursal/EditarSucursal'
import { VerEditarEmpleados } from './Home/VerEditarEmpleados/VerEditarEmpleados';
import { CrearEmpleado } from './Home/VerEditarEmpleados/CrearEmpleado/CrearEmpleado';
import { EditarEmpleado } from './Home/VerEditarEmpleados/EditarEmpleado/EditarEmpleado';
import { HomeMesero } from './HomeMesero/HomeMesero';
import { TomarOrden } from './HomeMesero/TomarOrden/TomarOrden'
import { HomeCajero } from './HomeCajero/HomeCajero';
import { Inventario } from './HomeCajero/inventario/Inventario';

function App() {

  return (
    <div>
      <Routes>
        <Route path='/' element={<Formulario/>}></Route>
        <Route path='/HomeMesero' element={<HomeMesero/>}></Route>
        <Route path='/HomeMesero/TomarOrden' element={<TomarOrden/>}></Route>
        <Route path='/Home' element={<Home/>}></Route>
        <Route path='/Home/CrearSucursal' element={<CrearSucursal/>}></Route>
        <Route path='/Home/EditarSucursal/:id' element={<EditarSucursal/>}></Route>
        <Route path='/sucursales/:idSucursal/empleados' element={<VerEditarEmpleados/>}></Route>
        <Route path='/sucursales/:idSucursal/empleados/CrearEmpleado' element={<CrearEmpleado/>}></Route>
        <Route path='/sucursales/:idSucursal/empleados/EditarEmpleado/:documento' element={<EditarEmpleado/>}></Route>
        <Route path='/HomeCajero' element={<HomeCajero/>}></Route>
        <Route path='/HomeCajero/inventario' element={<Inventario/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
