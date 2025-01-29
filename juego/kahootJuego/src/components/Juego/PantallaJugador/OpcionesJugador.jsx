import React from 'react'

export const OpcionesJugador = ({ opciones, enviarRespuestaJugador }) => {
	const colores = {
		1: 'red',
		2: 'blue',
		3: 'green',
		4: 'magenta',
	}
	return (
		<>
			{opciones.map((opcion, index) => (
				<div
					className="m-3 d-flex flex-wrap justify-content-around row shadow-sm gap-0"
					key={opcion.id}
					onClick={() => enviarRespuestaJugador(index + 1)}
				>
					<h2 className="col-10 p-1" style={{ color: colores[index + 1], fontWeight: 700 }}>
						{opcion.texto_opcion}
					</h2>
				</div>
			))}
		</>
	)
}

export default OpcionesJugador
