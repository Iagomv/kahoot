import React from 'react'

export const BotonPausaReanudar = ({ pausa, setPausa }) => {
	return (
		<button className="btn btn-primary" onClick={() => setPausa((prev) => !prev)}>
			{pausa ? 'Reanudar' : 'Pausar'}
		</button>
	)
}
