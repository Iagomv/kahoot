import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { useParams } from 'react-router'
import { io } from 'socket.io-client'
const socket = io('http://localhost:6246', { autoConnect: false })

export const SalaPartida = () => {
	const [jugadores, setJugadores] = useState([])
	const location = useLocation()
	const { pin } = useParams()
	const [cuestionario, setCuestionario] = useState(null)

	const socketCrearPartida = (token) => {
		setCuestionario(location.state.cuestionario)
		socket.emit('crearPartida', { usuario: token, pin, cuestionario: location.state.cuestionario })
	}

	const socketUnirsePartida = (token) => {
		console.log(token, 'intentando unirse')
		socket.emit('unirsePartida', { usuario: token, pin })
		socket.on('cuestionario', (data) => {
			setCuestionario(data)
		})
	}

	// UseEffect al montar el componente, para crear o unirse a la partida
	useEffect(() => {
		socket.connect() // Conectar el socket al montar el componente
		const token = JSON.parse(localStorage.getItem('token'))
		token.tipo === 'admin' ? socketCrearPartida(token) : socketUnirsePartida(token)
		socket.on('jugadores', setJugadores) // Escuchar cambios en los jugadores

		return () => {
			socket.emit('salirPartida', { pin, usuario: JSON.parse(localStorage.getItem('token')) })
			socket.disconnect() // Desconectar el socket al desmontar
		}
	}, [])

	return (
		<div className="d-flex flex-column gap-3">
			{/* Header */}
			{cuestionario && <h1>{cuestionario.titulo}</h1>}
			<div className="container rounded-top shadow-sm">
				<h3>Código de juego</h3>
				<h1 className="fw-bold">{pin}</h1>
			</div>
			{/* Iniciar partida */}
			<div className="container d-flex flex-row justify-content-center">
				<button className="btn btn-primary fw-bold border border-dark">Iniciar partida</button>
			</div>
			{/* Jugadores */}
			<div className="container d-flex flex-row justify-content-center">
				{jugadores.map((jugador, index) => (
					<div key={index} className="container rounded shadow-sm p-3">
						<h4>{jugador}</h4>
					</div>
				))}
			</div>
		</div>
	)
}
export default SalaPartida
