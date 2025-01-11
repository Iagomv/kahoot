import React from 'react'
import { useState } from 'react'
import Axios from 'axios'

//Componente para editar usuarios
export const UsuarioEditable = ({ usuario }) => {
	let opcionesSelect = ['admin', 'jugador'] //TODO obtener de la DB
	const [usuarioActualizado, setUsuarioActualizado] = useState({
		id: usuario.id,
		nombre: usuario.nombre,
		email: usuario.email,
		tipo: usuario.tipo,
	})

	//Funcion para modificar usuarios
	const handleChange = (e) => {
		setUsuarioActualizado((prevUsuarioActualizado) => ({ ...prevUsuarioActualizado, [e.target.name]: e.target.value }))
		console.log(usuarioActualizado)
	}

	//Funcion para eliminar usuarios al presionar eliminar
	const handleEliminar = (e) => {
		e.preventDefault()
		const eliminarUsuario = async () => {
			try {
				await Axios.delete(`http://localhost:6245/usuario/${usuario.id}`)
			} catch (error) {
				console.log(error)
			}
		}
		confirm('Seguro que quieres eliminar el usuario?') && eliminarUsuario()
	}

	//Funcion para actualizar usuarios al presionar guardar
	const handleGuardar = (e) => {
		e.preventDefault()
		const actualizarUsuario = async () => {
			try {
				await Axios.put(`http://localhost:6245/usuario/${usuario.id}`, usuarioActualizado)
			} catch (error) {
				console.log(error)
			}
		}
		actualizarUsuario()
	}
	return (
		<div key={usuario.id} className="container text-center p-3 mt-3">
			<form className="d-flex gap-2 align-items-center justify-content-center mb-3">
				<h5>{usuario.id}</h5>
				<input
					className="form-control"
					type="text"
					name="nombre"
					onChange={handleChange}
					value={usuarioActualizado.nombre}
					id=""
				/>
				<input
					className="form-control"
					type="text"
					name="email"
					onChange={handleChange}
					value={usuarioActualizado.email}
					id=""
				/>
				<select className="form-select" onChange={handleChange} value={usuarioActualizado.tipo}>
					{opcionesSelect.map((opcion, index) => (
						<option key={index} value={opcion}>
							{opcion}
						</option>
					))}
				</select>

				<button className="btn btn-success" onClick={handleGuardar}>
					Guardar
				</button>

				<button className="btn btn-danger" onClick={handleEliminar}>
					Eliminar
				</button>
			</form>
		</div>
	)
}

export default UsuarioEditable
