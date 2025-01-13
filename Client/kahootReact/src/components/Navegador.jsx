import React from 'react'
import { Link } from 'react-router-dom'

export const Navegador = () => {
	//Navegador con enlaces a las distintas paginas
	// Usuarios, Cuestionarios, CrearCuestionario, Unirse
	return (
		<>
			<ul className="nav  fixed-top justify-content-center">
				<li className="nav-item">
					<Link className="nav-link active" to="/usuarios">
						Usuarios
					</Link>
				</li>
				<li className="nav-item">
					<Link className="nav-link active" to="/cuestionarios">
						Cuestionarios
					</Link>
				</li>
				<li className="nav-item">
					<Link className="nav-link active" to="/crearCuestionario">
						Crear cuestionario
					</Link>
				</li>
				<li className="nav-item">
					<Link className="nav-link active" to="/registro">
						Registrarse
					</Link>
				</li>
				<li className="nav-item">
					<Link className="nav-link active" to="/login">
						Login
					</Link>
				</li>
			</ul>
		</>
	)
}

export default Navegador
