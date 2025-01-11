import React from 'react'

export const InfoUsuario = ({ usuario }) => {
	return (
		<div key={usuario.id} className="card text-center p-3 mt-3" style={{ width: '18rem' }}>
			<div className="card-body">
				<h5 className="card-title">{usuario.nombre}</h5>
				<p className="card-text">{usuario.email}</p>
				<p className="card-text">{usuario.tipo}</p>
				<a href="#" className="btn btn-primary">
					Editar
				</a>
			</div>
		</div>
	)
}

export default InfoUsuario
