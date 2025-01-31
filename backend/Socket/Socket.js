import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import Sala from './Sala.js'
import Jugador from './Jugador.js'
import axios from 'axios'
import { calculadoraPuntos } from '../Helper/CalculadoraPuntos.js'
import { modificarPuntuacion, almacenarRespuesta } from '../Helper/ModificarPuntuacion.js'
import { todosContestaron } from '../Helper/TodosContestaron.js'
const app = express()

// Configuración de socket.io
//!FIXME PERDIDA DE DATOS DE LAS PARTIDAS AL REINICIAR EL SERVIDOR
const server = http.createServer(app)
const puerto = 6246
const io = new Server(server, {
	cors: {
		origin: '*', // URL de la app React
		methods: ['GET', 'POST'],
	},
})

let salas = []

// Manejo de eventos WebSocket
io.on('connection', (socket) => {
	console.log('Usuario conectado:', socket.id)
	socket.on('crearPartida', (data) => crearPartida(data, socket))
	socket.on('unirsePartida', (data) => unirsePartida(data, socket))
	socket.on('salirPartida', (data) => salirPartida(data, socket))
	socket.on('empezarPartida', (data) => empezarPartida(data, socket))
	socket.on('siguientePregunta', (data) => siguientePregunta(data, socket))
	socket.on('preguntaTimeout', (data) => preguntaTimeout(data, socket))
	socket.on('enviarRespuesta', (data) => enviarRespuesta(data, socket))
})
//Funciones auxiliares
const buscarSala = (pin) => {
	return salas.find((sala) => sala.pin === pin)
}

const emitirDatosSala = (pin) => {
	let sala = buscarSala(pin)
	io.to(pin).emit('sala', sala)
}

//Funciones de gestion de partidas asociadas a los eventos //TODO gestion de errores de conexion
const crearPartida = (data, socket) => {
	console.log(socket.id)
	const nuevaSala = new Sala({
		pin: data.pin,
		host: { token: data.token, socket: socket.id },
		jugadores: [],
		cuestionario: data.cuestionario,
		pregunta_actual: -1,
		timeout: false,
	})
	socket.join(data.pin)
	salas.push(nuevaSala)
	emitirDatosSala(data.pin)
}
const unirsePartida = (data, socket) => {
	const sala = buscarSala(data.pin)
	sala ? sala.agregarJugador(new Jugador({ nombre: data.token, socket: socket.id })) : console.log('La sala no existe')
	socket.join(data.pin)
	emitirDatosSala(data.pin)
}
const salirPartida = (data, socket) => {
	console.log(`Jugador ${data.token} se desconectó de la partida con PIN ${data.pin}`)
	socket.leave(data.pin)
}
const preguntaTimeout = (data) => {
	let sala = buscarSala(data.pin)
	sala.timeout = true
	console.log(sala)
	mostrarResultados(sala)
}
// axios.get -> datos restantes del cuestionario, pregunta_actual = 0
const empezarPartida = async (data) => {
	const sala = buscarSala(data.pin)
	sala.pregunta_actual = 0
	const response = await axios.get(`http://localhost:6245/cuestionarioCompletoEdicion/${sala.cuestionario.id}`)
	sala.cuestionario = { ...sala.cuestionario, ...response.data }
	emitirDatosSala(data.pin)
}
const siguientePregunta = (data) => {
	const sala = buscarSala(data.pin)
	sala.timeout = false
	sala.pregunta_actual++
	if (sala.pregunta_actual === sala.cuestionario.preguntas.length) {
		io.to(data.pin).emit('finalizarPartida', sala)
	} else {
		emitirDatosSala(data.pin)
	}
}

// Se llama en Timeout(Al acabar el tiempo de la pregunta)
//  y en enviarRespuesta(al contestar al jugador) if todos contestaron
const mostrarResultados = (sala) => {
	io.to(sala.host.socket).emit('mostrarResultados', sala)
}

//Handler para respuesta del jugador
const enviarRespuesta = (data, socket) => {
	let sala = buscarSala(data.pin)
	let nombreJugador = data.nombre
	let puntos = calculadoraPuntos(sala, data.indexRespuesta, data.segundosLeft)
	almacenarRespuesta(sala, nombreJugador, data.indexRespuesta)
	if (puntos > 0) modificarPuntuacion(sala, nombreJugador, puntos)
	let jugador = sala.jugadores.find((jugador) => jugador.nombre === nombreJugador)
	io.to(jugador.socket).emit('resultadoCliente', { puntos: puntos })

	if (todosContestaron(sala)) {
		mostrarResultados(sala)
	}
}

server.listen(puerto, () => {
	console.log('conexion en el puerto', puerto)
})
