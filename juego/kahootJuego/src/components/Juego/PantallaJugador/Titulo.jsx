import React from 'react'

export const Titulo = ({ titulo }) => {
	return (
		<div>
			<div className="h1 text-center fw-bold">{JSON.stringify(titulo)}</div>
		</div>
	)
}

export default Titulo
