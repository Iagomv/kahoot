import React from 'react'

export const MostrarResultados = ({ jugadores, pregunta }) => {
	let respuestaCorrecta = pregunta.opciones.find((opcion) => opcion.es_correcta)
	return (
		<div className="container d-flex flex-column align-items-center ">
			<h2 className="text-center">
				Respuesta correcta: <b>{respuestaCorrecta.texto_opcion}</b>
			</h2>
			<div className="container d-flex flex-column align-items-center justify-content-center m-2">
				{jugadores.map((jugador, index) => (
					<div key={index} className="row m-2 p-1 rounded shadow-sm w-50">
						<h3>
							{index + 1} -{' '}
							<b>
								{jugador.nombre}&nbsp;&nbsp;&nbsp;{jugador.puntuacion}
							</b>
						</h3>
					</div>
				))}
			</div>
		</div>
	)
}
