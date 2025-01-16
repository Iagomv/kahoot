import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css'

import MostrarCuestionarios from './pages/MostrarCuestionarios'
import Navegador from './components/Navegador'
import Usuarios from './pages/Usuarios'
import Registro from './pages/Registro'
import CrearCuestionario from './pages/CrearCuestionario'
import Login from './pages/Login'
import {useEffect, useState} from 'react'
import {EditarCuestionario} from './pages/EditarCuestionario'

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
          <Route path="/registro" element={<Registro />}></Route>
          <Route path="/login" element={<Login setToken={setToken} />}></Route>
          <Route path="/usuarios" element={<Usuarios token={token} />}></Route>
          <Route path="/cuestionarios" element={<MostrarCuestionarios token={token} />}></Route>
          <Route path="/crearCuestionario" element={<CrearCuestionario token={token} />}></Route>
          <Route path="/editarCuestionario/:id" element={<EditarCuestionario token={token} />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
