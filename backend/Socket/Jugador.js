export class Jugador {
  constructor({nombre, socket}) {
    this.nombre = nombre
    this.puntuacion = 0
    this.socket = socket // Asignamos el socket correctamente
  }
}

export default Jugador
