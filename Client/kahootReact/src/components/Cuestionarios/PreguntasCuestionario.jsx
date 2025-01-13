import React from 'react'

export const PreguntasCuestionario = (preguntas) => {
	return (
		<>
			<h5>Preguntas</h5>
			{preguntas.map((pregunta) => {
				return (
					<>
						<p>{pregunta.texto}</p>
						<p>{pregunta.tiempRespuesta}</p>
					</>
				)
			})}
		</>
	)
}

export default PreguntasCuestionario
