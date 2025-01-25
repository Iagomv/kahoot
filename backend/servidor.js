import express from 'express'
import http from 'http'
import Routes from './routes/Routes.js'
import JuegoRoutes from './routes/Juego.js'
import cors from 'cors'

//Configuracion express
const app = express()
app.use(cors())
const server = http.createServer(app)
const puerto = 6245

// Middleware para JSON
app.use(express.json())
app.use((req, res, next) => {
  console.log(req.method, req.url, req.body)

  next()
})
// Enrutado de la API
app.use('/', Routes)

app.use('/juego', JuegoRoutes)

// Escuchar en el puerto configurado
server.listen(puerto, () => {
  console.log(`Escuchando en el puerto ${puerto}`)
})

export {app}
