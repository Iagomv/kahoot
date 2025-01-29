import { Jugador } from './Jugador.js'

export class Sala {
	constructor(parameters) {
		this.pin = parameters.pin
		this.host = { token: parameters.host }
		this.jugadores = parameters.jugador ? [new Jugador(parameters.jugador)] : [] // Siempre inicializamos como array
		this.cuestionario = parameters.cuestionario
		this.pregunta_actual = parameters.pregunta_actual
	}

	// Método para agregar jugadores a la sala
	agregarJugador(jugador) {
		this.jugadores.push(jugador)
	}
}

export default Sala
