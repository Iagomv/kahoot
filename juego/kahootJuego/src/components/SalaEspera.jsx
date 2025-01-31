import React from 'react'
import '../styles/SalaEspera.css'

export const SalaEspera = ({ cuestionario, jugadores, pin, joinToken, empezarPartida, salirPartida }) => {
	const mostrarDivJugadores = () => {
		return (
			<div className="container d-flex-column  justify-content-center bg-light shadow-sm p-3">
				{jugadores.length < 1 ? (
					<h1>No hay jugadores en la sala.</h1>
				) : (
					<>
						<h1 className="row d-flex justify-content-center">Jugadores</h1>
						<div className="container d-flex flex-wrap gap-2">
							{jugadores.map((jugador, index) => (
								<div key={index} className="container rounded shadow-sm p-3 col-3">
									<h4>{jugador.nombre}</h4>
								</div>
							))}
						</div>
					</>
				)}
			</div>
		)
	}
	return (
		<>
			<div className="d-flex flex-column align-items-center gap-3">
				{/* Header */}
				{cuestionario && <h1>{cuestionario.titulo}</h1>}
				{joinToken == null && (
					<>
						<div className="container d-flex flex-row justify-content-center">
							<button
								className="btn btn-outline-primary btn-md p-1"
								style={({ fontSize: '1.6em' }, { fontWeight: 700 })}
								onClick={() => empezarPartida()}
							>
								Iniciar partida
							</button>
						</div>
					</>
				)}
				<div className="container rounded-top d-flex-row">
					<h2>
						Código de juego: <b>{pin}</b>
					</h2>
				</div>
				{/* Jugadores */}
				{mostrarDivJugadores()}
				<div className="container d-flex-row mt-1">
					<div className="btn btn-outline-dark" onClick={() => salirPartida()}>
						Salir de la partida
					</div>
				</div>
			</div>
			{/* Video Background */}
			<div className="video-container mt-4 overflow-hidden">
				<video autoPlay loop muted>
					<source src="../../public/letras.mp4" type="video/mp4" />
					Your browser does not support the video tag.
				</video>
			</div>
		</>
	)
}
