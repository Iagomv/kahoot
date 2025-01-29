import React from 'react'

export const SalaEspera = ({ cuestionario, jugadores, pin, joinToken, empezarPartida, salirPartida }) => {
	return (
		<>
			<div className="d-flex flex-column gap-3">
				{/* Header */}
				{cuestionario && <h1>{cuestionario.titulo}</h1>}
				{joinToken == null && (
					<>
						<div className="container d-flex flex-row justify-content-center">
							<h3 className="m-3 " style={{ color: 'red' }}>
								Game Host
							</h3>
							<button
								className="btn btn-outline-dark p-1 "
								style={({ fontSize: '1.6em' }, { fontWeight: 700 })}
								onClick={() => empezarPartida()}
							>
								Iniciar partida
							</button>
						</div>
					</>
				)}
				<div className="container rounded-top shadow-sm d-flex-row">
					<h3 className="fw-bold">Código de juego: {pin}</h3>
				</div>

				{/* Jugadores */}
				<div className="container d-flex flex-row justify-content-center">
					{jugadores == [] || !jugadores ? (
						<p>No hay jugadores en la sala.</p>
					) : (
						jugadores.map((jugador, index) => (
							<div key={index} className="container rounded shadow-sm p-3">
								<h4>{jugador.nombre}</h4>
							</div>
						))
					)}
				</div>

				<div className="container d-flex-row">
					<div className="btn btn-primary" onClick={() => salirPartida()}>
						Salir de la partida
					</div>
				</div>
			</div>
		</>
	)
}
