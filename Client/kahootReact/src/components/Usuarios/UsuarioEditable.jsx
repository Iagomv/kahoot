import React from 'react'

export const UsuarioEditable = ({ usuario }) => {
	let opcionesSelect = ['Admin', 'Jugador']

	return (
		<div key={usuario.id} className="container text-center p-3 mt-3">
			<h5>{usuario.nombre}</h5>
			<p>{usuario.email}</p>
			<select class="form-select">
				{opcionesSelect.map((opcion) => {
					return <option value={opcion}>{opcion}</option>
				})}
			</select>
			<br></br>
			<button className="btn btn-primary">Confirmar</button>
		</div>
	)
}

export default UsuarioEditable
