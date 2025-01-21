import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Landing from './pages/Landing'
import Registro from './pages/Registro'
import Redirect from './pages/Redirect'
import Navegador from './components/Navegador'
import CrearPartida from './pages/CrearPartida'

import Login from './pages/Login'
import { useEffect, useState } from 'react'

function App() {
	const [token, setToken] = useState(null)

	useEffect(() => {
		localStorage.setItem('token', JSON.stringify(token))
		if (token) {
			console.log(token)
		}
	}, [token])

	return (
		<>
			<BrowserRouter>
				<Navegador token={token} setToken={setToken} />

				<Routes>
					<Route path="/" element={<Redirect />}></Route>
					<Route path="/iagoKH/" element={<Landing />}></Route>
					<Route path="/iagoKH/crearPartida" element={<CrearPartida />}></Route>
					<Route path="/iagoKH/registro" element={<Registro />}></Route>
					<Route path="/iagoKH/login" element={<Login setToken={setToken} />}></Route>
				</Routes>
			</BrowserRouter>
		</>
	)
}

export default App
