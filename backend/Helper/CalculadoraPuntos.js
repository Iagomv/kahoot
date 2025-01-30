// 1 Comprobar si acierta Devuelve 1 si es correcta, 0 si es incorrecta
const comprobarAcertante = (sala, indexRespuesta) => {
	console.log('Es correcta:', sala.cuestionario.preguntas[sala.pregunta_actual]?.opciones?.[indexRespuesta]?.es_correcta)

	return sala.cuestionario.preguntas[sala.pregunta_actual].opciones[indexRespuesta].es_correcta
}
// 2 asignar puntos si acierta
export const calculadoraPuntos = (sala, indexRespuesta, segundosLeft) => {
	if (comprobarAcertante(sala, indexRespuesta) == 1) {
		console.log('segundosLeft', segundosLeft)
		return segundosLeft * 10
	} else {
		return 0
	}
}
