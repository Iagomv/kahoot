import React, {useEffect, useState} from 'react'

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
    </div>
  )
}
