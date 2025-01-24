const GeneradorPin = (token, idCuestionario) => {
  console.log(token)
  const numeroRandom4 = Math.floor(Math.random() * 10000)
  const pin = `${idCuestionario}${token.id}${numeroRandom4}`
  return pin
}
export const GeneradorPartida = (token, idCuestionario) => {
  const pin = GeneradorPin(token, idCuestionario)
  const partida = {
    cuestionario: idCuestionario,
    pin: pin,
    jugadores: [
      {
        nombre: token.nombre,
        puntuacion: 0
      }
    ],
    pregunta_actual: -1
  }
  return partida
}

export default GeneradorPartida
