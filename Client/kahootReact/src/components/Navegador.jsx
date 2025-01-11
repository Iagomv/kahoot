import React from 'react'
import { Link } from 'react-router-dom'

export const Navegador = () => {
	return (
		<>
			<ul className="nav  fixed-top justify-content-center">
				<li className="nav-item">
					<Link className="nav-link active" to="/usuarios">
						Usuarios
					</Link>
				</li>
				<li className="nav-item">
					{/* Usando <Link> para navegación en React Router */}
					<Link className="nav-link active" to="/cuestionarios">
						Cuestionarios
					</Link>
				</li>
				<li className="nav-item">
					{/* Usando <Link> para navegación en React Router */}
					<Link className="nav-link active" to="/crearCuestionario">
						Crear cuestionario
					</Link>
				</li>
			</ul>
		</>
	)
}

export default Navegador
