import { useEffect, useRef, useState } from 'react'
import { data } from 'react-router'
import { io } from 'socket.io-client'

export const useSocket = (url, pin, initialJoinToken) => {
	const socket = useRef(io(url, { autoConnect: false }))
	const isConnected = useRef(false)
	const [sala, setSala] = useState({})
	const [resultadoCliente, setResultadoCliente] = useState({})
	const [mostrarResultados, setMostrarResultados] = useState(false)

	useEffect(() => {
		// Conecta el socket si no está conectado
		if (!isConnected.current) {
			socket.current.connect()
			isConnected.current = true
		}

		// Manejar eventos del socket
		socket.current.on('sala', (data) => setSala(data))
		socket.current.on('mostrarResultados', (data) => onMostrarResultados(data))
		socket.current.on('resultadoCliente', (data) => setResultadoCliente(data.puntos))

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

	const onMostrarResultados = (data) => {
		console.log('onMostrarResultados', data)
		setSala(data)
		setMostrarResultados(true)
	}
	const siguientePregunta = () => {
		setMostrarResultados(false)
		socket.current.emit('siguientePregunta', { pin })
	}
	const preguntaTimeout = () => {
		socket.current.emit('preguntaTimeout', { pin })
	}
	const enviarRespuestaJugador = (data) => {
		const objeto = { pin, indexRespuesta: data.indexRespuesta, segundosLeft: data.segundosLeft, nombre: initialJoinToken }
		socket.current.emit('enviarRespuesta', objeto)
	}
	return {
		sala,
		crearPartida,
		empezarPartida,
		unirsePartida,
		salirPartida,
		siguientePregunta,
		preguntaTimeout,
		enviarRespuestaJugador,
		resultadoCliente,
		mostrarResultados,
	}
}
