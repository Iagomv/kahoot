import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import Axios from 'axios'

const Cuestionarios = ({ token }) => {
	const [cuestionarios, setCuestionarios] = useState([])
	const navigate = useNavigate()

	// Obtener data de cuestionarios de la API
	useEffect(() => {
		const buscaCuestionarios = async () => {
			try {
				const response = await Axios.get('http://localhost:6245/cuestionarios')
				console.log(response.data)
				setCuestionarios(response.data)
			} catch (error) {
				console.log(error)
			}
		}
		buscaCuestionarios()
	}, [])

	//Editar -> navegar a la pagina de edicion && Eliminar-> confirmar eliminar
	const handleEditar = (id) => {
		navigate(`/editarCuestionario/${id}`)
	}

	const handleEliminar = (id) => {
		confirm('Seguro que quieres eliminar el cuestionario?') && Axios.delete(`http://localhost:6245/cuestionario/${id}`)
	}

	// Guardar el valor de `token.id` de manera segura
	const userId = token ? token.id : null

	return (
		<>
			<div style={{ overflow: 'hidden' }}>
				<h1 className="display-1 mt-3">Lista de cuestionarios</h1>

				<div
					className="container mt-5"
					style={{
						maxHeight: '80vh',
						overflowY: 'scroll',
					}}
				>
					{cuestionarios.map((cuestionario) => {
						return (
							<div
								key={cuestionario.id}
								id="listaCuestionarios"
								className="container text-center p-3 my-5 bg-light shadow rounded col-8 overflow-auto"
							>
								<h5>{cuestionario.titulo}</h5>
								<p>Tema: {cuestionario.tema}</p>
								<p>ID creador: {cuestionario.creador_id}</p>
								<div className="row d-flex justify-content-evenly ">
									<button className="btn btn-primary btn-sm col-4" onClick={() => handleEditar(cuestionario.id)}>
										Editar
									</button>
									{/* Botones para editar y eliminar=>(Solo el creador) */}
									{userId === cuestionario.creador_id && (
										<button
											className="btn btn-danger btn-sm col-4"
											onClick={() => handleEliminar(cuestionario.id)}
										>
											Eliminar
										</button>
									)}
								</div>
							</div>
						)
					})}
				</div>
			</div>
		</>
	)
}

export default Cuestionarios
