import React from 'react'

export const OpcionInputNuevaPregunta = ({ pregunta, index, indexOpcion, handleCambioPregunta, opcion }) => {
	return (
		<div className="justify-content-center">
			<div className="form-check form-switch">
				<div className="row justify-content-space-around">
					<p className="">Respuesta {indexOpcion + 1}</p>
					<input
						className="form-check-input"
						type="checkbox"
						name="es_correcta" // Aquí usamos el mismo nombre de campo 'es_correcta' que en el estado
						checked={opcion.es_correcta} // Controlar si el checkbox está marcado o no
						onChange={(e) => handleCambioPregunta(e, index, true, indexOpcion)} // Llamamos al handle con los parámetros adecuados
					/>
				</div>
			</div>
			<input
				type="text"
				className="form-control overflow-auto"
				value={opcion.texto || null}
				name={'texto'} // Usamos un nombre único basado en el índice
				onChange={(e) => handleCambioPregunta(e, index, true, indexOpcion)} // Llamamos al handle con los parámetros adecuados
			/>
		</div>
	)
}
