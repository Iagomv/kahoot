import React from 'react'

export const BotonPausaReanudar = ({ pausa, setPausa }) => {
	return (
		<button className="btn btn-outline-primary bgn-lg w-25" onClick={() => setPausa((prev) => !prev)}>
			{pausa ? 'Reanudar' : 'Pausar'}
		</button>
	)
}
