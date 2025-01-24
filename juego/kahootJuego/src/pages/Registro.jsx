import React from 'react'
import {useState} from 'react'
import Axios from 'axios'
import {useNavigate} from 'react-router'

//TODO REVISAR COMPROBACIONES
export const Registro = () => {
  const navigate = useNavigate()
  const [nuevoUsuario, setNuevoUsuario] = useState({
    nombre: '',
    email: '',
    password: ''
  })

  //Funcion para comprobar el formato returns true si es correcto
  const comprobacionFormato = () => {
    let resultadoComprobacion = true

    // Obtener los valores de los inputs
    let nombre = document.getElementById('nombre').value
    let email = document.getElementById('email').value
    let password = document.getElementById('password').value

    // Expresiones regulares para validación
    const regexNombre = /^[a-zA-Z0-9\s]{2,20}$/ // Permite letras y espacios, entre 2 y 20 caracteres
    const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/ // Valida emails estándar
    const regexPassword = /^[A-Za-z\d]{6,20}$/ // Solo letras y números, longitud entre 6 y 20

    // Validar nombre
    if (!regexNombre.test(nombre)) {
      alert('El nombre debe tener entre 2 y 20 caracteres y solo puede contener letras y espacios.')
      resultadoComprobacion = false
    }

    // Validar email
    if (!regexEmail.test(email)) {
      alert('El email no tiene un formato válido.')
      resultadoComprobacion = false
    }

    // Validar password
    if (!regexPassword.test(password)) {
      alert('La contraseña debe tener entre 6 y 20 caracteres y solo puede contener letras y números.')
      resultadoComprobacion = false
    }
    return resultadoComprobacion // Devuelve true si todo es válido, false en caso contrario
  }
  //Comprobacion existe nombre
  // const comprobacionNombre = async () => {
  // 	let nombre = document.getElementById('nombre').value
  // 	console.log(nombre)
  // 	try {
  // 		const res = await Axios.get(`http://localhost:6245/existeUsuario/${nombre}`)
  // 		if (res.data) {
  // 			console.log(res.data)
  // 			alert('El usuario ya existe')
  // 			return false
  // 		}
  // 		return true
  // 	} catch (error) {
  // 		console.error('Error al comprobar el usuario:', error)
  // 		alert('Hubo un problema al comprobar el usuario.')
  // 		return false
  // 	}
  // }

  //Comprobacion email existente
  const comprobacionEmail = async () => {
    try {
      let email = document.getElementById('email').value
      // Solicitar al servidor si el email ya existe
      const res = await Axios.get(`http://localhost:6245/existeEmail/${email}`)
      // Validar la respuesta del servidor
      if (res.data === true) {
        alert('El email ya existe')
        return false
      }
      return true // Si no existe, la comprobación es válida
    } catch (error) {
      console.error('Error al comprobar el email:', error)
      alert('Hubo un error al comprobar el email. Inténtalo más tarde.')
      return false // Evita continuar si hay un error
    }
  }

  //Handler para registrar a un nuevo usuario tras comprobar formato y existencia de email
  const handleRegistro = async (e) => {
    e.preventDefault()
    console.log({
      formato: await comprobacionFormato(),
      email: await comprobacionEmail()
    })
    console.log(await (comprobacionFormato() && comprobacionEmail()))
    if (comprobacionFormato() && comprobacionEmail()) {
      // Datos del nuevo usuario
      const nuevoUsuario = {
        nombre: document.getElementById('nombre').value,
        email: document.getElementById('email').value,
        password: document.getElementById('password').value
      }

      try {
        // Enviar los datos al servidor
        await Axios.post('http://localhost:6245/usuario', nuevoUsuario)
        alert('Usuario registrado con éxito')
        navigate('/login')
      } catch (error) {
        console.error('Error al registrar usuario:', error)
      }
    }
  }

  return (
    <div className="container w-50 bg-white rounded shadow-sm p-4" id="FormularioRegistro ">
      <h2>Formulario de registro</h2>
      <form className="d-flex-row align-items-center justify-content-center mb-3">
        <input className="form-control mt-3" type="text" name="nombre" id="nombre" placeholder="nombre de usuario" />

        <input className="form-control mt-3" type="email" name="email" id="email" placeholder="email@email.com" />
        <input className="form-control mt-3" type="password" name="password" id="password" placeholder="contraseña" />

        <button className="btn btn-outline-secondary mt-3" onClick={handleRegistro}>
          Registrarse
        </button>
      </form>
    </div>
  )
}

export default Registro
