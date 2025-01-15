import React from 'react'
import {useState} from 'react'
import {useNavigate} from 'react-router'
import axios from 'axios'
const Login = ({setToken}) => {
  // Estado para almacenar la información de inicio de sesión
  const navigate = useNavigate()
  const [loginInfo, setLoginInfo] = useState({
    email: '',
    password: ''
  })

  const validacionDatos = () => {
    const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/ // Valida emails estándar
    const regexPassword = /^[A-Za-z\d]{6,20}$/ // Solo letras y números, longitud entre 6 y 20
    if (loginInfo.email === '' || loginInfo.password === '') {
      alert('Hay que cubrir todos los campos.')
      return false
    }

    // Validar email
    if (!regexEmail.test(loginInfo.email)) {
      alert('El email no tiene un formato válido.')
      resultadoComprobacion = false
    }

    // Validar password
    if (!regexPassword.test(loginInfo.password)) {
      alert('La contraseña debe tener entre 6 y 20 caracteres y solo puede contener letras y números.')
      resultadoComprobacion = false
    }
    return true
  }

  // Manejar cambios en los campos de entrada
  const handleCambioInfo = (e) => {
    setLoginInfo({
      ...loginInfo,
      [e.target.name]: e.target.value
    })
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    if (!validacionDatos()) {
      return
    }
    try {
      const response = await axios.post('http://localhost:6245/usuario/login', loginInfo)
      if (response.status === 200) {
        localStorage.setItem('token', JSON.stringify(response.data.token))
        setToken(response.data.token)
        navigate('/cuestionarios')
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className="container ">
      <form className="form p-3 d-flex flex-column gap-3 bg-light rounded shadow-sm">
        <div className="container p-3">
          <div className="form-group">
            <label htmlFor="inputEmail" className="form-label">
              Email
            </label>
            <input
              id="inputEmail"
              type="email"
              className="form-control"
              name="email"
              onChange={(e) => handleCambioInfo(e)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="inputPassword" className="form-label">
              Password
            </label>
            <input
              id="inputPassword"
              type="password"
              className="form-control"
              name="password"
              onChange={(e) => handleCambioInfo(e)}
            />
          </div>
          <button className="btn btn-primary mt-3 col-6" onClick={(e) => handleLogin(e)}>
            Login
          </button>
        </div>
      </form>
    </div>
  )
}

export default Login
