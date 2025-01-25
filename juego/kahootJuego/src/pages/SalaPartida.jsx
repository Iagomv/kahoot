import React, {useEffect, useState} from 'react'
import {useParams} from 'react-router'
import {io} from 'socket.io-client'

export const SalaPartida = () => {
  //TODO agregar validacion de existencia de la partida
  //TODO cambiar socket
  const [jugadores, setJugadores] = useState([]) // Array de jugadores
  const {pin} = useParams() // Pin de la partida

  //TODO Comunicacion con el servidor mediante webSockets
  // Al iniciar la partida mandamos los datos del creador
  useEffect(() => {
    socket.emit('crearPartida', {
      usuario: JSON.parse(localStorage.getItem('token')),
      pin: pin
    })
    socket.on('jugadores', (jugadores) => setJugadores(jugadores))
  }, [])
  useEffect(() => {}, [])
  return (
    <div className="d-flex flex-column gap-3 ">
      {/*Header */}
      <div className="container rounded-top shadow-sm">
        <h3>Código de juego </h3>
        <h1 className="fw-bold">{pin}</h1>
      </div>
      {/*Iniciar partida */}
      <div className="container d-flex flex-row justify-content-center">
        <button className="btn btn-primary fw-bold border border-dark"> Iniciar partida </button>
      </div>
      {/*Jugadores */}
      //TODO agregar los jugadores al div
    </div>
  )
}
export default SalaPartida
