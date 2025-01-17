import React, { useEffect, useState } from 'react'
import { InputNuevaPregunta } from '../components/Cuestionarios/InputNuevaPregunta'
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
			<div className="container mb-3  " style={{ overflow: 'auto' }}>
				{/* Fila para el encabezado */}
				<div className="row">
					<h1 className="display-1 mt-5">Crear cuestionario</h1>
				</div>

				{/* Fila para título y temática */}
				<div className="row justify-content-center">
					<div className="container p-3 justify-content-center col-6">
						<form className="form p-3 d-flex flex-column gap-3 bg-light rounded shadow-sm ">
							{/* Fila título */}
							<div className="form-group d-flex flex-row gap-5">
								<div className="col-2">
									<label htmlFor="inputTitulo" className="form-label">
										Titulo
									</label>
								</div>
								<input
									id="inputTitulo"
									type="text"
									className="form-control input-sm"
									name="titulo"
									value={infoCuestionario.titulo}
									onChange={handleCambioInfo}
								/>
							</div>

							{/* Fila temática */}
							<div className="form-group d-flex flex-row gap-5">
								<div className="col-2">
									<label htmlFor="inputTema" className="form-label">
										Tematica
									</label>
								</div>
								<input
									id="inputTema"
									type="text"
									className="form-control input-sm"
									name="tema"
									value={infoCuestionario.tema}
									onChange={handleCambioInfo}
								/>
							</div>
						</form>
					</div>
				</div>
				<div
					id="divPreguntas "
					className="container"
					style={{
						maxHeight: '60vh',
						overflowY: 'scroll',
						paddingTop: '10px',
					}}
				>
					{/* Fila para las preguntas */}
					{preguntas.map((pregunta, index) => (
						<InputNuevaPregunta
							key={index}
							pregunta={pregunta}
							index={index}
							handleCambioPregunta={handleCambioPregunta}
						/>
					))}
				</div>
				<div className="row justify-content-center p-1">
					<button className="col-2 btn btn-primary btn-md" onClick={enviarCuestionario}>
						Enviar
					</button>
				</div>
			</div>
		</>
	)
}

export default CrearCuestionario
