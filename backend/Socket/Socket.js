import express from 'express'
import http from 'http'
import {Server} from 'socket.io'
import Sala from './Sala.js'
import Jugador from './Jugador.js'
import axios from 'axios'
import e from 'express'
const app = express()

// Configuración de Socket.io
const server = http.createServer(app)
const puerto = 6246
const io = new Server(server, {
  cors: {
    origin: '*', // URL de la app React
    methods: ['GET', 'POST']
  }
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
  socket.on('preguntaTimeout', (data) => preguntaTimeout(data, socket)) //TODO
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
  const nuevaSala = new Sala({
    pin: data.pin,
    host: data.token,
    jugadores: [],
    cuestionario: data.cuestionario,
    pregunta_actual: -1,
    timeout: false
  })
  socket.join(data.pin)
  salas.push(nuevaSala)

  emitirDatosSala(data.pin)
}
const unirsePartida = (data, socket) => {
  const sala = buscarSala(data.pin)
  sala ? sala.agregarJugador(new Jugador({nombre: data.token}, socket)) : console.log('La sala no existe')
  socket.join(data.pin)
  emitirDatosSala(data.pin)
}
const salirPartida = (data, socket) => {
  const sala = buscarSala(data.pin)
  console.log(`Jugador ${data.token} se desconectó de la partida con PIN ${data.pin}`)
  socket.leave(data.pin)
}
const preguntaTimeout = (data, socket) => {
  let sala = buscarSala(data.pin)
  sala.timeout = true
  console.log(sala)
  emitirDatosSala(data.pin)
}
// axios.get -> datos restantes del cuestionario, pregunta_actual = 0
const empezarPartida = async (data, socket) => {
  const sala = buscarSala(data.pin)
  sala.pregunta_actual = 0
  const response = await axios.get(`http://localhost:6245/cuestionarioCompletoEdicion/${sala.cuestionario.id}`)
  sala.cuestionario = {...sala.cuestionario, ...response.data}
  emitirDatosSala(data.pin)
}
const siguientePregunta = (data, socket) => {
  const sala = buscarSala(data.pin)
  sala.timeout = false
  sala.pregunta_actual++
  emitirDatosSala(data.pin)
}
//Handler para respuesta del jugador
const enviarRespuesta = (data, socket) => {
  let sala = buscarSala(data.pin)
  let opcionContestada = data.data
  let nombreJugador = data.nombre

  let indexJugador = sala.jugadores.findIndex((jugador) => jugador.socket.id === socket.id)
}
server.listen(puerto, () => {
  console.log('conexion en el puerto', puerto)
})
