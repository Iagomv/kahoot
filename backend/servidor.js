import express from 'express'
import http from 'http'
import {Server} from 'socket.io'
import Routes from './routes/Routes.js'
import cors from 'cors'

const app = express()
app.use(cors())
const server = http.createServer(app)
const io = new Server(server)
const puerto = 6245

// Middleware para JSON
app.use(express.json())
app.use((req, res, next) => {
  console.log(req.method, req.url, req.body)

  next()
})
// Enrutado de la API
app.use('/', Routes)

// Comunicación en tiempo real con WebSockets
io.on('connection', (socket) => {
  console.log('Usuario conectado')
  socket.on('disconnect', () => {
    console.log('Usuario desconectado')
  })
})

// Escuchar en el puerto configurado
server.listen(puerto, () => {
  console.log(`Escuchando en el puerto ${puerto}`)
})
