import { useEffect, useState } from 'react'
import Axios from 'axios'

const Cuestionarios = () => {
	const [cuestionarios, setCuestionarios] = useState([])

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

	//TODO Crear cuestionario
	return (
		<>
			<h1>Lista de cuestionarios</h1>

			{cuestionarios.map((cuestionario) => {
				return (
					<div key={cuestionario.id} id="listaCuestionarios" className="container text-center p-3 mt-3">
						<h5>{cuestionario.titulo}</h5>
						<p>{cuestionario.tema}</p>
					</div>
				)
			})}
		</>
	)
}

export default Cuestionarios
