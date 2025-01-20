import React, { useEffect } from 'react'
import { useState } from 'react'
import { OpcionesInputNuevaPregunta } from './opcionesInputNuevaPregunta'

export const InputNuevaPregunta = ({ pregunta, handleCambioPregunta, index }) => {
	const [mostrarInputTextoTiempo, setMostrarInputTextoTiempo] = useState(true)

	return (
		<>
			{/* Fila tiempo_respuesta y texto */}
			<div className="row">
				<div className="container p-3">
					<form className="form p-3 d-flex flex-column gap-3 bg-light rounded shadow-sm">
						{/* Fila tiempo_respuesta */}
						<div className="row">
							<h5 className="font-weight-bold col-2"># {index + 1}</h5>
							<h5
								className="col-6 text-center overflow-hidden"
								onClick={() => setMostrarInputTextoTiempo(!mostrarInputTextoTiempo)}
							>
								{pregunta.texto ? pregunta.texto : `Pregunta ${index + 1}`}
							</h5>
						</div>

						{mostrarInputTextoTiempo && (
							<>
								<div className="form-group d-flex flex-row gap-2">
									<div className="w-25 d-flex flex-row gap-2">
										<div className="col-8">
											<label htmlFor="inputtiempo_respuesta" className="form-label">
												Tiempo de respuesta
											</label>
										</div>
										<input
											id="inputtiempo_respuesta"
											type="number"
											value={pregunta.tiempo_respuesta}
											min={10}
											max={60}
											step={5}
											className="form-control input-sm w-50"
											name="tiempo_respuesta"
											onChange={(e) => handleCambioPregunta(e, index)}
										/>
									</div>
								</div>

								{/* Fila texto */}

								<>
									<div className="form-group d-flex flex-row gap-2">
										<div className="col-2">
											<label htmlFor="inputTexto" className="form-label">
												Texto de la pregunta
											</label>
										</div>
										<textarea
											id="inputTexto"
											className="form-control input-sm"
											name="texto"
											value={pregunta.texto}
											onChange={(e) => handleCambioPregunta(e, index)}
										/>
									</div>
									<button
										className="btn btn-primary col-4 align-self-center"
										onClick={() => setMostrarInputTextoTiempo(false)}
									>
										Opciones de respuesta
									</button>
								</>
							</>
						)}

						{!mostrarInputTextoTiempo && (
							<OpcionesInputNuevaPregunta
								pregunta={pregunta}
								index={index}
								handleCambioPregunta={handleCambioPregunta}
							/>
						)}
					</form>
				</div>
			</div>
		</>
	)
}
