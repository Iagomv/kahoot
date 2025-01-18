import React, {useEffect, useState} from 'react'
import axios from 'axios'

export const MostrarOpcionesPregunta = ({pregunta, index, setCuestionario, preguntas, setPreguntas, cuestionario}) => {
  const [opciones, setOpciones] = useState([])

  // Sincroniza el estado de opciones con la pregunta actual
  useEffect(() => {
    if (pregunta && pregunta.opciones) {
      setOpciones(pregunta.opciones)
    } else {
      setOpciones([])
    }
  }, [pregunta])

  //Handler para loscheckboxes
  const handleChangeCorrecta = (id) => {
    let opcionesActualizadas = [...opciones]
    opcionesActualizadas.map((opcion) => {
      if (opcion.id === id) {
        opcion.es_correcta = !opcion.es_correcta
      }
    })
    let cuestionarioActualizado = {...cuestionario}
    cuestionarioActualizado.preguntas[index].opciones = opcionesActualizadas //Actualizacion del cuestionario
    setCuestionario(cuestionarioActualizado)
    setOpciones(opcionesActualizadas)
  }

  // Handler para cambiar el texto de la pregunta
  const handleCambioPregunta = (e, index) => {
    let preguntasActualizadas = [...preguntas]
    preguntasActualizadas[index].pregunta_texto = e.target.value
    setPreguntas(preguntasActualizadas)

    let cuestionarioActualizado = {...cuestionario}
    cuestionarioActualizado.preguntas[index].pregunta_texto = e.target.value
    setCuestionario(cuestionarioActualizado)
  }

  // Handler para cambiar el texto de la opción
  const handleInputChange = (event, id) => {
    const {value} = event.target
    const opcionesActualizadas = opciones.map((opcion) =>
      opcion.id === id ? {...opcion, texto_opcion: value} : opcion
    )
    let cuestionarioActualizado = {...cuestionario}
    cuestionarioActualizado.preguntas[index].opciones = opcionesActualizadas //Actualizacion del cuestionario
    setCuestionario(cuestionarioActualizado)
    setOpciones(opcionesActualizadas)
  }

  //Actualizar la pregunta a traves de la API
  const actualizarCuestionario = async (pregunta) => {
    console.log('pregunta enviada', pregunta)
    let errores = []
    console.log(pregunta)
    try {
      const responsePregunta = await axios.put('http://localhost:6245/pregunta', pregunta)
      if (responsePregunta.data !== null && responsePregunta.status === 207) {
        try {
          pregunta.opciones.forEach(async (opcion) => {
            const responseOpciones = await axios.put('http://localhost:6245/opcion', opcion)
            if (responseOpciones.data !== null && responseOpciones.status === 207) {
              console.log('opcion actualizada')
            }
          })
        } catch (error) {
          errores.push(error)
        }
      }
    } catch (error) {
      errores.push(error)
    }
    errores.length == 0
      ? alert('Pregunta actualizada')
      : alert('Error al actualizar la pregunta') && console.log(errores)
  }

  useEffect(() => {
    console.log(cuestionario)
  }, [cuestionario])

  return (
    <div>
      <div className="row m-3 justify-content-center">
        <textarea
          name="pregunta"
          value={pregunta.pregunta_texto}
          onChange={(e) => handleCambioPregunta(e, index)}
        ></textarea>
      </div>

      <ul>
        {opciones.map((opcion) => (
          <li key={opcion.id} className="d-flex justify-content-between m-3 row">
            <div className="col-10">
              <input
                type="text"
                className="form-control col-6"
                value={opcion.texto_opcion}
                name="texto_opcion"
                onChange={(e) => {
                  handleInputChange(e, opcion.id)
                }}
              />
            </div>
            <div className="col-2">
              <div class="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  checked={opcion.es_correcta}
                  onChange={() => {
                    handleChangeCorrecta(opcion.id)
                  }}
                />
              </div>
            </div>
          </li>
        ))}
      </ul>
      <button className="btn btn-primary btn-sm" onClick={() => actualizarCuestionario(cuestionario.preguntas[index])}>
        Guardar
      </button>
    </div>
  )
}
