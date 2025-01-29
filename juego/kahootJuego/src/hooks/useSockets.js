import { useEffect, useRef, useState } from 'react'
import { io } from 'socket.io-client'

export const useSocket = (url, pin, initialJoinToken) => {
	const socket = useRef(io(url, { autoConnect: false }))
	const isConnected = useRef(false)
	const [sala, setSala] = useState({})

	useEffect(() => {
		// Conecta el socket si no está conectado
		if (!isConnected.current) {
			socket.current.connect()
			isConnected.current = true
		}

		// Manejar eventos del socket
		socket.current.on('sala', (data) => setSala(data))

		// Al desmontar el componenente, desconecta el socket
		return () => {
			socket.current.disconnect()
			socket.current.off('sala')
			isConnected.current = false
		}
	}, [url]) // Solo se ejecuta al montar

	// Funciones de socket para gestionar la partida
	const crearPartida = (token, cuestionario) => {
		socket.current.emit('crearPartida', { pin, token, cuestionario })
	}
	const empezarPartida = () => {
		socket.current.emit('empezarPartida', { pin })
	}
	const unirsePartida = (token) => {
		socket.current.emit('unirsePartida', { pin, token })
	}

	const salirPartida = (token) => {
		socket.current.emit('salirPartida', { pin, token })
	}

	const siguientePregunta = () => {
		socket.current.emit('siguientePregunta', { pin })
	}
	//TODO Implementar en backend Envia la posicion de la respuesta (index + 1)
	const enviarRespuestaJugador = (respuesta) => {
		socket.current.emit('enviarRespuestaJugador', { pin, respuesta })
	}
	return { sala, crearPartida, empezarPartida, unirsePartida, salirPartida, siguientePregunta }
}
