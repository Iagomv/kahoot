import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import './MostrarCuestionarios.css'
import Axios from 'axios'

const MostrarCuestionarios = ({ hadleClickCuestionario }) => {
	const [cuestionarios, setCuestionarios] = useState([])
	const [cargados, setCargados] = useState(false)

	// Obtener data de cuestionarios de la API
	useEffect(() => {
		const buscaCuestionarios = async () => {
			if (cargados) return
			try {
				const response = await Axios.get('http://localhost:6245/cuestionarios')
				console.log(response.data)
				setCuestionarios(response.data)
				setCargados(true)
			} catch (error) {
				console.log(error)
			}
		}
		buscaCuestionarios()
	}, [cargados])

	return (
		<>
			<div className="container fade-in" style={{ overflow: 'hidden' }}>
				<h1 className="display-3">Elige el cuestionario</h1>

				<div
					className="container d-flex flex-wrap gap-3"
					style={{
						maxHeight: '75vh',
						overflowY: 'scroll',
					}}
				>
					{cuestionarios.map((cuestionario) => {
						return (
							<div
								key={cuestionario.id}
								className="elementoCuestionario container d-flex flex-column justify-content-center align-items-center p-3 my-3 shadow rounded col-3 overflow-auto"
								onClick={() => hadleClickCuestionario(cuestionario)}
							>
								<h5 style={{ fontWeight: 'bold' }}>{cuestionario.titulo}</h5>
								<p>Tema: {cuestionario.tema}</p>
							</div>
						)
					})}
				</div>
			</div>
		</>
	)
}

export default MostrarCuestionarios
