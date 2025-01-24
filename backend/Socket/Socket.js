import express from 'express'
import http from 'http'
import {Server} from 'socket.io'
const app = express()

const server = http.createServer(app)
const puerto = 6246
// Configuración de Socket.io
const io = new Server(server, {
  cors: {
    origin: '*', // URL de la app React
    methods: ['GET', 'POST']
  }
})

let usuarioCreador = {} // ok
let jugadores = [] //TODO
let pin = '' // ok

// Manejo de eventos WebSocket
io.on('connection', (socket) => {
  console.log('Usuario conectado:', socket.id)

  // Cuando el jugador crea la partida
  //TODO Solucionar llegando 2 veces
  socket.on('crearPartida', (data) => crearPartida(data))
  socket.on('unirsePartida', (data) => unirsePartida(data))
})

server.listen(puerto, () => {
  console.log('conexion en el puerto', puerto)
})

//TODO Esta entrando 2 veces
const crearPartida = (data) => {
  usuarioCreador = data.usuario
  pin = data.pin
  // OK console.log(`Partida creada por ${JSON.stringify(usuarioCreador)} con PIN ${pin}`)
}

// Funcion que maneja la entrada de un jugador
const unirsePartida = (data) => {
  jugadores.push(data.usuario)
  socket.emit('jugadores', jugadores)
  console.log(`Jugador ${data.usuario} se unió a la partida con PIN ${data.pin}`)
}
