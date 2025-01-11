import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import Cuestionarios from './pages/Cuestionarios'
import Navegador from './components/Navegador'
import Usuarios from './pages/Usuarios'
import Registro from './pages/Registro'

function App() {
	return (
		<>
			<BrowserRouter>
				<Navegador />

				<Routes>
					<Route path="/usuarios" element={<Usuarios />}></Route>
					<Route path="/cuestionarios" element={<Cuestionarios />}></Route>
					<Route path="/crearCuestionario" element={''}></Route>
					<Route path="/registro" element={<Registro />}></Route>
				</Routes>
			</BrowserRouter>
		</>
	)
}

export default App
