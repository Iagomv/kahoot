import React, { useEffect } from 'react'
import { useNavigate } from 'react-router'
import '../styles/FadeIn.css'

export const Landing = () => {
	const navegar = useNavigate()

	return (
		<>
			{/*Container principal */}
			<div className="fade-in container vh-100 row justify-content-center">
				{/*Container central con fondo de color gris */}
				<div className="w-50 h-50 bg-light mt-3 align-content-center">
					{/*Container para los elementos boton tipo boton*/}
					<div className="h-50 d-flex flex-column gap-3">
						{/*Cada uno de los elementos "boton"*/}
						<button className="btn btn-primary" onClick={() => navegar('crearPartida')}>
							Crear partida
						</button>
						<button className="btn btn-primary">Unirse a partida en curso</button>
						<button className="btn btn-primary">Crear nuevo cuestionario</button>
					</div>
				</div>
			</div>
		</>
	)
}

export default Landing
