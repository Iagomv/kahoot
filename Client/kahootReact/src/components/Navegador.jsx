import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'

export const Navegador = ({token, setToken}) => {
  useEffect(() => {
    if (token) {
      console.log('Token updated:', token)
    }
  }, [token])

  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
    console.log('User logged out.')
  }

  return (
    <ul className="nav fixed-top justify-content-center mt-2">
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
      {token && (
        <li className="nav-item">
          <Link className="nav-link active" to="/crearCuestionario">
            Crear cuestionario
          </Link>
        </li>
      )}
      {!token && (
        <>
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
        </>
      )}
      {token && (
        <li className="nav-item">
          <button className="btn btn-danger" onClick={logout}>
            Logout
          </button>
        </li>
      )}
    </ul>
  )
}

export default Navegador
