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
  res.json({
    message: 'Api de kahoot en funcionamiento',
    routes: {
      usuarios: {
        get: '/usuarios',
        post: '/usuario/:id',
        put: '/usuario/:id',
        delete: '/usuario/:id'
      },
      cuestionarios: {
        get: '/cuestionarios',
        post: '/cuestionario',
        put: '/cuestionario/:id',
        delete: '/cuestionario/:id'
      },
      preguntas: {
        get: '/preguntas',
        post: '/pregunta',
        put: '/pregunta/:id',
        delete: '/pregunta/:id'
      },
      respuestas: {
        get: '/respuestas',
        post: '/respuesta',
        put: '/respuesta/:id',
        delete: '/respuesta/:id'
      }
    }
  })
})

/**
 * RUTAS DE USUARIOS
 */

//Ver todos los usuarios
router.get('/usuarios', (req, res) => {
  const sql = 'SELECT * FROM usuarios'
  db.query(sql, (err, result) => {
    if (err) return res.json(err)
    return res.json(result)
  })
})

// Login usuario
router.post('/usuario/login', (req, res) => {
  // Consulta SQL
  const sql = 'SELECT * FROM usuarios WHERE email = ? AND password = ?'
  const {email, password} = req.body // Extraer datos del cuerpo de la solicitud

  // Ejecutar la consulta
  db.query(sql, [email, password], (err, result) => {
    if (err) {
      return res.status(500).json({message: 'Error del servidor', error: err})
    }

    // Verificar si se encontró un usuario
    if (result.length === 0) {
      return res.status(401).json({message: 'Credenciales incorrectas.'})
    }

    // Retornar respuesta exitosa con datos básicos del usuario
    const user = result[0]
    return res.status(200).json({
      message: 'Inicio de sesión exitoso.',
      token: {id: user.id, email: user.email, nombre: user.nombre, tipo: user.tipo} // Solo datos necesarios
    })
  })
})

// Insertar nuevo usuario
router.post('/usuario', (req, res) => {
  const sql = 'INSERT INTO usuarios SET ?'
  const usuario = req.body
  db.query(sql, usuario, (err, result) => {
    if (err) return res.json(err)
    return res.json(result)
  })
})

// Editar usuario
router.put('/usuario/:id', (req, res) => {
  const sql = 'UPDATE usuarios SET ? WHERE id = ?'
  const id = parseInt(req.params.id, 10)
  const usuario = req.body
  db.query(sql, [usuario, id], (err, result) => {
    if (err) return res.json(err)
    return res.json(result)
  })
})

// Eliminar usuario
router.delete('/usuario/:id', (req, res) => {
  const sql = 'DELETE FROM usuarios WHERE id = ?'
  const id = parseInt(req.params.id, 10)
  db.query(sql, [id], (err, result) => {
    if (err) return res.json(err)
    return res.json(result)
  })
})

//Existe email
router.get('/existeEmail/:email', (req, res) => {
  const sql = 'SELECT * FROM usuarios WHERE email = ?'
  const email = req.params.email
  db.query(sql, [email], (err, result) => {
    if (err) return res.json(err)
    return res.json(result)
  })
})

//Existe usuario
router.get('/existeUsuario/:usuario', (req, res) => {
  const sql = 'SELECT * FROM usuarios WHERE nombre = ?'
  const usuario = req.params.usuario
  db.query(sql, [usuario], (err, result) => {
    if (err) return res.json(err)
    return res.json(result)
  })
})

/**
 * RUTAS DE CUESTIONARIOS
 */
// Ver todos los cuestionarios
router.get('/cuestionarios', (req, res) => {
  const sql = 'SELECT * FROM cuestionarios'
  db.query(sql, (err, result) => {
    if (err) return res.json(err)
    return res.json(result)
  })
})
// Crear un cuestionario
router.post('/cuestionario', (req, res) => {
  const sqlCuestionario = 'INSERT INTO cuestionarios SET ?'
  const cuestionario = req.body.infoCuestionario
  const preguntas = req.body.preguntas
  let id = 0

  // Insertar el cuestionario
  db.query(sqlCuestionario, cuestionario, (err, result) => {
    if (err) return res.json(err)

    id = result.insertId
    if (id !== 0) {
      // Insertar preguntas de forma simplificada
      preguntas.forEach((pregunta) => {
        const sqlPregunta = 'INSERT INTO preguntas SET ?'
        pregunta.cuestionario_id = id // Asignar el ID del cuestionario a cada pregunta

        // Insertar cada pregunta
        db.query(sqlPregunta, pregunta, (err, result) => {
          if (err) return res.json(err)
        })
      })

      // Responder con el ID del cuestionario insertado
      return res.json({success: true, cuestionarioId: id})
    } else {
      return res.status(500).json({error: 'Error al insertar el cuestionario'})
    }
  })
})

// Obtener un cuestionario por ID
router.get('/cuestionario/:id', (req, res) => {
  const sql = 'SELECT * FROM cuestionarios WHERE id = ?'
  const id = parseInt(req.params.id, 10)
  db.query(sql, [id], (err, result) => {
    if (err) return res.json(err)
    return res.json(result)
  })
})
// Modificar un cuestionario por ID
router.put('/cuestionario/:id', (req, res) => {
  const sql = 'UPDATE cuestionarios SET ? WHERE id = ?'
  const cuestionario = req.body
  const id = parseInt(req.params.id, 10)
  console.log(cuestionario)

  db.query(sql, [cuestionario, id], (err, result) => {
    if (err) return res.json(err)
    return res.json(result)
  })
})
// Eliminar un cuestionario por ID
router.delete('/cuestionario/:id', (req, res) => {
  const sql = 'DELETE FROM cuestionarios WHERE id = ?'
  const id = parseInt(req.params.id, 10)
  db.query(sql, [id], (err, result) => {
    if (err) return res.json(err)
    return res.json(result)
  })
})

// Ver cuestionario completo
router.get('/cuestionarioCompleto/:id', (req, res) => {
  const sql =
    'SELECT cuestionarios.id, cuestionarios.titulo, preguntas.texto AS pregunta_texto, preguntas.tiempo_respuesta ' + // Seleccionando solo texto y tiempo_respuesta de preguntas
    'FROM cuestionarios ' +
    'INNER JOIN preguntas ON cuestionarios.id = preguntas.cuestionario_id ' +
    'WHERE cuestionarios.id = ?'

  const id = parseInt(req.params.id, 10)
  db.query(sql, [id], (err, result) => {
    if (err) return res.json(err)

    // Agrupar las preguntas bajo el cuestionario
    const cuestionario = {
      id: result[0]?.id,
      titulo: result[0]?.titulo,
      preguntas: result.map((row) => ({
        pregunta_texto: row.pregunta_texto, // Solo el texto de la pregunta
        tiempo_respuesta: row.tiempo_respuesta // El tiempo de respuesta
      }))
    }

    return res.json(cuestionario)
  })
})

//TODO Modificar preguntas y respuestas para agregar utilidad deberían estar relacionadas con el cuestionario
/**
 * RUTAS DE PREGUNTAS
 */

// Ver todas las preguntas
router.get('/preguntas', (req, res) => {
  const sql = 'SELECT * FROM preguntas'
  db.query(sql, (err, result) => {
    if (err) return res.json(err)
    return res.json(result)
  })
})

// Ver preguntas por cuestionario
router.get('/preguntas/:id', (req, res) => {
  const sql = 'SELECT * FROM preguntas WHERE cuestionario_id = ? ORDER BY id ASC'
  const id = parseInt(req.params.id, 10)
  db.query(sql, [id], (err, result) => {
    if (err) return res.json(err)
    return res.json(result)
  })
})

// Crear una pregunta para un cuestionario
router.post('/pregunta', (req, res) => {
  const sql = 'INSERT INTO preguntas SET ?'
  const pregunta = req.body
  db.query(sql, pregunta, (err, result) => {
    if (err) return res.json(err)
    return res.json(result)
  })
})

// Obtener una pregunta por ID
router.get('/pregunta/:id', (req, res) => {
  const sql = 'SELECT * FROM preguntas WHERE id = ?'
  const id = parseInt(req.params.id, 10)
  db.query(sql, [id], (err, result) => {
    if (err) return res.json(err)
    return res.json(result)
  })
})

// Modificar una pregunta por ID
router.put('/pregunta/:id', (req, res) => {
  const sql = 'UPDATE preguntas SET ? WHERE id = ?'
  const pregunta = req.body
  const id = parseInt(req.params.id, 10)
  db.query(sql, [pregunta, id], (err, result) => {
    if (err) return res.json(err)
    return res.json(result)
  })
})

// Eliminar una pregunta por ID
router.delete('/pregunta/:id', (req, res) => {
  const sql = 'DELETE FROM preguntas WHERE id = ?'
  const id = parseInt(req.params.id, 10)
  db.query(sql, [id], (err, result) => {
    if (err) return res.json(err)
    return res.json(result)
  })
})

//TODO test respuestas
/**
 * RUTAS DE RESPUESTAS
 */

// Ver todas las respuestas
router.get('/respuestas', (req, res) => {
  const sql = 'SELECT * FROM respuestas'
  db.query(sql, (err, result) => {
    if (err) return res.json(err)
    return res.json(result)
  })
})

// Crear una respuesta
router.post('/respuesta', (req, res) => {
  const sql = 'INSERT INTO respuestas SET ?'
  const respuesta = req.body
  db.query(sql, respuesta, (err, result) => {
    if (err) return res.json(err)
    return res.json(result)
  })
})

// Obtener una respuesta por ID
router.get('/respuesta/:id', (req, res) => {
  const sql = 'SELECT * FROM respuestas WHERE id = ?'
  const id = parseInt(req.params.id, 10)
  db.query(sql, [id], (err, result) => {
    if (err) return res.json(err)
    return res.json(result)
  })
})

// Modificar una respuesta por ID
router.put('/respuesta/:id', (req, res) => {
  const sql = 'UPDATE respuestas SET ? WHERE id = ?'
  const respuesta = req.body
  const id = parseInt(req.params.id, 10)
  db.query(sql, [respuesta, id], (err, result) => {
    if (err) return res.json(err)
    return res.json(result)
  })
})

//Eliminar una respuesta por ID
router.delete('/respuesta/:id', (req, res) => {
  const sql = 'DELETE FROM respuestas WHERE id = ?'
  const id = parseInt(req.params.id, 10)
  db.query(sql, [id], (err, result) => {
    if (err) return res.json(err)
    return res.json(result)
  })
})

export default router
