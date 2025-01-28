export class Sala {
	constructor(parameters) {
		this.pin = parameters.pin
		this.host = {}
		this.jugadores = []
		this.socket = parameters.socket
		this.cuestionario = parameters.cuestionario
		this.pregunta_actual = parameters.pregunta_actual
	}
}

export default Sala
