import axios from 'axios'
import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { InfoUsuario } from '../components/Usuarios/InfoUsuario'
import { UsuarioEditable } from '../components/Usuarios/UsuarioEditable'

export const Usuarios = ({ token }) => {
	const [usuarios, setUsuarios] = useState([])
	const [modoEdicion, setModoEdicion] = useState(false)
	let textoBotonEdicion = modoEdicion ? 'Volver' : 'Editar usuarios'
	const navigate = useNavigate()

	//UseEffect para obtener los usuarios
	useEffect(() => {
		if (!token) {
			console.log('No hay token')
			navigate('/login')
			return
		}
		const buscarUsuarios = async () => {
			try {
				const res = await axios.get('http://localhost:6245/usuarios')
				setUsuarios(res.data)
			} catch (error) {
				console.error('Error fetching users:', error)
			}
		}

		buscarUsuarios()
	}, [])

	//Funcion para cambiar el modo de edicion
	const cambiarModoEdicion = () => {
		setModoEdicion(!modoEdicion)
	}

	//Funcion para actualizar un usuario local //!Deprecated
	//   const actualizarUsuario = (usuarioActualizado) => {
	//     const usuariosActualizados = usuarios.map((usuario) => {
	//       // Si el id del usuario coincide con el id proporcionado, lo actualizamos
	//       return usuario.id === usuarioActualizado.id ? {...usuario, ...usuarioActualizado} : usuario // Si no coincide, devolvemos el usuario tal cual
	//     })
	//     setUsuarios(usuariosActualizados) // Actualizamos el estado con la lista modificada
	//   }

	//Render
	return (
		<>
			<div className="container fixed-top mt-5">
				<h1 className="display-1">Usuarios</h1>
				<button onClick={cambiarModoEdicion} className={modoEdicion ? 'btn btn-primary' : 'btn btn-primary'}>
					{textoBotonEdicion}
				</button>
				<div
					id="divUsuarios"
					className="container d-flex flex-wrap justify-content-center mt-3 gap-3"
					style={{ height: '400px', overflowY: 'scroll' }}
				>
					{usuarios.map((usuario) => {
						return (
							<div key={usuario.id}>
								{modoEdicion ? <UsuarioEditable usuario={usuario} /> : <InfoUsuario usuario={usuario} />}
							</div>
						)
					})}
				</div>
			</div>
		</>
	)
}

export default Usuarios
