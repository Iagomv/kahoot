import express from 'express'
const router = express.Router()
import path from 'path'
import mysql from 'mysql'

const db = mysql.createConnection({
  host: 'dam2.colexio-karbo.com',
  port: 3333,
  user: 'dam2',
  password: 'Ka3b0134679',
  database: 'kahoot_IMVarela'
})
// Ruta principal
router.get('/', (req, res) => {
  //res.sendFile(path.resolve('pages/index.html')) // Asegúrate de que el archivo existe
  res.json('Hola Mundo Noeliaaaaa')
})

// Ver cuestionarios
router.get('/cuestionarios', (req, res) => {
  const sql = 'SELECT * FROM cuestionarios'

  db.query(sql, (err, result) => {
    if (err) return res.json(err)
    return res.json(result)
  })
})

// Obtener un cuestionario por ID
router.get('/cuestionarios/:id', (req, res) => {
  res.send(`Cuestionario con ID: ${req.params.id}`)
})

// Modificar un cuestionario por ID
router.put('/cuestionarios/:id', (req, res) => {
  res.send(`Cuestionario con ID: ${req.params.id} modificado`)
  console.log(req.params.id)
})

// Crear un usuario
router.post('/usuarios', (req, res) => {
  res.send('Usuario creado')
})

export default router
