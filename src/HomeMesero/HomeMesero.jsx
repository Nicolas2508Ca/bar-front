import "../HomeMesero/HomeMesero.css"
import { useNavigate } from 'react-router-dom';
import { Header } from '../Header/Header';

export function HomeMesero(){

    const navigate = useNavigate();

    const TomarOrden = () => {
        navigate('/HomeMesero/TomarOrden');
    }
    
    return(
        <section>
            <Header />
            <div className="home-sucursal">
                <h1 className="sucursal-titulo">Nombre sucursal</h1>
                <div className="home-mesero">
                    <div className="mesas">
                        <div className="mesas-box" onClick={TomarOrden}>
                            <img className="mesas-sucursal" src="mesa-de-comedor.png"></img>
                            <p className="mesa-nombre">Nombre mesa</p>
                        </div>
                        <div className="mesas-box" onClick={TomarOrden}>
                            <img className="mesas-sucursal" src="mesa-de-comedor.png"></img>
                            <p className="mesa-nombre">Nombre mesa</p>
                        </div>
                        <div className="mesas-box" onClick={TomarOrden}>
                            <img className="mesas-sucursal" src="mesa-de-comedor.png"></img>
                            <p className="mesa-nombre">Nombre mesa</p>
                        </div>
                        <div className="mesas-box" onClick={TomarOrden}>
                            <img className="mesas-sucursal" src="mesa-de-comedor.png"></img>
                            <p className="mesa-nombre">Nombre mesa</p>
                        </div>
                        <div className="mesas-box" onClick={TomarOrden}>
                            <img className="mesas-sucursal" src="mesa-de-comedor.png"></img>
                            <p className="mesa-nombre">Nombre mesa</p>
                        </div>
                        <div className="mesas-box" onClick={TomarOrden}>
                            <img className="mesas-sucursal" src="mesa-de-comedor.png"></img>
                            <p className="mesa-nombre">Nombre mesa</p>
                        </div>
                        <div className="mesas-box" onClick={TomarOrden}>
                            <img className="mesas-sucursal" src="mesa-de-comedor.png"></img>
                            <p className="mesa-nombre">Nombre mesa</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    )
}