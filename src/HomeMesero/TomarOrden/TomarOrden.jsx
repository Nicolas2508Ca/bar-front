import "../TomarOrden/TomarOrden.css"
import { useNavigate } from 'react-router-dom';
import { Header } from '../../Header/Header';

export function TomarOrden(){
    return(
        <section>
            <Header />
            <h1 className="orden-titulo">Numero mesa</h1>
            <div className="orden-info">
                <div>
                    <h1>Productos disponibles</h1>
                    <table>
                        <thead>
                            <tr>
                                <th>Producto</th>
                                <th>Precio</th>
                                <th>Añadir</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Producto 1</td>
                                <td>100</td>
                                <button>+</button>
                            </tr>
                        </tbody>
                    </table>
                    
                </div>
                <div>
                    <h1>Orden y subtotal</h1>
                    <table>
                        <thead>
                            <tr>
                                <th>Producto</th>
                                <th>Precio</th>
                                <th>Cantidad</th>
                                <th>Comentarios</th>
                                <th>Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Producto 1</td>
                                <td>100</td>
                                <td>2</td>
                                <td>Muy fria</td>
                                <td>200</td>
                            </tr>
                        </tbody>
                    </table>
                    <h2>Total a pagar: 200</h2>
                    <button>Enviar orden</button>
                </div>
            </div>
        </section>
    )
}