import express from 'express'
import http from 'http'
import {Server} from 'socket.io'
import Sala from './Sala.js'
import Jugador from './Jugador.js'
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
  socket.on('salirPartida', (data) => desconectarPartida(data, socket))
})
//Funciones auxiliares
const buscarSala = (pin) => {
  salas.forEach((element) => {
    console.log(element.pin)
  })
  return salas.find((sala) => sala.pin === pin)
}
const emitirJugadoresSala = (pin) => {
  let sala = buscarSala(pin)
  io.to(pin).emit('jugadores', sala.jugadores)
}

//Creamos la partida y metemos el socket en la sala socket.join(pin)
const crearPartida = (data, socket) => {
  const nuevaSala = new Sala({
    pin: data.pin,
    host: (data.token, socket),
    jugadores: [],
    cuestionario: data.cuestionario,
    pregunta_actual: -1
  })
  socket.join(data.pin)
  console.log(nuevaSala)
  salas.push(nuevaSala)
  console.log(`Partida creada con PIN ${data.pin} por el usuario ${data.token}`)
  console.log('Salas actuales:', salas)
}

// Funcion que maneja la entrada de un jugador //TODO gestionar el cliente onError navega
const unirsePartida = (data, socket) => {
  console.log('intentando unirse al servidor', data)
  const sala = buscarSala(data.pin)
  console.log(sala)
  sala ? sala.agregarJugador(new Jugador({nombre: data.token}, socket)) : console.log('La sala no existe')
  socket.join(data.pin)
  emitirJugadoresSala(data.pin)
  console.log(`Jugador ${data.token} se unió a la partida con PIN ${data.pin}`)
}

const desconectarPartida = (data, socket) => {
  const sala = buscarSala(data.pin)
  console.log(`Jugador ${data.tokenSalida} se desconectó de la partida con PIN ${data.pin}`)
  socket.leave(data.pin)
  emitirJugadoresSala(data.pin)
}
server.listen(puerto, () => {
  console.log('conexion en el puerto', puerto)
})
