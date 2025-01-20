import React, { useEffect, useState } from 'react'
import { MostrarOpcionesPregunta } from './MostrarOpcionesPregunta'

export const PreguntasCuestionario = ({ cuestionario, setCuestionario }) => {
	const [preguntas, setPreguntas] = useState(cuestionario.preguntas || [])

	const [numeroPregunta, setNumeroPregunta] = useState(-1)

	const handleClickPregunta = (index) => {
		setNumeroPregunta(index)
	}

	useEffect(() => {}, [numeroPregunta])
	//Al cargar el componente asignamos el estado de las preguntas
	useEffect(() => {
		setPreguntas(cuestionario.preguntas)
		console.log('preguntas', preguntas)
	}, [])

	return (
		<>
			{' '}
			<div className="row mt-3 bg-light rounded shadow-sm p-3">
				<div className="col-6 overflow-auto" style={{ maxHeight: '65vh' }}>
					<h5>Preguntas</h5>
					{preguntas.map((pregunta, index) => (
						<div
							key={index} // El key debe estar aquí para cada pregunta
							className={
								`container p-3 d-flex flex-column gap-2 m-3 rounded shadow-sm bg-` +
								(index === numeroPregunta ? 'primary text-white' : 'white')
							}
							onClick={() => handleClickPregunta(index)}
						>
							<p className="row fs-5 justify-content-center">tiempo: {pregunta.tiempo_respuesta}</p>
							<h5>{pregunta.pregunta_texto}</h5>
						</div>
					))}
				</div>

				<div className="col-6">
					<h3>{numeroPregunta === -1 ? 'Selecciona la pregunta' : `Pregunta ${numeroPregunta + 1}`}</h3>
					{numeroPregunta !== -1 && (
						<MostrarOpcionesPregunta
							pregunta={preguntas[numeroPregunta]} // Pasa la pregunta seleccionada
							cuestionario={cuestionario}
							index={numeroPregunta}
							setCuestionario={setCuestionario}
							preguntas={preguntas}
							setPreguntas={setPreguntas}
						/>
					)}
				</div>
			</div>
		</>
	)
}

export default PreguntasCuestionario
