import React from 'react'

export const ProgressBarHost = ({ pregunta, porcentaje }) => {
	return (
		<>
			<progress className="w-75 m-3" value={pregunta.tiempo_respuesta - porcentaje} max={pregunta.tiempo_respuesta} />
		</>
	)
}

export default ProgressBarHost
