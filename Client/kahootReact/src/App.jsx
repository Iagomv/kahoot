import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import Cuestionarios from './pages/Cuestionarios'
import Navegador from './components/Navegador'
import Usuarios from './pages/Usuarios'
import Registro from './pages/Registro'
import CrearCuestionario from './pages/CrearCuestionario'
import Login from './pages/Login'

import { AuthProvider, useAuthProvider } from './Provider/AuthContext' // Importa el proveedor y el hook

// Este componente ahora solo gestiona las rutas
function AppRoutes() {
	const { token } = useAuthProvider() // Obtiene el token desde el contexto

	return (
		<>
			<Navegador /> {/* Navegador puede acceder al token */}
			<Routes>
				<Route path="/registro" element={<Registro />}></Route>
				<Route path="/login" element={<Login />}></Route>
				{token?.tipo === 'admin' && <Route path="/usuarios" element={<Usuarios />}></Route>}
				<Route path="/cuestionarios" element={<Cuestionarios />}></Route>
				<Route path="/crearCuestionario" element={<CrearCuestionario />}></Route>
			</Routes>
		</>
	)
}

function App() {
	return (
		<AuthProvider>
			{' '}
			{/* Proveedor envolviendo toda la app */}
			<BrowserRouter>
				<AppRoutes /> {/* Contiene las rutas que dependen del token */}
			</BrowserRouter>
		</AuthProvider>
	)
}

export default App
