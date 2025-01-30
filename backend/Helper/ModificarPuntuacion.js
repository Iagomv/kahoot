// 1 Búsqueda del jugador dentro del objeto sala
const BuscarJugador = (sala, nombreJugador) => {
  return sala.jugadores.find((jugador) => jugador.nombre === nombreJugador)
}

// 2 Modificar la puntuación en el objeto sala
export const modificarPuntuacion = (sala, nombreJugador, puntuacion) => {
  let jugador = BuscarJugador(sala, nombreJugador)
  if (jugador) {
    jugador.puntuacion += puntuacion // Sumar la puntuación
  }
}

// 3 Almacenar en array respuestas
export const almacenarRespuesta = (sala, nombreJugador, indexRespuesta) => {
  let jugador = BuscarJugador(sala, nombreJugador)
  if (jugador) {
    jugador.respuestas.push(indexRespuesta)
  }
}
