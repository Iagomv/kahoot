import React, { useEffect, useState } from 'react'
import { MostrarResultadoJugador } from './MostrarResultadoJugador'

export const OpcionesJugador = ({ opciones, enviarRespuestaJugador, segundosLeft, resultadoCliente, setContestado }) => {
	const colores = {
		1: 'red',
		2: 'blue',
		3: 'green',
		4: 'magenta',
	}
	const [mostrarOpciones, setMostrarOpciones] = useState(true)

	const handleClick = (index) => {
		setContestado(true)
		enviarRespuestaJugador({ indexRespuesta: index, segundosLeft })
		setMostrarOpciones(false)
	}

	useEffect(() => {
		setMostrarOpciones(true)
	}, [opciones])
	return (
		<>
			{mostrarOpciones ? (
				opciones.map((opcion, index) => (
					<div
						className="m-3 d-flex flex-wrap justify-content-around row shadow-sm gap-0"
						key={opcion.id}
						onClick={() => handleClick(index)}
					>
						<h2 className="col-10 p-1" role="button" style={{ color: colores[index + 1], fontWeight: 700 }}>
							{opcion.texto_opcion}
						</h2>
					</div>
				))
			) : (
				<MostrarResultadoJugador resultadoCliente={resultadoCliente} />
			)}
		</>
	)
}

export default OpcionesJugador
