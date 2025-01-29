import React, {useEffect, useState} from 'react'
import Titulo from './PantallaJugador/Titulo'
import OpcionesJugador from './PantallaJugador/OpcionesJugador'
export const PantallaJugador = ({sala, enviarRespuestaJugador}) => {
  // Verifica si sala, sala.cuestionario y sala.cuestionario.preguntas existen
  if (!sala || !sala.cuestionario || !sala.cuestionario.preguntas) {
    return <div>Esperando datos...</div>
  }
  const [tiempoRespuesta, setTiempoRespuesta] = useState(null)
  useEffect(() => {
    setTiempoRespuesta(sala.cuestionario.preguntas[sala.pregunta_actual].tiempo_respuesta)
  }, [sala.cuestionario.pregunta_actual])
  return (
    <>
      <Titulo titulo={sala.cuestionario.preguntas[sala.pregunta_actual].pregunta_texto} />
      {!sala.timeout ? (
        <OpcionesJugador
          opciones={sala.cuestionario.preguntas[sala.pregunta_actual].opciones}
          enviarRespuestaJugador={enviarRespuestaJugador}
        />
      ) : (
        <h1>Hola</h1>
      )}
    </>
  )
}
export default PantallaJugador
