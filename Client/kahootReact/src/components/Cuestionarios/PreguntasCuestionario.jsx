import React, { useEffect } from 'react'
import { MostrarOpcionPregunta } from './MostrarOpcionPregunta'

export const PreguntasCuestionario = ({ preguntas }) => {
	//useEffect para obtener las opciones de la pregunta al cargar el componente
	useEffect(() => {
		const buscaPreguntas = async () => {
			try {
				console.log(id)
				const response = await axios.get(`http://localhost:6245/preguntas/${id}`)
				console.log(response.data)
				setPreguntas(response.data)
			} catch (error) {
				console.log(error)
			}
		}
		buscaPreguntas()
	}, [])
	return (
		<>
			<h5>Preguntas</h5>
			{preguntas.map((pregunta, index) => {
				return (
					<>
						<div key={index} className="container p-3 d-flex flex-column gap-2 m-5 bg-light rounded shadow-sm">
							<p className="row justify-content-center">tiempo: {pregunta.tiempo_respuesta}</p>
							<h5>{pregunta.texto}</h5>
							{/* {pregunta.opciones.map((opcion, indexOpcion) => {
								return <MostrarOpcionPregunta key={indexOpcion} opcion={opcion} />
							})} */}
						</div>
					</>
				)
			})}
		</>
	)
}

export default PreguntasCuestionario
