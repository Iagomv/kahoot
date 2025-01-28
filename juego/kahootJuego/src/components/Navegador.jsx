import React, { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import '../styles/Navegador.css'

export const Navegador = ({ token, setToken }) => {
	const location = useLocation() // hook para obtener la ubicación actual

	const logout = () => {
		localStorage.removeItem('token')
		setToken(null)
		console.log('User logged out.')
	}

	// Función para determinar si el enlace debe estar activo
	const isActive = (path) => (location.pathname.startsWith(path) ? 'active' : '')
	//TODO Cambiar IagoMV para link jugar
	return (
		<div className="container">
			<nav className="navbar navbar-dark bg-white py-3">
				{/* Logo */}
				<Link className="navbar-brand" to="/">
					<strong>Kahoot Iago MV</strong>
				</Link>

				{/* Navbar Links */}
				<ul className="navbar-nav ms-auto d-flex flex-row">
					{/* Admin Link */}
					{token?.tipo === 'admin' && (
						<li className="nav-item me-3">
							<Link className={`nav-link minimalist ${isActive('/usuarios')}`} to="/usuarios">
								Usuarios
							</Link>
						</li>
					)}
					{/* Cuestionarios Link */}
					<li className="nav-item me-3">
						<Link className={`nav-link minimalist ${isActive('/cuestionarios')}`} to="/cuestionarios">
							Cuestionarios
						</Link>
					</li>
					{/* Crear Cuestionario Link */}
					{token && (
						<li className="nav-item me-3">
							<Link className={`nav-link minimalist ${isActive('/crearCuestionario')}`} to="/crearCuestionario">
								Crear cuestionario
							</Link>
						</li>
					)}
					{/* Registration/Login Links */}
					{!token && (
						<>
							<li className="nav-item me-3">
								<Link className={`nav-link minimalist ${isActive('/registro')}`} to="/iagoKH/registro">
									Registrarse
								</Link>
							</li>
							<li className="nav-item me-3">
								<Link className={`nav-link minimalist ${isActive('/login')}`} to="/iagoKH/login">
									Login
								</Link>
							</li>
						</>
					)}
					{/* Logout Button */}
					{token && (
						<li className="nav-item">
							<button
								className="btn btn-link minimalist text-white"
								style={{ textDecoration: 'none' }}
								onClick={logout}
							>
								Logout
							</button>
						</li>
					)}
				</ul>
			</nav>
		</div>
	)
}

export default Navegador
