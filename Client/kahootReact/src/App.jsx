import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import Cuestionarios from './pages/Cuestionarios'
import Navegador from './components/Navegador'
import Usuarios from './pages/Usuarios'
import Registro from './pages/Registro'
import CrearCuestionario from './pages/CrearCuestionario'
import Login from './pages/Login'
import { useEffect, useState } from 'react'

function App() {
	const [privilegios, setPrivilegios] = useState('jugador')

	useEffect(() => {
		const token = localStorage.getItem('token')
		if (token) {
			setPrivilegios(token.tipo)
		}
	}, [])

	return (
		<>
			<BrowserRouter>
				<Navegador />

				<Routes>
					<Route path="/registro" element={<Registro />}></Route>
					<Route path="/login" element={<Login />}></Route>
					{privilegios === 'admin' && <Route path="/usuarios" element={<Usuarios />}></Route>}
					<Route path="/cuestionarios" element={<Cuestionarios />}></Route>
					<Route path="/crearCuestionario" element={<CrearCuestionario />}></Route>
				</Routes>
			</BrowserRouter>
		</>
	)
}

export default App
