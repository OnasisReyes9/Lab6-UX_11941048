import React, { useState } from 'react';

import Tablero from './Tablero';
import './formulario.css';

import "bootstrap/dist/css/bootstrap.min.css";

function crearTabla() {
    let contador = 0;
    const tabla = [];
    for (let i = 0; i < localStorage.length(); i++) {
        const fila_actual = [];
        for (let j = 0; j < 3; j++) {
            fila_actual.push(contador++);
        }
        tabla.push(fila_actual);
    }
    return tabla;
};//fin funcions

function Formulario() {
    const [vista, setVista] = useState('formulario');
    const [nombre, setNombre] = useState('');
    const [puntaje, setPuntaje] = useState(0);
    const [fecha, setFecha] = useState('');

    //const [tabla, setTabla] = useState

    let date = new Date();
    let output = String(date.getDate()).padStart(2, '0') + '/' + String(date.getMonth() + 1).padStart(2, '0') + '/' + date.getFullYear();
    //setFecha(output);

    function cambiarVista() {
        if (nombre.length > 0) {
            setVista('juego');
            setPuntaje(0);
            setFecha({ output });
            localStorage.setItem('scoreboard', JSON.stringify([nombre, puntaje, output]));

        } else {
            alert("Debes ingresar tu nombre para jugar.");
        }
    }//fin funcion

    if (vista === 'juego') {
        return (
            <div>
                <Tablero />
                <br />
            </div>
        );
    }//fin if 
    return (
        <div className="App">
            <h3 className="titulo">Snake Game</h3><br />
            <img className="image" src="https://cdn.pixabay.com/photo/2016/11/02/14/18/snake-1791699__340.png" />
            <br />
            <input
                className="textfield"
                id="formulario_nombre"
                type="text"
                placeholder="Ingresa tu Nombre"
                onChange={e => setNombre(e.target.value)}
                value={nombre} />
            <button className="boton" id="btn_jugar" onClick={cambiarVista}> Jugar</button>
            <table className="table" id="TableID">
                <thead>
                    <br />
                    <tr>
                        <th>Nombre</th>
                        <th>Puntuación</th>
                        <th>Fecha</th>
                    </tr>
                </thead>
                <tbody className="tbody">
                    <tr>
                        <td>{nombre}</td>
                        <td>{puntaje}</td>
                        <td>{fecha}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );//fin return
}//fin if funcion original

export default Formulario;