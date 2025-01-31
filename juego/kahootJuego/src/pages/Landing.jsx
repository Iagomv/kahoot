import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'
import '../styles/FadeIn.css'

export const Landing = ({}) => {
	const navegar = useNavigate()

	//Navegacion
	const navegacionCrearPartida = () => {
		localStorage.getItem('token') ? navegar('/iagoKH/crearPartida') : navegar('/iagoKH/login')
	}
	const unirsePartida = () => {
		localStorage.getItem('token') ? navegar('/iagoKH/joinPartida') : navegar('/iagoKH/login')
	}
	return (
		<>
			<div className="container bg-white rounded shadow-sm my-3 p-4">
				{/*Container principal */}
				<div className="fade-in">
					{/*Container central con fondo de color gris */}
					{/*Container para los elementos boton tipo boton*/}
					<div className="d-flex flex-column gap-3 ">
						{/*Cada uno de los elementos "boton"*/}
						<button
							className="btn btn-outline-primary btn-lg align-self-center"
							onClick={() => navegacionCrearPartida()}
						>
							Crear partida
						</button>
						<button
							className="btn btn-outline-primary btn-lg align-self-center"
							onClick={() => navegar('/iagoKH/joinPartida')}
						>
							Unirse a partida en curso
						</button>
						<button className="btn btn-outline-primary btn-lg align-self-center">Crear nuevo cuestionario</button>
					</div>
				</div>
			</div>
		</>
	)
}

export default Landing
