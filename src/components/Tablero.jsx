import React, { useEffect, useState } from 'react';
import './Tablero.css';
import useInterval from './useHook';
import Formulario from './Formulario';

class LinkedListNode {
    constructor(valor) {
        this.valor = valor;
        this.siguiente = null;
    }
}

class LinkedList {
    constructor(valor) {
        const nodo = new LinkedListNode(valor);
        this.cabeza = nodo;
        this.cola = nodo;
    }
}

const dimensiones_tablero = 10;

function crearTablero() {
    let contador = 0;
    const tablero = [];
    for (let i = 0; i < dimensiones_tablero; i++) {
        const fila_actual = [];
        for (let j = 0; j < dimensiones_tablero; j++) {
            fila_actual.push(contador++);
        }
        tablero.push(fila_actual);
    }
    return tablero;
};//fin funcions

function Tablero() {
    const [vista, setVista] = useState('tablero');

    const [tablero, setTablero] = useState(crearTablero());
    const [direction, setDirection] = useState('DOWN');
    const [snakeBody, setSnakeBody] = useState(new Set([34]));
    const initialSnakeCoords = tablero => {
        return {
            fila: 3,
            col: 4,
            cell: tablero[3][4],
        };
    };
    const [snake, setSnake] = useState(new LinkedList(initialSnakeCoords(tablero)));
    const [score, setScore] = useState(0);

    const directionMovement = (e) => {
        e = e || window.event;
        switch (e.keyCode) {
            case 37: case 65: case 97:
                return 'LEFT';
                break;
            case 38: case 87: case 119:
                return 'UP';
                break;
            case 39: case 68: case 100:
                return 'RIGHT';
                break;
            case 40: case 83: case 115:
                return 'DOWN';
                break;
            default:
                return direction;
        }
    };

    function moveSnake() {
        let sumaFila = 0;
        let sumaCol = 0;
        if (direction === 'UP') {
            sumaFila = -1;
            sumaCol = 0;
        }
        if (direction === 'DOWN') {
            sumaFila = 1;
            sumaCol = 0;
        }
        if (direction === 'LEFT') {
            sumaFila = 0;
            sumaCol = -1;
        }
        if (direction === 'RIGHT') {
            sumaFila = 0;
            sumaCol = 1;
        }
        let flag = true;
        if (direction === 'DOWN' && snake.cabeza.valor.fila + sumaFila <= 9) {
        } else if (direction === 'UP' && snake.cabeza.valor.fila + sumaFila >= 0) {
        } else if (direction === 'RIGHT' && snake.cabeza.valor.col + sumaCol <= 9) {
        } else if (direction === 'LEFT' && snake.cabeza.valor.col + sumaCol >= 0) {
        } else {
            setVista('Formulario');
            flag = false;
        }
        if (flag) {
            snake.cabeza.valor.fila = snake.cabeza.valor.fila + sumaFila;
            snake.cabeza.valor.col = snake.cabeza.valor.col + sumaCol;
            const movimiento = new Set(snakeBody);
            movimiento.add(tablero[snake.cabeza.valor.fila][snake.cabeza.valor.col]);
            setSnakeBody(movimiento);
        }
    };//fin moveSnake

    useEffect(() => {
        window.addEventListener('keydown', e => {
            setDirection(directionMovement(e));
        });
    }, []);

    useInterval(() => {
        moveSnake();
    }, 650);//fin useInterval

    const cell_Type = (cellValue) => {
        let cellType = 'board_cell';
        if (snakeBody.has(cellValue)) cellType = 'board_cell snake';
        return cellType;
    };//fin cell_Type

    if (vista === 'Formulario') {
        return (
            <div>
                <Formulario />
            </div>
        );
    } else {
        return (
            <div>
                <h4>Puntaje: {score}</h4>
                <div className="tablero">
                    {tablero.map((fila, columna) => (
                        <div key={columna} className="fila">
                            {fila.map((cell, pos) => {
                                const snakeCell = cell_Type(cell);
                                return <div key={pos} className={snakeCell}></div>;
                            })}
                        </div>
                    ))}
                </div>
            </div>
        );//fin return
    };//fin if
};//fin funcion

export default Tablero;