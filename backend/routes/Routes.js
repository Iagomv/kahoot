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
router.post('/cuestionario', async (req, res) => {
  const sqlCuestionario = 'INSERT INTO cuestionarios SET ?'
  const cuestionario = req.body.infoCuestionario
  const preguntas = req.body.preguntas

  try {
    // Insertar el cuestionario
    const resultCuestionario = await new Promise((resolve, reject) => {
      db.query(sqlCuestionario, cuestionario, (err, result) => {
        if (err) reject(err)
        resolve(result)
      })
    })

    const cuestionarioId = resultCuestionario.insertId // Obtener el ID del cuestionario insertado
    if (!cuestionarioId) {
      return res.status(500).json({error: 'Error al insertar el cuestionario'})
    }

    // Insertar cada pregunta
    for (const pregunta of preguntas) {
      const sqlPregunta = 'INSERT INTO preguntas SET ?'
      const preguntaData = {
        texto: pregunta.texto,
        tiempo_respuesta: pregunta.tiempo_respuesta,
        cuestionario_id: cuestionarioId
      }

      const resultPregunta = await new Promise((resolve, reject) => {
        db.query(sqlPregunta, preguntaData, (err, result) => {
          if (err) reject(err)
          resolve(result)
        })
      })

      const preguntaId = resultPregunta.insertId // Obtener el ID de la pregunta insertada

      // Insertar las opciones de la pregunta
      for (const opcion of pregunta.opciones) {
        if (opcion.texto && opcion.texto.trim() !== '') {
          const sqlOpcion = 'INSERT INTO opciones SET ?'
          const opcionData = {
            texto_opcion: opcion.texto,
            es_correcta: opcion.es_correcta ? 1 : 0,
            pregunta_id: preguntaId
          }

          await new Promise((resolve, reject) => {
            db.query(sqlOpcion, opcionData, (err, result) => {
              if (err) reject(err)
              resolve(result)
            })
          })
        }
      }
    }

    // Responder con el ID del cuestionario insertado
    return res.status(200).json({success: true, cuestionarioId})
  } catch (err) {
    console.error('Error:', err.message)
    return res.status(500).json({error: err.message})
  }
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

router.get('/cuestionarioCompletoEdicion/:id', (req, res) => {
  const sql = `
	  SELECT 
		cuestionarios.id AS cuestionario_id, 
		cuestionarios.titulo, 
		preguntas.id AS pregunta_id, 
		preguntas.texto AS pregunta_texto, 
		preguntas.tiempo_respuesta,
		opciones.id AS opcion_id, 
		opciones.texto_opcion, 
		opciones.es_correcta
	  FROM cuestionarios
	  INNER JOIN preguntas ON cuestionarios.id = preguntas.cuestionario_id
	  INNER JOIN opciones ON preguntas.id = opciones.pregunta_id
	  WHERE cuestionarios.id = ?`

  const id = parseInt(req.params.id, 10)

  db.query(sql, [id], (err, results) => {
    if (err) return res.json(err)

    // Transformar los resultados en un formato anidado
    const cuestionario = {
      id: results[0]?.cuestionario_id || null,
      titulo: results[0]?.titulo || '',
      preguntas: []
    }

    const preguntasMap = {}

    results.forEach((row) => {
      if (!preguntasMap[row.pregunta_id]) {
        preguntasMap[row.pregunta_id] = {
          pregunta_texto: row.pregunta_texto,
          tiempo_respuesta: row.tiempo_respuesta,
          opciones: []
        }
        cuestionario.preguntas.push(preguntasMap[row.pregunta_id])
      }

      preguntasMap[row.pregunta_id].opciones.push({
        id: row.opcion_id,
        texto_opcion: row.texto_opcion,
        es_correcta: row.es_correcta
      })
    })

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
