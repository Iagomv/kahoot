import express from 'express'
import http from 'http'
import { Server } from 'socket.io'
import Sala from './Sala.js'
const app = express()

const server = http.createServer(app)
const puerto = 6246
// Configuración de Socket.io
const io = new Server(server, {
	cors: {
		origin: '*', // URL de la app React
		methods: ['GET', 'POST'],
	},
})

let salas = [] //TODO
let jugadores = [] //TODO
let pin = '' // ok

// Manejo de eventos WebSocket
io.on('connection', (socket) => {
	console.log('Usuario conectado:', socket.id)

	// Cuando el jugador crea la partida
	socket.on('crearPartida', (data) => crearPartida(data))
	socket.on('unirsePartida', (data) => unirsePartida(data, socket))
})

server.listen(puerto, () => {
	console.log('conexion en el puerto', puerto)
})

const crearPartida = (data) => {
	const nuevaSala = new Sala({
		pin: data.pin,
		jugadores: [],
		socket: null,
		cuestionario: data.cuestionario,
		pregunta_actual: -1,
	})

	salas.push(nuevaSala) // Add the new Sala instance to the array
	console.log(`Partida creada con PIN ${data.pin} por el usuario ${data.usuario}`)
	console.log('Salas actuales:', salas)
}

// Funcion que maneja la entrada de un jugador
const unirsePartida = (data, socket) => {
	jugadores.push(data.usuario)
	socket.emit('cuestionario', salas[0].cuestionario)
	console.log(salas[0].cuestionario)
	socket.emit('jugadores', jugadores)
	console.log(`Jugador ${data.usuario} se unió a la partida con PIN ${data.pin}`)
}
