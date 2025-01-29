import React from 'react'

export const BotonSiguientePregunta = ({ siguientePregunta }) => {
	return (
		<>
			<button className="btn btn-outline-primary" onClick={() => siguientePregunta()}>
				Siguiente
			</button>
		</>
	)
}

export default BotonSiguientePregunta
