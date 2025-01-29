import React from 'react'
import Titulo from './PantallaJugador/Titulo'
import OpcionesJugador from './PantallaJugador/OpcionesJugador'
export const PantallaJugador = ({ sala, enviarRespuestaJugador }) => {
	// Verifica si sala, sala.cuestionario y sala.cuestionario.preguntas existen
	if (!sala || !sala.cuestionario || !sala.cuestionario.preguntas) {
		return <div>Esperando datos...</div>
	}
	return (
		<>
			<Titulo titulo={sala.cuestionario.preguntas[sala.pregunta_actual].pregunta_texto} />
			<OpcionesJugador
				opciones={sala.cuestionario.preguntas[sala.pregunta_actual].opciones}
				enviarRespuestaJugador={enviarRespuestaJugador}
			/>
		</>
	)
}
export default PantallaJugador
