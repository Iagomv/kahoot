import React from 'react'

export const DivRespuestas = ({ opciones }) => {
	const colores = {
		1: 'red',
		2: 'blue',
		3: 'green',
		4: 'magenta',
	}
	return (
		<>
			<div className="container align-self-center">
				{opciones.map((opcion, index) => (
					<div className="m-3 d-flex flex-wrap justify-content-around row shadow-sm gap-0" key={opcion.id}>
						<h2 className="col-2" style={{ color: colores[index + 1], fontWeight: 700 }}>
							{index + 1} )
						</h2>
						<h2 className="col-10 p-1">{opcion.texto_opcion}</h2>
					</div>
				))}
			</div>
		</>
	)
}

export default DivRespuestas
