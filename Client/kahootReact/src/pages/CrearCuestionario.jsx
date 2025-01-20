import React, { useEffect, useState } from 'react'
import { InputNuevaPregunta } from '../components/Cuestionarios/InputNuevaPregunta'
import { TituloTemaCrearCuestionario } from '../components/Cuestionarios/TituloTemaCrearCuestionario'
import { useNavigate } from 'react-router'
import axios from 'axios'

export const CrearCuestionario = ({ token }) => {
	//VARIABLES
	const navigate = useNavigate()
	const [infoCuestionario, setInfoCuestionario] = useState({
		titulo: '',
		tema: '',
	})
	const [preguntas, setPreguntas] = useState([
		{
			texto: '',
			tiempo_respuesta: '',
			opciones: [
				{ id: 'opt1', texto: '', es_correcta: false },
				{ id: 'opt2', texto: '', es_correcta: false },
				{ id: 'opt3', texto: '', es_correcta: false },
				{ id: 'opt4', texto: '', es_correcta: false },
			],
		},
	])
	const [mostrarInputTituloTematica, setMostrarInputTituloTematica] = useState(true)

	// useEffect que se ejecuta al cargar la pestaña
	useEffect(() => {
		if (!token) {
			navigate('/login')
			return
		}
		setInfoCuestionario({
			...infoCuestionario,
			creador_id: token.id,
		})
	}, [])
	// Cuando cambia la informacion del cuestionario se actualiza el useState
	const handleCambioInfo = (e) => {
		setInfoCuestionario({
			...infoCuestionario,
			[e.target.name]: e.target.value,
		})
	}

	const comprobarPreguntas = (cuestionario) => {
		let errores = []
		for (let index = 0; index < cuestionario.preguntas.length; index++) {
			const pregunta = cuestionario.preguntas[index]
			let hayAlUnaOpcionCorrecta = false

			if (!pregunta.texto || !pregunta.tiempo_respuesta) {
				errores.push(`La pregunta ${index + 1} no tiene ${!pregunta.texto ? 'texto' : 'tiempo de respuesta'}.`)
				continue
			}
			for (let indexOpcion = 0; indexOpcion < pregunta.opciones.length; indexOpcion++) {
				const opcion = pregunta.opciones[indexOpcion]
				if (!opcion.texto) {
					errores.push(`La pregunta ${index + 1} no tiene texto en la opción ${indexOpcion + 1}.`)
					continue
				}
				if (opcion.es_correcta) hayAlUnaOpcionCorrecta = true
			}

			if (!hayAlUnaOpcionCorrecta) {
				errores.push(`La pregunta ${index + 1} no tiene ninguna opción correcta.`)
			}
		}
		if (errores.length > 0) {
			alert(errores.join('\n'))
			return false
		}
		return true
	}

	const handleCambioPregunta = (e, index, esOpcion = false, indexOpcion = null) => {
		const { name, value, type, checked } = e.target

		if (esOpcion && indexOpcion !== null) {
			// Si estamos editando una opción, actualizamos esa opción en particular
			const nuevasPreguntas = [...preguntas]
			const opcion = nuevasPreguntas[index].opciones[indexOpcion]

			if (name === 'es_correcta') {
				opcion[name] = checked // Para el checkbox
			} else {
				opcion[name] = value // Para el campo de texto
			}

			setPreguntas(nuevasPreguntas)
		} else {
			// Si estamos editando la pregunta, actualizamos el campo correspondiente
			const nuevasPreguntas = [...preguntas]
			nuevasPreguntas[index][name] = value

			setPreguntas(nuevasPreguntas)
		}
	}

	// Agregar nueva pregunta solo si todas están completas
	useEffect(() => {
		const todasPreguntasCumplimentadas = () => {
			return preguntas.every((pregunta) => pregunta.texto !== '' && pregunta.tiempo_respuesta !== '')
		}
		const agregarNuevaPregunta = () => {
			// Solo agregar una nueva pregunta si todas las anteriores tienen texto y tiempo de respuesta
			if (todasPreguntasCumplimentadas()) {
				setPreguntas([
					...preguntas,
					{
						texto: '',
						tiempo_respuesta: '',
						opciones: [
							{ id: 'opt1', texto: '', es_correcta: false },
							{ id: 'opt2', texto: '', es_correcta: false },
							{ id: 'opt3', texto: '', es_correcta: false },
							{ id: 'opt4', texto: '', es_correcta: false },
						],
					}, // Nueva pregunta vacía
				])
			}
		}
		console.log(preguntas)
		agregarNuevaPregunta()
	}, [preguntas])

	const enviarCuestionario = async () => {
		// Generar el objeto a partir del estado
		const cuestionario = {
			infoCuestionario: {
				...infoCuestionario,
				creador_id: token.id,
			},
			preguntas: preguntas
				.filter((pregunta) => pregunta.texto && pregunta.tiempo_respuesta) // Solo incluir preguntas válidas
				.map((pregunta) => ({
					texto: pregunta.texto,
					tiempo_respuesta: pregunta.tiempo_respuesta,
					opciones: pregunta.opciones.filter((opcion) => opcion.texto), // Solo incluir opciones válidas
				})),
		}

		if (!cuestionario.infoCuestionario.titulo || !cuestionario.infoCuestionario.tema) {
			alert('Por favor, completa todos los campos del cuestionario')
			return
		}
		if (!comprobarPreguntas(cuestionario)) return

		// Comprobar que todas las preguntas tienen texto y tiempo de respuesta

		cuestionario.preguntas.forEach((pregunta) => {
			if (!pregunta.texto || !pregunta.tiempo_respuesta) {
				alert('Por favor, completa todos los campos de las preguntas')
				return
			}
		})
		try {
			const response = await axios.post('http://localhost:6245/cuestionario', cuestionario)

			if (response.data.success) {
				alert('Cuestionario creado con éxito')
				navigate('/') // Redirigir a la página principal o donde sea necesario
			} else {
				console.error(response.data.error)
				alert('Error al crear el cuestionario')
			}
		} catch (error) {
			console.error('Error al enviar el cuestionario:', error)
			alert('Error al conectar con el servidor')
		}
	}

	return (
		<>
			<div className="container fade-in bg-white" style={{ overflow: 'auto' }}>
				{/* Fila para el encabezado */}
				<div className="row" onClick={() => setMostrarInputTituloTematica(true)}>
					<h1 className="display-3"> {infoCuestionario.titulo ? infoCuestionario.titulo : 'Nuevo cuestionario'}</h1>
					{infoCuestionario.tema && <p className="lead">{infoCuestionario.tema}</p>}
				</div>

				{/* Fila para título y temática */}
				{mostrarInputTituloTematica && (
					<TituloTemaCrearCuestionario
						infoCuestionario={infoCuestionario}
						handleCambioInfo={handleCambioInfo}
						setMostrarInputTituloTematica={setMostrarInputTituloTematica}
					/>
				)}
				{/* Fila para las preguntas */}
				{!mostrarInputTituloTematica && (
					<div
						className="container row d-flex gap-3 "
						style={{
							maxHeight: '55vh',
							overflowY: 'scroll',
						}}
					>
						{preguntas.map((pregunta, index) => (
							<InputNuevaPregunta
								key={index}
								pregunta={pregunta}
								index={index}
								handleCambioPregunta={handleCambioPregunta}
							/>
						))}
					</div>
				)}
				{/* Boton de envio de cuestionario */}
				{!mostrarInputTituloTematica && preguntas.length > 1 && (
					<div className="row justify-content-center p-1">
						<button className="col-2 btn btn-primary btn-md" onClick={enviarCuestionario}>
							Enviar
						</button>
					</div>
				)}
			</div>
		</>
	)
}

export default CrearCuestionario
