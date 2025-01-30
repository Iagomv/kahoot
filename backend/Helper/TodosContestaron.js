export const todosContestaron = (sala) => {
  console.log(
    'todosContestaron',
    sala.jugadores.slice(1).every((jugador) => jugador.respuestas.length === sala.pregunta_actual + 1)
  )
  return sala.jugadores.slice(1).every((jugador) => jugador.respuestas.length === sala.pregunta_actual + 1)
}
