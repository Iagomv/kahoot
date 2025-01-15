import React, {useEffect, useState} from 'react'
import {InputNuevaPregunta} from '../components/Cuestionarios/InputNuevaPregunta'
import {useNavigate} from 'react-router'
import axios from 'axios'

export const CrearCuestionario = ({token}) => {
  //VARIABLES
  const navigate = useNavigate()
  const [preguntas, setPreguntas] = useState([
    {
      texto: '',
      tiempo_respuesta: ''
    }
  ])
  const [infoCuestionario, setInfoCuestionario] = useState({
    titulo: '',
    tema: ''
  })

  // useEffect que se ejecuta al cargar la pestaña
  useEffect(() => {
    if (!token) {
      navigate('/login')
      return
    }
    setInfoCuestionario({
      ...infoCuestionario,
      creador_id: token.id
    })
  }, [])
  // Cuando cambia la informacion del cuestionario se actualiza el useState
  const handleCambioInfo = (e) => {
    setInfoCuestionario({
      ...infoCuestionario,
      [e.target.name]: e.target.value
    })
  }

  //Cuando cambia la informacion de una pregunta se actualiza el useState
  const handleCambioPregunta = (e, index) => {
    const newPreguntas = [...preguntas]
    newPreguntas[index][e.target.name] = e.target.value
    setPreguntas(newPreguntas)
  }

  // Agregar nueva pregunta solo si todas están completas
  useEffect(() => {
    const todasPreguntasCumplimentadas = () => {
      return preguntas.every((pregunta) => pregunta.texto !== '' && pregunta.tiempo_respuesta !== '')
    }
    const agregarNuevaPregunta = () => {
      // Solo agregar una nueva pregunta si todas las anteriores tienen texto y tiempo de respuesta
      if (todasPreguntasCumplimentadas()) {
        setPreguntas([
          ...preguntas,
          {texto: '', tiempo_respuesta: ''} // Nueva pregunta vacía
        ])
      }
    }
    agregarNuevaPregunta()
  }, [preguntas])

  //Enviar el cuestionario
  const enviarCuestionario = async () => {
    if (infoCuestionario.titulo !== '' && infoCuestionario.tema !== '') {
      const reqBody = {infoCuestionario, preguntas}
      const response = await axios.post('http://localhost:6245/cuestionario', reqBody)
    }
  }

  return (
    <>
      <div className="container mb-5  " style={{overflow: 'auto'}}>
        {/* Fila para el encabezado */}
        <div className="row">
          <h1 className="display-1 mt-5">Crear cuestionario</h1>
        </div>

        {/* Fila para título y temática */}
        <div className="row justify-content-center">
          <div className="container p-3 justify-content-center">
            <form className="form p-3 d-flex flex-column gap-3 bg-light rounded shadow-sm col-8">
              {/* Fila título */}
              <div className="form-group d-flex flex-row gap-5">
                <div className="col-2">
                  <label htmlFor="inputTitulo" className="form-label">
                    Titulo
                  </label>
                </div>
                <input
                  id="inputTitulo"
                  type="text"
                  className="form-control input-sm"
                  name="titulo"
                  value={infoCuestionario.titulo}
                  onChange={handleCambioInfo}
                />
              </div>

              {/* Fila temática */}
              <div className="form-group d-flex flex-row gap-5">
                <div className="col-2">
                  <label htmlFor="inputTema" className="form-label">
                    Tematica
                  </label>
                </div>
                <input
                  id="inputTema"
                  type="text"
                  className="form-control input-sm"
                  name="tema"
                  value={infoCuestionario.tema}
                  onChange={handleCambioInfo}
                />
              </div>
            </form>
          </div>
        </div>
        <div
          id="divPreguntas "
          className="container"
          style={{
            maxHeight: '60vh',
            overflowY: 'scroll',
            paddingTop: '10px'
          }}
        >
          {/* Fila para las preguntas */}
          {preguntas.map((pregunta, index) => (
            <InputNuevaPregunta
              key={index}
              pregunta={pregunta}
              index={index}
              handleCambioPregunta={handleCambioPregunta}
            />
          ))}
        </div>
        <div className="row justify-content-center p-1">
          <button className="col-2 btn btn-primary btn-md" onClick={enviarCuestionario}>
            Enviar
          </button>
        </div>
      </div>
    </>
  )
}

export default CrearCuestionario
