import axios from 'axios'
import React from 'react'
import { useEffect, useState } from 'react'
import { InfoUsuario } from '../components/Usuarios/InfoUsuario'

export const Usuarios = () => {
	const [usuarios, setUsuarios] = useState([])

	useEffect(() => {
		const buscarUsuarios = async () => {
			try {
				const res = await axios.get('http://localhost:6245/usuarios')
				setUsuarios(res.data)
			} catch (error) {
				console.log(error)
			}
		}
		buscarUsuarios(), []
	})

	return (
		<>
			<h1>Usuarios</h1>
			<div id="divUsuarios" className="container d-flex flex-wrap justify-content-center mt-3 gap-4">
				{usuarios.map((usuario) => {
					return <InfoUsuario key={usuario.id} usuario={usuario} />
				})}
			</div>
		</>
	)
}

export default Usuarios
