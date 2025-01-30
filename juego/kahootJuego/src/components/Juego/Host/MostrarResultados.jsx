import React from 'react'

export const MostrarResultados = ({jugadores, pregunta}) => {
  let respuestaCorrecta = pregunta.opciones.find((opcion) => opcion.es_correcta)
  return (
    <div>
      <h2>Respuesta correcta: {respuestaCorrecta.texto_opcion}</h2>
      <div className="container justify-content-center d-flex-column"></div>
      {jugadores.map((jugador, index) => (
        <div key={index} className="row m-2">
          <h3>{jugador.nombre + ' ' + jugador.puntuacion}</h3>
        </div>
      ))}
    </div>
  )
}
