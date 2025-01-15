import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useAuthProvider } from '../Provider/AuthContext' // Importa el hook del contexto

export const Navegador = () => {
	const { token, setToken } = useAuthProvider() // Accede al token y setToken desde el contexto

	useEffect(() => {
		// Verifica si el token existe y tiene la propiedad 'tipo' definida
		if (token && token.tipo) {
			console.log(token.tipo + ' desde navegador')
			console.log(token + ' desde navegador')
		} else {
			console.log('Token no disponible o no tiene propiedad "tipo"')
		}
	}, [token]) // Este useEffect se ejecutará cada vez que el token cambie

	return (
		<>
			<ul className="nav fixed-top justify-content-center">
				{/* Si el token tiene tipo 'admin', muestra el enlace de 'Usuarios' */}
				{token?.tipo === 'admin' && (
					<li className="nav-item">
						<Link className="nav-link active" to="/usuarios">
							Usuarios
						</Link>
					</li>
				)}
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
				<li className="nav-item">
					<button onClick={() => setToken(null)}>Logout</button>
				</li>
			</ul>
		</>
	)
}

export default Navegador
