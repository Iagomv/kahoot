import React, { useEffect, useState } from 'react'
import { BotonPausaReanudar } from './Host/BotonPausaReanudar'
import { ProgressBarHost } from './Host/ProgressBarHost'
import { DivRespuestas } from './Host/DivRespuestas'
import BotonSiguientePregunta from './Host/BotonSiguientePregunta'

export const PantallaHost = ({ sala, siguientePregunta }) => {
	// Verifica si sala, sala.cuestionario y sala.cuestionario.preguntas existen
	if (!sala || !sala.cuestionario || !sala.cuestionario.preguntas) {
		return <div>Esperando datos...</div>
	}

	const [porcentaje, setPorcentaje] = useState(sala.cuestionario.preguntas[sala.pregunta_actual].tiempo_respuesta || 60)
	const [pausa, setPausa] = useState(false)

	// Reinicia el contador al cambiar de pregunta
	useEffect(() => {
		setPorcentaje(sala.cuestionario.preguntas[sala.pregunta_actual].tiempo_respuesta)
		setPausa(false) // Despausar cuando cambia la pregunta
	}, [sala.pregunta_actual])

	// Contador de tiempo
	useEffect(() => {
		if (porcentaje > 0 && !pausa) {
			const interval = setInterval(() => {
				setPorcentaje((prev) => Math.max(prev - 1, 0))
			}, 1000)

			return () => clearInterval(interval)
		}
	}, [porcentaje, pausa])

	return (
		<div className="justify-content-center">
			<div className="container m-auto d-flex flex-column">
				<h1 style={{ color: 'red', fontWeight: 700 }}>
					{sala.cuestionario.preguntas[sala.pregunta_actual].pregunta_texto}
				</h1>
				<DivRespuestas opciones={sala.cuestionario.preguntas[sala.pregunta_actual].opciones} />
			</div>
			{porcentaje !== 0 ? (
				<>
					<ProgressBarHost porcentaje={porcentaje} pregunta={sala.cuestionario.preguntas[sala.pregunta_actual]} />
					<BotonPausaReanudar pausa={pausa} setPausa={setPausa} />
				</>
			) : (
				<BotonSiguientePregunta siguientePregunta={siguientePregunta} />
			)}
		</div>
	)
}

export default PantallaHost
