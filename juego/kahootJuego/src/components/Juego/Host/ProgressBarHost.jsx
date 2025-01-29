import React from 'react'

export const ProgressBarHost = ({ pregunta, porcentaje }) => {
	return (
		<>
			<progress
				value={pregunta.tiempo_respuesta - porcentaje}
				max={pregunta.tiempo_respuesta}
				style={{ width: '100%' }}
			/>
		</>
	)
}

export default ProgressBarHost
