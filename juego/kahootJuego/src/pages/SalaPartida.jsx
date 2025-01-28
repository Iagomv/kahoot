import React, {useEffect, useState} from 'react'
import {useLocation, useParams} from 'react-router-dom'
import {io} from 'socket.io-client'

// Inicia la conexión de socket
const socket = io('http://localhost:6246', {autoConnect: false})

export const SalaPartida = () => {
  const [jugadores, setJugadores] = useState([])
  const [cuestionario, setCuestionario] = useState(null)
  const {pin} = useParams()
  const location = useLocation()
  const joinToken = localStorage.getItem('joinToken')
  let token = null

  // Maneja la creación de la partida
  const socketCrearPartida = (token) => {
    setCuestionario(location.state.cuestionario)
    socket.emit('crearPartida', {pin, token, cuestionario: location.state.cuestionario})
  }

  // Maneja la unión a una partida existente
  const socketUnirsePartida = (token) => {
    const data = {token, pin}
    socket.emit('unirsePartida', data)

    // Escuchar el cuestionario de la partida
    socket.on('cuestionario', (data) => {
      setCuestionario(data)
    })
  }
  // Código comun a unirse y crear partida
  const allPlayers = () => {
    socket.connect() // Conectar socket al montar el componente
    const pinGuardado = localStorage.getItem('pinGuardado') // Recuperamos el PIN de la sala
    // Escuchar cambios en los Jugadores
    socket.on('jugadores', (jugadores) => setJugadores(jugadores))
  }

  const salirPartida = () => {
    let tokenSalida = joinToken != null ? joinToken : token
    socket.emit('salirPartida', {pin, tokenSalida})
  }
  useEffect(() => {
    allPlayers()
    token = JSON.parse(localStorage.getItem('token'))
    const parsedJoinToken = joinToken ? JSON.parse(joinToken) : null
    // Crear o unirse a la partida según el token
    parsedJoinToken === null ? socketCrearPartida(token) : socketUnirsePartida(parsedJoinToken)

    // Limpiar la conexión y emitir salirPartida al desmontar
    return () => {
      salirPartida()
      socket.disconnect() // Desconectar al desmontar el componente
    }
  }, []) // Al montar el componente

  return (
    <div className="d-flex flex-column gap-3">
      {/* Header */}
      {cuestionario && <h1>{cuestionario.titulo}</h1>}
      {joinToken == null && (
        <>
          <div className="container d-flex flex-row justify-content-center">
            <h3 className="m-3 " style={{color: 'red'}}>
              Game Host
            </h3>
            <button className="btn btn-outline-dark p-1 " style={({fontSize: '1.6em'}, {fontWeight: 700})}>
              Iniciar partida
            </button>
          </div>
        </>
      )}
      <div className="container rounded-top shadow-sm d-flex-row">
        <h3 className="fw-bold">Código de juego: {pin}</h3>
      </div>

      {/* Jugadores */}
      <div className="container d-flex flex-row justify-content-center">
        {jugadores.length === 0 ? (
          <p>No hay jugadores en la sala.</p>
        ) : (
          jugadores.map((jugador, index) => (
            <div key={index} className="container rounded shadow-sm p-3">
              <h4>{jugador.nombre}</h4>
            </div>
          ))
        )}
      </div>

      <div className="container d-flex-row">
        <div className="btn btn-primary" onClick={() => salirPartida()}>
          Salir de la partida
        </div>
      </div>
    </div>
  )
}

export default SalaPartida
