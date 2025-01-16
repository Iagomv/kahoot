import React from 'react'
import { OpcionInputNuevaPregunta } from './OpcionInputNuevaPregunta'

export const OpcionesInputNuevaPregunta = ({ pregunta, index, handleCambioPregunta }) => {
	// Verificar que 'pregunta.opciones' es un array
	if (!Array.isArray(pregunta.opciones)) {
		return null // O mostrar un mensaje de error si 'opciones' no es un array
	}

	return (
		<>
			{pregunta.opciones.map((opcion, indexOpcion) => (
				<OpcionInputNuevaPregunta
					key={opcion.id} // Usar 'opcion.id' como clave única
					pregunta={pregunta}
					opcion={opcion}
					index={index} // Pasar el índice de la pregunta
					indexOpcion={indexOpcion} // Pasar el índice de la opción
					handleCambioPregunta={handleCambioPregunta}
				/>
			))}
		</>
	)
}
