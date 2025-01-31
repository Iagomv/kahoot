import React, { useEffect, useState } from 'react'
import Titulo from './PantallaJugador/Titulo'
import OpcionesJugador from './PantallaJugador/OpcionesJugador'
export const PantallaJugador = ({ sala, enviarRespuestaJugador, resultadoCliente }) => {
	// Verifica si sala, sala.cuestionario y sala.cuestionario.preguntas existen
	if (!sala || !sala.cuestionario || !sala.cuestionario.preguntas) {
		return <div>Esperando datos...</div>
	}
	// Gestion del tiempo de respuesta de la pregunta
	const [segundosLeft, setSegundosLeft] = useState(null)
	const [contestado, setContestado] = useState(false)
	useEffect(() => {
		setSegundosLeft(sala.cuestionario.preguntas[sala.pregunta_actual].tiempo_respuesta + 0)
		setContestado(false)
	}, [sala.pregunta_actual])

	// Contador de los segundos que le sobraron
	useEffect(() => {
		if (segundosLeft > 0) {
			const interval = setInterval(() => {
				setSegundosLeft((prev) => Math.max(prev - 1, 0))
			}, 1000)

			return () => clearInterval(interval)
		}
	}, [segundosLeft])

	const h1Title = () => {
		return !contestado ? <h1> Tiempo restante: {segundosLeft}</h1> : <h1> Esperando al resto de jugadores</h1>
	}
	return (
		<>
			{h1Title()}
			<Titulo titulo={sala.cuestionario.preguntas[sala.pregunta_actual].pregunta_texto} />
			{!sala.timeout ? (
				<OpcionesJugador
					opciones={sala.cuestionario.preguntas[sala.pregunta_actual].opciones}
					enviarRespuestaJugador={enviarRespuestaJugador}
					segundosLeft={segundosLeft}
					resultadoCliente={resultadoCliente}
					setContestado={setContestado}
				/>
			) : (
				<h1>Hola</h1>
			)}
		</>
	)
}
export default PantallaJugador
