import { useNavigate } from 'react-router'
import React, { useEffect, useCallback } from 'react'
import Axios from 'axios'
import MostrarCuestionarios from '../components/cuestionarios/MostrarCuestionarios'
// Maneja la creación de la partida, esta clase se encarga de obtener el cuestionario y el token, y redireccionar a la sala
// En caso de que el jugador tuviera un joinToken previo se elimina
export const CrearPartida = () => {
	const navega = useNavigate()

	// Maneja la creación de la partida, enviando el cuestionario y el token, y redireccionando a la sala
	const hadleClickCuestionario = useCallback(
		async (cuestionario) => {
			const data = {
				token: localStorage.getItem('token'),
				idCuestionario: cuestionario.id,
			}
			try {
				const pinPartida = await Axios.post('http://localhost:6245/juego/partida', { data })
				console.log(cuestionario)
				navega(`/iagoKH/salaPartida/${pinPartida.data}`, { state: { cuestionario: cuestionario } })
			} catch (error) {
				console.error('Error al crear la partida:', error)
			}
		},
		[navega]
	)

	// Eliminar el joinToken y Redirección si no hay token en el localStorage o si es 'null'
	useEffect(() => {
		localStorage.removeItem('joinToken')
		const token = localStorage.getItem('token')
		if (!token || token === 'null') {
			navega('/iagoKH/login')
		}
	}, [navega])

	return (
		<>
			<MostrarCuestionarios hadleClickCuestionario={hadleClickCuestionario} />
		</>
	)
}

export default CrearPartida
