import React, { useEffect } from 'react'
import { useState } from 'react'
import { OpcionInputNuevaPregunta } from './OpcionInputNuevaPregunta'

export const OpcionesInputNuevaPregunta = ({ pregunta, index, handleCambioPregunta }) => {
	// Verificar que 'pregunta.opciones' es un array
	if (!Array.isArray(pregunta.opciones)) {
		return null // O mostrar un mensaje de error si 'opciones' no es un array
	}
	const [mostrarOpciones, setMostrarOpciones] = useState(true)
	const [informacionCumplimentada, setInformacionCumplimentada] = useState(false)
	const [textoInformativo, setTextoInformativo] = useState('')
	useEffect(() => {
		const tieneTexto = (opcion) => {
			return pregunta.opciones.every((opcion) =>
				opcion.texto == '' || opcion.texto == null
					? setTextoInformativo('Establece el texto de las respuestas') && false
					: true
			)
		}
		const hayAlgunaOpcionCorrecta = (opcion) => {
			return pregunta.opciones.some((opcion) => (opcion.es_correcta ? true : false))
		}
		tieneTexto() && hayAlgunaOpcionCorrecta() ? setInformacionCumplimentada(true) : setInformacionCumplimentada(false)
		if (tieneTexto() && !hayAlgunaOpcionCorrecta()) setTextoInformativo('Debe haber al menos una opcion correcta')
	}, [handleCambioPregunta])

	return (
		<>
			{mostrarOpciones &&
				pregunta.opciones.map((opcion, indexOpcion) => (
					<OpcionInputNuevaPregunta
						key={opcion.id} // Usar 'opcion.id' como clave única
						pregunta={pregunta}
						opcion={opcion}
						index={index} // Pasar el índice de la pregunta
						indexOpcion={indexOpcion} // Pasar el índice de la opción
						handleCambioPregunta={handleCambioPregunta}
					/>
				))}
			{(informacionCumplimentada && mostrarOpciones && (
				<button
					className="btn btn-secondary btn small bg-white text-black col-4 align-self-center"
					onClick={() => setMostrarOpciones(false)}
				>
					Ocultar opciones
				</button>
			)) ||
				(!informacionCumplimentada &&
					(<strong className="text-danger">{textoInformativo}</strong> || <strong className="text-danger"></strong>))}
		</>
	)
}
