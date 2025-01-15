import React from 'react'

export const PreguntasCuestionario = ({preguntas}) => {
  return (
    <>
      <h5>Preguntas</h5>
      {preguntas.map((pregunta) => {
        return (
          <>
            <div key={pregunta.id} className="container p-3 d-flex flex-column gap-2 m-5 bg-light rounded shadow-sm">
              <p className="row justify-content-center">tiempo: {pregunta.tiempo_respuesta}</p>
              <p>texto: {pregunta.texto}</p>
            </div>
          </>
        )
      })}
    </>
  )
}

export default PreguntasCuestionario
